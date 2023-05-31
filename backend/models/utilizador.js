var mongoose = require("mongoose");
const Item = require("./item");
const Utilizador = require("./utilizador");

var Schema = mongoose.Schema;

var UtilizadorSchema = new Schema({
    userId: { type: String, required: true, minLength: 3, maxLength: 100},
    pass: { type: String, required: true, minLength: 8, maxLength: 100},
    listas: [{type: Schema.ObjectId, ref: "Lista"}],
    bibliotecaItems: [{type: Schema.ObjectId, ref: "Item"}],
    listaSegue:[{type: Schema.ObjectId, ref: "Utilizador"}],
    listaSeguidores:[{type: Schema.ObjectId, ref: "Utilizador"}],
    imagemDePerfil: { type: String},
    carrinho : {type: [{type: Schema.ObjectId, ref: "Item"}], default: []},
    wishlist : {type: [{type: Schema.ObjectId, ref: "Item"}], default: []},
});

UtilizadorSchema.virtual("url").get(function () {
    return "/init/utilizador/" + this._id;
})
module.exports = mongoose.model("Utilizador", UtilizadorSchema);