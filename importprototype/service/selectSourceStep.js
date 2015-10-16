define({
    getContent : function() {
        jQuery.sap.require("import_build_prototype.control.SelectSourceContent");
        var oSelectSourceContent = new import_build_prototype.control.SelectSourceContent({
            context : this.context
        });

        var sTitle = this.context.i18n.getText("selectSourceStep_title");
        var sDescription = this.context.i18n.getText("selectSourceStep_description");

        return this.context.service.wizard.createWizardStep(oSelectSourceContent, sTitle, sDescription);
    }
});