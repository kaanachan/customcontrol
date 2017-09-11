jQuery.sap.declare("my.custom.control.Book");
//$.sap.includeStyleSheet("path/to/css/file");

jQuery.sap.require("sap.ui.commons.Button");
jQuery.sap.require("sap.ui.commons.Image");
jQuery.sap.require("sap.ui.commons.RatingIndicator");
jQuery.sap.require("sap.ui.commons.Link");
jQuery.sap.require("sap.ui.commons.TextView");
//jQuery.sap.require("nabisoft.bookstore.datatypes.CurrencyCode");

sap.ui.core.Control.extend("my.custom.control.Book", {

	// the control API:
	metadata: {
		properties: {
			/* Business Object properties */
			title: {
				type: "string"
			},
			author: {
				type: "string"
			},
			description: {
				type: "string"
			},
			price: {
				type: "float"
			},
			currencyCode: {
				//type: "nabisoft.bookstore.datatypes.CurrencyCode",
				type: "string",
				defaultValue: "USD"
			}, //BUG defaultValue is not validated
			comments: {
				type: "string[]",
				defaultValue: []
			},
			numberOfPages: {
				type: "int"
			},
			coverPictureUrl: {
				type: "string"
			},
			expressDelivery: {
				type: "boolean",
				defaultValue: false
			},

			/* other (configuration) properties */
			width: {
				type: "sap.ui.core.CSSSize",
				defaultValue: "400px"
			},
			height: {
				type: "sap.ui.core.CSSSize",
				defaultValue: "400px"
			},

			// only for demonstration
			someObject: {
				type: "object"
			},
			whatever: {
				type: "any"
			}
		},

		aggregations: {
			_buyButton: {
				type: "sap.ui.commons.Button",
				multiple: false,
				visibility: "hidden"
			},
			coverPicture: {
				type: "sap.ui.commons.Image",
				multiple: false,
				visibility: "public"
			}
		},

		associations: {
			relatedBooks: {
				type: "my.custom.control.Book",
				multiple: true,
				singularName: "relatedBook"
			}
		},

		events: {
			buy: {
				enablePreventDefault: true
			}
		}
	},

	_oLink: null, //a very very private property

	init: function() {
		var oControl = this,
			oBuyBtn, oCoverPic;

		this._oLink = new sap.ui.commons.Link();
		//do something with the link
		//...

		//create a button to allow used buying that book
		oBuyBtn = new sap.ui.commons.Button({
			text: "Buy this book",
			press: function(oEvent) {
				oControl.fireBuy({
					someData: "some data I want to pass along with the event object"
				});
			}
		});
		this.setAggregation("_buyButton", oBuyBtn);

		//create initialize the cover picture, but we don't have a src yet
		oCoverPic = new sap.ui.commons.Image({
			decorative: true,
			width: "150px",
			height: "200px",
			tooltip: "Cover of book"
		});
		oCoverPic.addStyleClass("nsBookCvrPic");
		this.setCoverPicture(oCoverPic);

	},

	onAfterRendering: function() {
		//called after instance has been rendered (it's in the DOM)
	},

	_somePrivateMethod: function() { /*do someting...*/ },

	somePublicMethod: function() { /*do someting...*/ },

	renderer: {

		render: function(oRm, oControl) {

			oRm.write("<div");
			oRm.writeControlData(oControl);

			oRm.addClass("nsBook");
			oRm.writeClasses();

			oRm.addStyle("width", oControl.getWidth());
			oRm.addStyle("height", oControl.getHeight());
			oRm.writeStyles();

			oRm.write(">");

			//content
			oRm.renderControl(oControl.getCoverPicture());

			//we don't do any fancy stuff because we are lazy ;-)
			//oRm.writeEscaped("<div>escape this</div>");
			oRm.write("<div>");
			oRm.write("<div>Title            : " + oControl.getTitle() + "</div>");
			oRm.write("<div>Author           : " + oControl.getAuthor() + "</div>");
			oRm.write("<div>Description      : " + oControl.getDescription() + "</div>");
			//oRm.write("<div>Price            : " + oControl.getPrice().toFixed(2) + " " + oControl.getCurrencyCode() + "</div>");
			oRm.write("<div>Comments         : <br/>" + oControl.getComments().join("<br/>") + "</div>");
			oRm.write("<div>Pages            : " + oControl.getNumberOfPages() + "</div>");
			oRm.write("<div>Express Delivery : " + oControl.getExpressDelivery() + "</div>");
			oRm.write("<div>");
			oRm.renderControl(oControl.getAggregation("_buyButton"));
			oRm.write("</div>");
			oRm.write("</div>");

			oRm.write("</div>");
		}
	}
});

//overwrite setter
// ui5.chapter9SAPUI5_CH9_2.control.Book.prototype.setCoverPictureUrl = function(sVal) {
// 	if (sVal) {
// 		this.setProperty("coverPictureUrl", sVal, /*suppressInvalidate*/ true); //do not re-render
// 		this.getCoverPicture().setSrc(sVal);
// 	}
// };

// ui5.chapter9SAPUI5_CH9_2.control.Book.prototype.exit = function() {
// 	/* release resources that are not released by the SAPUI5 framework */
// 	if (this._oLink) {
// 		this._oLink.destroy();
// 		delete this._oLink;
// 	}
// };