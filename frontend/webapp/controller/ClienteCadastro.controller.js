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

    return Controller.extend("sap.ui.app.inicio.controller.ClienteCadastro", {
        onInit: function () {
            this.getView().setModel(new JSONModel({
                nome: "",
                email: "",
                telefone: "",
                clientes: []
            }));
        },

        onSaveCliente: function () {
            const oData = this.getView().getModel().getData();

            // Enviar dados para o backend para salvar o cliente
            fetch("http://localhost:3000/clientes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nome: oData.nome, email: oData.email, telefone: oData.telefone })
            })
                .then(response => response.json())
                .then(() => {
                    sap.m.MessageToast.show("Cliente cadastrado com sucesso!");
                    this.onLoadClientes(); // Recarregar a lista de clientes
                })
                .catch(error => {
                    console.error("Erro ao salvar cliente:", error);
                    sap.m.MessageToast.show("Erro ao salvar cliente.");
                });
        },

        onLoadClientes: function () {
            // Carregar a lista de clientes do backend
            fetch("http://localhost:3000/clientes")
                .then(response => response.json())
                .then(data => {
                    this.getView().getModel().setProperty("/clientes", data);
                })
                .catch(error => {
                    console.error("Erro ao carregar clientes:", error);
                });
        }
    });
});