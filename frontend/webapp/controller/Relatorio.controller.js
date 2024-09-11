// sap.ui.define([
//     "sap/ui/core/mvc/Controller"
// ],
// function (Controller) {
//     "use strict";

//     return Controller.extend("app.inicio.controller.View1", {
//         onInit: function () {

//         }
//     });
// });

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("sap.ui.app.inicio.controller.Relatorio", {
        onInit: function () {
            this.getView().setModel(new JSONModel({
                relatorio: {
                    clientes: []
                }
            }));
        },

        onGenerateReport: function () {
            // Chamar o backend para gerar o relatório de clientes e produtos
            fetch("http://localhost:3000/relatorios")
                .then(response => response.json())
                .then(data => {
                    this.getView().getModel().setProperty("/relatorio", data);
                    sap.m.MessageToast.show("Relatório gerado com sucesso!");
                })
                .catch(error => {
                    console.error("Erro ao gerar relatório:", error);
                    sap.m.MessageToast.show("Erro ao gerar relatório.");
                });
        }
    });
});
