jQuery.sap.declare("import_build_prototype.control.SelectSourceContent");
jQuery.sap.require("sap.watt.ideplatform.plugin.template.ui.wizard.WizardStepContent");

sap.watt.ideplatform.plugin.template.ui.wizard.WizardStepContent.extend(
    "import_build_prototype.control.SelectSourceContent",
    {
         // Define the SAPUI5 control's metadata
         metadata : {
                 properties : {
                 }
         },

		_mSourceEnum: {
			BUILD:  0,
			ZIP: 1,
			GIT: 2
		},

		_BUILD_SYSTEM : "build_system",

        _oSourceGrid : null,
		_initDest : false,

        init : function() {
            if (!this._oSourceGrid) {
                this._createGrid();
            }

            this._handleSourceItems();
			this.addContent(this._oSourceGrid);
        },

		_createGrid: function() {
			this._oSourceGrid = sap.ui.jsfragment("import_build_prototype.view.selectSource", this);

			var oData = {
				iSourceSelected: -1,
				sZipPath: "",
                mSelectionEnum: this._mSourceEnum,
                oZipUploader: sap.ui.getCore().byId("zipArchiveUploader"),
                sPrototypeName : "",
                sDestinationName : "",
                sPrototypeId : ""

//              sBuildUrlTextFieldValue : "https://buildwebide-x69b9a64b.dispatcher.neo.ondemand.com",
//              sBuildUserTextFieldValue : "",
//              sBuildPwdTextFieldValue : "",
//				sServiceName: "",
//				bSelect: false,
//				bVisibleDetails: false,
//				bPasteUrlTextFieldEditable: false,
//				sPasteUrlTextFieldValue: "",
//				sPasteURLComboBoxValue: "",
//				sFileUploaderText: "",
//				bAppKeyTextFieldVisible: false,
//				sAppKeyTextFieldValue: "",
//				sServiceURLIndent: "L9 M9 S9",
//				bFullURL: true
			};

			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({
				modelData: oData
			});

			this._oSourceGrid.setModel(oModel);
			this._oSourceGrid.bindElement("/modelData");
		},

		_onSourceSelect: function(oEvent) {
			var iSelected = oEvent.getParameters().selectedIndex;
			this._oSourceGrid.getModel().setProperty("/modelData/iSourceSelected", iSelected);
			this._handleSourceItems();
		},

		_handleSourceItems: function () {
			var iSelected = this._oSourceGrid.getModel().getProperty("/modelData/iSourceSelected");
			var oBuildGrid = sap.ui.getCore().byId("buildGrid");
			var oZipGrid = sap.ui.getCore().byId("zipGrid");

			switch (iSelected) {
				case this._mSourceEnum.BUILD:
					this._populateDestinations();
					oBuildGrid.setVisible(true);
					oZipGrid.setVisible(false);
				break;

				case this._mSourceEnum.ZIP:
					oBuildGrid.setVisible(false);
					oZipGrid.setVisible(true);
				break;

				case this._mSourceEnum.GIT:
					oBuildGrid.setVisible(false);
					oZipGrid.setVisible(false);
				break;

				default:
					oBuildGrid.setVisible(false);
					oZipGrid.setVisible(false);
				break;
			}

			this._validateStep();
		},

		_reportError : function(error) {
			this.fireValidation({
				isValid: false,
				message: error
			});
		},

		_populateDestinations : function() {
			if (this._initDest === true) {
				return;
			}

			this._initDest = true;
			var oDestComboBox = sap.ui.getCore().byId("destinationCombo");
			var that = this;
			this.getContext().service.destination.getDestinations().then(
                function(aDestinations) {
					oDestComboBox.destroyItems();

                    var destFound = 0;
                    oDestComboBox.addItem(new sap.ui.core.ListItem({text: ""}));

                    aDestinations.forEach(
                        function(oDest) {
                            if (oDest.wattUsage === that._BUILD_SYSTEM) {
                                destFound++;
                                oDestComboBox.addItem(new sap.ui.core.ListItem({
                                    text: oDest.name
                                }));
                            }
                    });

                    if (destFound > 0) {
                        oDestComboBox.setEnabled(true);
                        if (destFound === 1) {
                            oDestComboBox.removeItem(0);
                            oDestComboBox.fireChange({
                                selectedItem: oDestComboBox.getItems()[0]
                            });
                        }
                    }
                }
			);
		},

		_onDestinationSelect : function (oEvent) {
            this._cleanPrototypes();
            this._validateStep();
            this._getPrototypes(oEvent);
		},

		_cleanPrototypes : function() {
			var oPrototypeCombo = sap.ui.getCore().byId("prototypeCombo");
			oPrototypeCombo.removeAllItems();
			oPrototypeCombo.setEnabled(false);
			this._oSourceGrid.getModel().setProperty("/modelData/sPrototypeName", "");
			this._oSourceGrid.getModel().setProperty("/modelData/sPrototypeId", "");
		},

		_getPrototypes : function(oEvent) {
            var that = this;
            Q.sap.require("import_build_prototype/template/BuiLDConnector").then(
                function(BuiLDConnector) {
                    var sDestination = that._oSourceGrid.getModel().getProperty("/modelData/sDestinationName");
                    if (sDestination === "") {
                        return;
                    }

                    that.fireProcessingStarted();
                    BuiLDConnector.getProjectsList(sDestination).then(
                        function(projectArr){
                            that._cleanPrototypes();
                            if (projectArr.length > 0) {
                                var i;
                                var oPrototypeCombo = sap.ui.getCore().byId("prototypeCombo");

                                oPrototypeCombo.addItem(new sap.ui.core.ListItem({text : ""}).data("id", ""));

                                for (i = 0; i < projectArr.length; i++) {
                                    var item = new sap.ui.core.ListItem({
                                        text : projectArr[i].name
                                    }).data("id", projectArr[i]._id);

                                    oPrototypeCombo.addItem(item);
                                }

                                oPrototypeCombo.setEnabled(true);

                                if (projectArr.length === 1) {
                                    oPrototypeCombo.removeItem(0);
                                }

                                oPrototypeCombo.fireChange({
                                    selectedItem: oPrototypeCombo.getItems()[0]
                                });

                                that._validateStep();
                            }
                            else {
                                var error = that.getContext().i18n.getText("i18n", "no_prototypes_for_user");
                                that._reportError(error);
                            }
                        }
                    ).fail (
                        function(error){
                            that._reportError(error);
                        }
                    ).fin (
                        function(){
                            that.fireProcessingEnded();
                        }
                    );
                }
            ).fail(
                function(error) {
                    that._reportError(error);
                }
            );
        },

		_onPrototypeSelect : function(oEvent) {
			this._oSourceGrid.getModel().setProperty("/modelData/sPrototypeId", oEvent.getParameters().selectedItem.data("id"));
            this._validateStep();
		},

		_onFileUploaderChange : function(oEvent) {
            this._validateStep();
		},

		_validateStep : function() {
			var iSelected = this._oSourceGrid.getModel().getProperty("/modelData/iSourceSelected");
			var bValid = false;

			switch (iSelected) {
				case this._mSourceEnum.BUILD:
                    var protoId = this._oSourceGrid.getModel().getProperty("/modelData/sPrototypeId");
                    if (protoId && protoId !== "") {
                        bValid = true;
                }
				break;

				case this._mSourceEnum.ZIP:
                    var zipPath = this._oSourceGrid.getModel().getProperty("/modelData/sZipPath");
                    if (zipPath && zipPath !== "") {
                        bValid = true;
                    }
				break;

				case this._mSourceEnum.GIT:
				break;
			}

			this.fireValidation({
				isValid: bValid
			});
		},

			/*
			this.showDetailsOrData(false);
			this.cleanDetailsDataGrid();
			if (this._bDataConnectionStepDirty) {
				this.fireValidation({
					isValid: false
				});
			} else {
				this._bDataConnectionStepDirty = true;
			}

			this._oSourceGrid.getModel().setProperty("/modelData/sServiceName", "");
			this._oSourceGrid.getModel().setProperty("/modelData/sFileUploaderText", "");
			this._oSourceGrid.getModel().setProperty("/modelData/sPasteUrlTextFieldValue", "");
			this._oSourceGrid.getModel().setProperty("/modelData/sAppKeyTextFieldValue", "");
			this._oSourceGrid.getModel().setProperty("/modelData/bAppKeyTextFieldVisible", false);

			switch (iSelected) {
				case this._mDataConnectionEnum.ServiceCatalog:
					this.getContext().service.servicecatalog.cleanSelection().done();
					this.onServiceCatalogDataConnectionSelect(oEvent).then(function(oContent) {
						if (oContent) {
							var DataConnectionServiceCatalogContent = sap.ui.getCore().byId("DataConnectionServiceCatalogContent");
							DataConnectionServiceCatalogContent.addContent(oContent);
						}
					}).done();
					break;
				case this._mDataConnectionEnum.RepositoryBrowser:
					this.onRespositoryBrowserSelect().then(function(oGrid) {
						if (oGrid) {
							var oRepositoryBrowserContainer = sap.ui.getCore().byId("DataConnectionRepositoryBrowserContent");
							oRepositoryBrowserContainer.addContent(oGrid);
						}
					}).done();
				break;

				case this._mDataConnectionEnum.FileSystem:
					var oFileUploader = sap.ui.getCore().byId("DataConnectionFileUploader");
					this._resetInputState(oFileUploader);
				break;

				case this._mDataConnectionEnum.PasteURL:
					var oDataConnectionPasteUrlInput = sap.ui.getCore().byId("DataConnectionPasteURLTextField");
					this._resetInputState(oDataConnectionPasteUrlInput);

					this._oGrid.getModel().setProperty("/modelData/sPasteURLComboBoxValue", "");
					this._oGrid.getModel().setProperty("/modelData/sServiceURLIndent", "L9 M9 S9");
					this._oGrid.getModel().setProperty("/modelData/bSelect", false);
					this._oGrid.getModel().setProperty("/modelData/bFullURL", true);

					var oDataConnectionPasteURLDestinationsComboBox = sap.ui.getCore().byId("DataConnectionPasteURLDestinationsComboBox");
					if (oDataConnectionPasteURLDestinationsComboBox.getItems() && oDataConnectionPasteURLDestinationsComboBox.getItems().length === 0) {
						this.getContext().service.servicecatalog.populateConnections(oDataConnectionPasteURLDestinationsComboBox,
							this._mDataConnectionEnum.PasteURL).done();
					}
				break;
			}
			*/

         setFocusOnFirstItem : function() {
                // Call the focus() method for your first UI element.
         },

         validateStepContent : function() {
                 // Return a Q-promise which is resolved if the step content
                 // is currently in valid state, and is rejected if not.
         },

         cleanStep : function() {
                 // 1. Clean properties that were added to
                 //    this.getModel().getData().
                 // 2. Clean the control's private members.
                 // 3. Destroy the UI controls created by this control
                 //    that are not currently displayed.
                 //    Currently displayed content is destroyed by the wizard
                 //    before this step is displayed again.
         },
         renderer : {},

         // Overwrite this SAPUI5 control method if you have some logic
         // to implement here
         onAfterRendering : function() {
            this.getModel().setProperty("/selectSourceModel", this._oSourceGrid.getModel());
			 var oSourceList = sap.ui.getCore().byId("sourceListBox");
			 if (oSourceList) {
				 oSourceList.setSelectedIndex(0);
				 oSourceList.fireSelect({
					 selectedIndex: 0
				 });
			 }
         },

         // Overwrite this SAPUI5 control method if you have some logic
         // to implement here
         onBeforeRendering : function() {
			// Make sure to first call this method implementation in the
			// WizardStepContent base class
			if(sap.watt.ideplatform.plugin.template.ui.wizard.WizardStepContent.prototype.onBeforeRendering){
				sap.watt.ideplatform.plugin.template.ui.wizard.WizardStepContent.prototype.onBeforeRendering.apply(this, arguments);
			}
                 // Implement your logic here
         }
});