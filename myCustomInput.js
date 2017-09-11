sap.ui.define([
	"sap/ui/core/Control",
	"sap/ui/layout/Grid",
	"sap/ui/layout/GridData",
	"sap/m/Input",
	"sap/ui/core/Icon"
], function(Control, Grid, GridData, Input, Icon) {
	"use strict";

	return Control.extend("my.custom.control.myCustomInput", {
		metadata: {
			properties: {
				"value": {
					type: "string",
				},
				"iconURI": {
					type: "string",
					defaultValue: ""
				}
			},
			aggregations: {
				"_layout": {
					type: "sap.ui.layout.Grid",
					multiple: false,
					visibility: "hidden"
				}
			}
		},

		init: function() {
			var that = this;

			this._oInput = new Input({
				value: this.getValue(),
				layoutData: new GridData({
					span: "L11 M11 S11"
				})
			});

			this._oIcon = new Icon({
				src: this.getIconURI(),
				layoutData: new GridData({
					span: "L1 M1 S1"
				})
			});
			this._oIcon.addStyleClass("sapUiSmallMarginBegin");

			this.setAggregation("_layout",
				new Grid({
					content: [
						this._oIcon,
						this._oInput
					],
					hSpacing: 0,
					vSpacing: 0
				})
			);

			this._oInput.attachChange(function() {
				// that._oIcon.toggleStyleClass("sapThemePositiveText", that._oInput.getValue() !== "");
				that._oIcon.toggleStyleClass("greenTxt", that._oInput.getValue() !== "");
				that.setValue(that._oInput.getValue());
			});
		},

		onBeforeRendering: function() {},

		onAfterRendering: function() {},

		exit: function() {
			this._oIcon.destroy();
			this._oInput.destory();
		},

		renderer: function(oRM, oControl) {
			oRM.write("<div");
			oRM.writeControlData(oControl);
			oRM.addClass("myListItem"); //??
			oRM.addClass("sapThemePositiveText");
			oRM.writeClasses();
			oRM.write(">");
			oRM.renderControl(oControl.getAggregation("_layout"));
			oRM.write("</div>");
		},

		/*=============================
				custom functions
		=============================*/
		setValue: function(sValue) {
			this.setProperty("value", sValue, true);
			this._oInput.setValue(sValue);
		},

		setIconURI: function(sURI) {
			this.setProperty("iconURI", sURI, true);
			this._oIcon.setSrc(sURI);
		}

	});
});
