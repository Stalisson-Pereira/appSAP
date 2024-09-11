// sap.ui.define(
//     [
//         "sap/ui/core/mvc/Controller"
//     ],
//     function(BaseController) {
//       "use strict";
  
//       return BaseController.extend("app.inicio.controller.App", {
//         onInit: function() {
//         }
//       });
//     }
//   );
  

sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("sap.ui.app.inicio.controller.App", {
    onNavToClientes: function () {
      this.getOwnerComponent().getRouter().navTo("clientes");
    },
    onNavToProdutos: function () {
      this.getOwnerComponent().getRouter().navTo("produtos");
    },
    onNavToRelatorios: function () {
      this.getOwnerComponent().getRouter().navTo("relatorios");
    }
  });
});