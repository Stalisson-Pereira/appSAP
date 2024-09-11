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

    return Controller.extend("sap.ui.app.inicio.controller.ProdutoCadastro", {
        onInit: function () {
            this.getView().setModel(new JSONModel({
                nome: "",
                descricao: "",
                preco: "",
                produtos: []
            }));
        },

        onSaveProduto: function () {
            const oData = this.getView().getModel().getData();

            // Enviar dados para o backend para salvar o produto
            fetch("http://localhost:3000/produtos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nome: oData.nome, descricao: oData.descricao, preco: oData.preco })
            })
                .then(response => response.json())
                .then(() => {
                    sap.m.MessageToast.show("Produto cadastrado com sucesso!");
                    this.onLoadProdutos(); // Recarregar a lista de produtos
                })
                .catch(error => {
                    console.error("Erro ao salvar produto:", error);
                    sap.m.MessageToast.show("Erro ao salvar produto.");
                });
        },

        onLoadProdutos: function () {
            // Carregar a lista de produtos do backend
            fetch("http://localhost:3000/produtos")
                .then(response => response.json())
                .then(data => {
                    this.getView().getModel().setProperty("/produtos", data);
                })
                .catch(error => {
                    console.error("Erro ao carregar produtos:", error);
                });
        }
    });
});