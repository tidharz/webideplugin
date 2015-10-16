sap.ui.jsfragment(
	"import_build_prototype.view.selectSource", {

		createContent: function(oController) {

			var oStepGrid = new sap.ui.layout.Grid({
				vSpacing: 0
			});

            // Source type
			var oSourceTypeGrid = new sap.ui.layout.Grid({
				vSpacing: 0,
				layoutData: new sap.ui.layout.GridData({
					span: "L2 M2 S2"
				})
			});

			var oSourceLabel = new sap.ui.commons.Label({
				text: "{i18n>selectSourceStep_oSourcesLabel}",
				textAligh: "Left",
				width: "100%",
				layoutData: new sap.ui.layout.GridData({
					span: "L12 M12 S12"
				})
			}).addStyleClass("selectSourceHeaderLabel");

			var oBuildListItem = new sap.ui.core.ListItem({
				text: "{i18n>selectSourceStep_buildSystem}",
				width: "100%"
			});

			var oZipListItem = new sap.ui.core.ListItem({
				text: "{i18n>selectSourceStep_zip}",
				width: "100%"
			});

			var oGitListItem = new sap.ui.core.ListItem({
				text: "{i18n>selectSourceStep_git}",
				width: "100%",
				enabled : false
			});

			var oSelectorListBox = new sap.ui.commons.ListBox("sourceListBox", {
				width: "100%",
				select: [oController._onSourceSelect, oController],
				layoutData: new sap.ui.layout.GridData({
					span: "L12 M12 S12"
				}),
				items: [oBuildListItem, oZipListItem, oGitListItem]
			});

			oSourceTypeGrid.addContent(oSourceLabel);
			oSourceTypeGrid.addContent(oSelectorListBox);

			oStepGrid.addContent(oSourceTypeGrid);

			// build grid
			var oBuildGrid = new sap.ui.layout.Grid("buildGrid", {
				vSpacing: 0,
				layoutData: new sap.ui.layout.GridData({
					span: "L3 M3 S3"
				})
			});

			var oBuildInfoLabel = new sap.ui.commons.Label({
				text: "{i18n>selectSourceStep_oBuildSystemLabel}",
				textAligh: "Left",
				width: "100%",
				layoutData: new sap.ui.layout.GridData({
					span: "L12 M12 S12"
				})
			}).addStyleClass("selectSourceHeaderLabel");

			oBuildGrid.addContent(oBuildInfoLabel);

			var oDestinationCombo = new sap.ui.commons.DropdownBox("destinationCombo", {
				width: "100%",
				placeholder: "{i18n>selectSourceStep_build_select_destination}",
				value: "{sDestinationName}",
				change: [oController._onDestinationSelect, oController],
				layoutData: new sap.ui.layout.GridData({
					span: "L12 M12 S12"
				}),

				enabled: false,
				items: []
			});
			oBuildGrid.addContent(oDestinationCombo);

/*
			var oBuildUrlLabel = new sap.ui.commons.Label({
				text: "{i18n>selectSourceStep_oBuildSystemUrlLabel}",
				textAligh: "Left",
				width: "20%",
				layoutData: new sap.ui.layout.GridData({
					span: "L2 M2 S2"
				})
			}).addStyleClass("serviceCatalogHeaderLabel");

			oBuildGrid.addContent(oBuildUrlLabel);

			var oUrlTextField = new sap.ui.commons.TextField("BuildURLTextField", {
				width: "100%",
				placeholder: "{i18n>selectSourceStep_build_url_here}",
				value: "{sBuildUrlTextFieldValue}",
//				liveChange: [oController._onPasteURLLiveChange, oController],
				change : [oController._onBuildInfoChange, oController],
				layoutData: new sap.ui.layout.GridData({
					span: "L11 M11 S11"
				}),
				accessibleRole : sap.ui.core.AccessibleRole.Textbox
			}).addStyleClass("serviceCatalogStepBottomMargin");

			oBuildGrid.addContent(oUrlTextField);

			var oUserTextField = new sap.ui.commons.TextField("BuildUserTextField", {
				width: "100%",
				placeholder: "{i18n>selectSourceStep_build_user_here}",
				value: "{sBuildUserTextFieldValue}",
//				liveChange: [oController._onPasteURLLiveChange, oController],
				change : [oController._onBuildInfoChange, oController],
				layoutData: new sap.ui.layout.GridData({
					span: "L11 M11 S11"
				}),
				accessibleRole : sap.ui.core.AccessibleRole.Textbox
			}).addStyleClass("serviceCatalogStepBottomMargin");

			oBuildGrid.addContent(oUserTextField);

			var oPwdTextField = new sap.ui.commons.PasswordField("BuildPwdTextField", {
				width: "100%",
				placeholder: "{i18n>selectSourceStep_build_pwd_here}",
				value: "{sBuildPwdTextFieldValue}",
//				liveChange: [oController._onPasteURLLiveChange, oController],
				change : [oController._onBuildInfoChange, oController],
				layoutData: new sap.ui.layout.GridData({
					span: "L11 M11 S11"
				}),
				accessibleRole : sap.ui.core.AccessibleRole.Textbox
			}).addStyleClass("serviceCatalogStepBottomMargin");

			oBuildGrid.addContent(oPwdTextField);
*/
/*
			var oBuildConnectButton = new sap.ui.commons.Button("BuildConnectionButton", {
				width: "100%",
				text: "{i18n>selectSourceStep_connect}",
				enabled: {
					parts: ["sDestinationName"],
					formatter: function(sDestination)  {
                        return (!!sDestination && sDestination !== "");
					}
				},

				layoutData: new sap.ui.layout.GridData({
					span: "L4 M4 S4"
				}),

				press: [oController._onBuildConnectButton, oController]
			});
			oBuildGrid.addContent(oBuildConnectButton);
*/

			var oPrototypeLabel = new sap.ui.commons.Label({
				text: "{i18n>selectSourceStep_oBuildSystemPrototypesLabel}",
				textAligh: "Left",
				width: "100%",
				layoutData: new sap.ui.layout.GridData({
					span: "L12 M12 S12"
				})
			}).addStyleClass("selectPrototypeHeaderLabel");

			oBuildGrid.addContent(oPrototypeLabel);

/*
			var oBuildPrototypeLabel = new sap.ui.commons.Label({
				text: "{i18n>selectSourceStep_oBuildSystemPrototypesLabel}",
				textAligh: "Left",
				width: "100%",
				layoutData: new sap.ui.layout.GridData({
					span: "L12 M12 S12"
				})
			}).addStyleClass("serviceCatalogHeaderLabel");
			oBuildGrid.addContent(oBuildPrototypeLabel);
*/
			var oPrototypeCombo = new sap.ui.commons.DropdownBox("prototypeCombo", {
				width: "100%",
				placeholder: "{i18n>selectSourceStep_build_select_prototype}",
				value: "{sPrototypeName}",
				change: [oController._onPrototypeSelect, oController],
				layoutData: new sap.ui.layout.GridData({
					span: "L12 M12 S12"
				}),

				enabled: false,
				items: []
			});
			oBuildGrid.addContent(oPrototypeCombo);

			oStepGrid.addContent(oBuildGrid);

			// zip grid
			var oZipGrid = new sap.ui.layout.Grid("zipGrid", {
				vSpacing: 0,
				layoutData: new sap.ui.layout.GridData({
					span: "L3 M3 S3"
				})
			});

			var oZipLabel = new sap.ui.commons.Label({
				text: "{i18n>selectSourceStep_oZipPathLabel}",
				textAligh: "Left",
				width: "100%",
				layoutData: new sap.ui.layout.GridData({
					span: "L12 M12 S12"
				})
			}).addStyleClass("selectSourceHeaderLabel");

			oZipGrid.addContent(oZipLabel);

			var oFileUploader = new sap.ui.commons.FileUploader("zipArchiveUploader", {
                name : "zipArchiveUploader",
				value: "{sZipPath}",
				change: [oController._onFileUploaderChange, oController],
				fileType:"zip",
				uploadOnChange: false,
				width: "100%",
				sendXHR : true,
				layoutData: new sap.ui.layout.GridData({
					span: "L12 M12 S12"
				})
			}).addStyleClass("serviceCatalogFileUploader");

			oZipGrid.addContent(oFileUploader);

			oStepGrid.addContent(oZipGrid);

			return oStepGrid;
		}

        /*

		createContent: function(oController) {




			var oDataConnectionsGrid = new sap.ui.layout.Grid({
				vSpacing: 0
			});

			//Labels headers for each grid
			var oSourcesLabel = new sap.ui.commons.Label({
				text: "{i18n>dataConnectionWizardStep_oSourcesLabel}",
				textAligh: "Left",
				width: "100%",
				layoutData: new sap.ui.layout.GridData({
					span: "L2 M2 S2"
				})
			}).addStyleClass("serviceCatalogHeaderLabel");

			var oServiceInformationLabel = new sap.ui.commons.Label({
				text: "{i18n>dataConnectionWizardStep_oServiceInformationLabel}",
				textAligh: "Left",
				width: "100%",
				layoutData: new sap.ui.layout.GridData({
					span: "L6 M6 S6"
				})
			}).addStyleClass("serviceCatalogHeaderLabel");
			var oDetailsLabel = new sap.ui.commons.Label({
				text: "{i18n>dataConnectionWizardStep_oDetailsLabel}",
				width: "100%",
				layoutData: new sap.ui.layout.GridData({
					span: "L4 M4 S4"
				}),
				visible: {
					parts: ["iDataConnectionSelected", "mSelectionEnum", "bVisibleDetails"],
					formatter: function(index, mSelectionEnum, bVisible) {
						return !!mSelectionEnum && (index !== mSelectionEnum.ServiceCatalog) && bVisible;
					}
				}
			}).addStyleClass("serviceCatalogHeaderLabel");

			oDataConnectionsGrid.addContent(oSourcesLabel);
			oDataConnectionsGrid.addContent(oServiceInformationLabel);
			oDataConnectionsGrid.addContent(oDetailsLabel);

			var oServiceCatalogListItem = new sap.ui.core.ListItem({
				text: "{i18n>dataConnectionWizardStep_service_catalog}",
				width: "100%"
			});

			var oRepositoryBrowserListItem = new sap.ui.core.ListItem({
				text: "{i18n>dataConnectionWizardStep_repository_browser}",
				width: "100%"
			});

			var oFileSystemListItem = new sap.ui.core.ListItem({
				text: "{i18n>dataConnectionWizardStep_file_system}",
				width: "100%"
			});

			var oPasteURLListItem = new sap.ui.core.ListItem({
				text: "{i18n>dataConnectionWizardStep_paste_URL}",
				width: "100%"
			});

			var oSelectorListBox = new sap.ui.commons.ListBox("DataConnectionListBox", {
				width: "100%",
				select: [oController._onDataConnectionSelect, oController],
				layoutData: new sap.ui.layout.GridData({
					span: "L2 M2 S2",
					linebreak: true
				}),
				items: [oServiceCatalogListItem, oRepositoryBrowserListItem, oFileSystemListItem, oPasteURLListItem]
			});

			oDataConnectionsGrid.addContent(oSelectorListBox);

			//Create data section grid
			var oConnectionMainGrid = new sap.ui.layout.Grid({
				vSpacing: 0,
				layoutData: new sap.ui.layout.GridData({
					span: "L6 M6 S6"
				})
			}).addStyleClass("serviceCatalogFileUploaderTextField");
			oDataConnectionsGrid.addContent(oConnectionMainGrid);
			this._addFileSystemContent(oConnectionMainGrid, oController);
			this._addRepositoryBrowserContent(oConnectionMainGrid, oController);
			this._addServiceCatalogContent(oConnectionMainGrid, oController);
			this._addPasteURLContent(oConnectionMainGrid, oController);

			//Create details grid
			var oDetailsGrid = new sap.ui.layout.Grid({
				layoutData: new sap.ui.layout.GridData({
					span: "L4 M4 S4"
				})
			});
			this._addDetailsTree(oDetailsGrid, oController);
			oDataConnectionsGrid.addContent(oDetailsGrid);
			return oDataConnectionsGrid;
		},

		//Details or data grid
		_addDetailsTree: function(oGrid, oController) {

			var oServiceTree = new sap.ui.commons.Tree("DataConnectionServiceDetailsTree", {
				layoutData: new sap.ui.layout.GridData({
					span: "L12 M12 S12"
				}),
				showHeader: false,
				showHeaderIcons: false,
				selectionMode: sap.ui.commons.TreeSelectionMode.None
			});

			var oDetailsDataVisibilityContainer = new sap.watt.uitools.plugin.servicecatalog.ui.VisibilityContainer({
				visible: {
					parts: ["iDataConnectionSelected", "mSelectionEnum", "bVisibleDetails"],
					formatter: function(index, mSelectionEnum, bVisible) {
						return !!mSelectionEnum && (index === mSelectionEnum.FileSystem || index === mSelectionEnum.RepositoryBrowser || index ===
							mSelectionEnum.ServiceCatalog || index === mSelectionEnum.PasteURL) && bVisible;
					}
				},
				layoutData: new sap.ui.layout.GridData({
					span: "L12 M12 S12",
					linebreak: true
				}),
				content: [oServiceTree]
			});
			oGrid.addContent(oDetailsDataVisibilityContainer);
		},

		_addFileSystemContent: function(oGrid, oController) {
			var oFileUploader = new sap.ui.commons.FileUploader("DataConnectionFileUploader", {
				value: "{sFileUploaderText}",
				visible: {
					parts: ["iDataConnectionSelected", "mSelectionEnum"],
					formatter: function(index, mSelectionEnum) {
						return !!mSelectionEnum && index === mSelectionEnum.FileSystem;
					}
				},
				change: [oController._onFileUploaderChange, oController],
				uploadOnChange: true,
				width: "100%",
				sendXHR : true,
				layoutData: new sap.ui.layout.GridData({
					span: "L12 M12 S12"
				})
			}).addStyleClass("serviceCatalogFileUploader");
			oGrid.addContent(oFileUploader);

		},

		_addPasteURLContent: function(oGrid, oController) {

			var oPasteURLComboBox = new sap.ui.commons.DropdownBox("DataConnectionPasteURLDestinationsComboBox", {
				width: "100%",
				value: "{sPasteURLComboBoxValue}",
				change: [oController._onDestinationComboBoxChange, oController],
				placeholder: "{i18n>dataConnectionWizardStep_select_system}",
				visible: {
					parts: ["iDataConnectionSelected", "mSelectionEnum"],
					formatter: function(index, mSelectionEnum) {
						return !!mSelectionEnum && index === mSelectionEnum.PasteURL;
					}
				},
				layoutData: new sap.ui.layout.GridData({
					span: "L12 M12 S12",
					linebreak: true
				})
			}).addStyleClass("serviceCatalogStepBottomMargin");
			oGrid.addContent(oPasteURLComboBox);

			var oPasteUrlTextField = new sap.ui.commons.TextField("DataConnectionPasteURLTextField", {
				width: "100%",
				placeholder: "{i18n>dataConnectionWizardStep_paste_url_here}",
				tooltip: "{i18n>serviceCatalogWizardStep_urltextfield_placeholder}",
				value: "{sPasteUrlTextFieldValue}",
				visible: {
					parts: ["iDataConnectionSelected", "mSelectionEnum","bFullURL"],
					formatter: function(index, mSelectionEnum, bFullURL) {
						return (!!mSelectionEnum && index === mSelectionEnum.PasteURL) && (!bFullURL);
					}
				},
				liveChange: [oController._onPasteURLLiveChange, oController],
				change : [oController._onPasteURLChange, oController],
				layoutData: new sap.ui.layout.GridData({
					span: "L11 M11 S11"
				}),
				accessibleRole : sap.ui.core.AccessibleRole.Textbox
			}).addStyleClass("serviceCatalogStepBottomMargin");
			oGrid.addContent(oPasteUrlTextField);

			var oPasteURLSelectButton = new sap.ui.commons.Button("DataConnectionTestButton", {
				width: "100%",
				//text: "{i18n>dataConnectionWizardStep_test}",
				icon: "sap-icon://media-play",
				tooltip: "{i18n>dataConnectionWizardStep_test}",
				enabled: "{bSelect}",
				visible: {
					parts: ["iDataConnectionSelected", "mSelectionEnum", "bFullURL", "bAppKeyTextFieldVisible"],
					formatter: function(index, mSelectionEnum, bFullURL, bAppKeyTextFieldVisible) {
						//visible only if it is PasteURL && is not fullUrl. if it is fullUrl and has API key- need also to be visible
						// 			return (!!mSelectionEnum && index === mSelectionEnum.PasteURL) && (!bFullURL || bAppKeyTextFieldVisible);
						// visible when
						return (!!mSelectionEnum && index === mSelectionEnum.PasteURL) && (!bFullURL);
					}
				},
				// 	layoutData: new sap.ui.layout.GridData({
				// 		span: "L3 M3 S3",
				// 		indent: "{sServiceURLIndent}"
				// 	}),
				layoutData: new sap.ui.layout.GridData({
					span: "L1 M1 S1"
				}),
				press: [oController.onPasteURLSelectButton, oController]
			});
			oGrid.addContent(oPasteURLSelectButton);

			var oApiKeyTextField = new sap.ui.commons.TextField("ApiKeyTextField", {
				width: "100%",
				placeholder: "{i18n>serviceCatalogWizardStep_appkeytextfield_placeholder}",
				tooltip: "{i18n>serviceCatalogWizardStep_appkeytextfield_tooltip}",
				visible: "{bAppKeyTextFieldVisible}",
				value: "{sAppKeyTextFieldValue}",
				liveChange: [oController._onChangeApiKeyTextField, oController],
				layoutData: new sap.ui.layout.GridData({
					span: "L12 M12 S12"
				}),
				accessibleRole : sap.ui.core.AccessibleRole.Textbox
			}).addStyleClass("serviceCatalogStepBottomMargin");
			oGrid.addContent(oApiKeyTextField);
		},

		_addRepositoryBrowserContent: function(oGrid, oController) {
			var oRepositoryBrowserVisibilityContainer = new sap.watt.uitools.plugin.servicecatalog.ui.VisibilityContainer(
				"DataConnectionRepositoryBrowserContent", {
					visible: {
						parts: ["iDataConnectionSelected", "mSelectionEnum"],
						formatter: function(index, mSelectionEnum) {
							return !!mSelectionEnum && index === mSelectionEnum.RepositoryBrowser;
						}
					},
					layoutData: new sap.ui.layout.GridData({
						span: "L12 M12 S12"
					})
				}).addStyleClass("serviceCatalogRepositoryBrowser serviceCatalogStepBottomMargin");
			oGrid.addContent(oRepositoryBrowserVisibilityContainer);

		},

		_addServiceCatalogContent: function(oGrid, oController) {
			var oServiceCatalogVisibilityContainer = new sap.watt.uitools.plugin.servicecatalog.ui.VisibilityContainer(
				"DataConnectionServiceCatalogContent", {
					visible: {
						parts: ["iDataConnectionSelected", "mSelectionEnum", "bVisibleDetails"],
						formatter: function(index, mSelectionEnum) {
							return !!mSelectionEnum && index === mSelectionEnum.ServiceCatalog;
						}
					},
					layoutData: new sap.ui.layout.GridData({
						span: "L12 M12 S12"
					})
				});
			oGrid.addContent(oServiceCatalogVisibilityContainer);
		}
*/
	});