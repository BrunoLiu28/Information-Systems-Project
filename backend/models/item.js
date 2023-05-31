var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    nome: { type: String, required: true, minLength: 3, maxLength: 100},
    tipo: { type: String, required: true, minLength: 3, maxLength: 1000},
    descricao: { type: String, required: true, minLength: 3, maxLength: 100},
    plataforma: { type: String, required: true},
    idiomas: [{ type: String, required: true}],
    preco: { type: Number, required: true},
    classificacao_Geral: { type: Number, required: false},
    // avaliacoes: { type: Number, required: false},
    avaliacoes: [{ type: Number, min: 1, max: 5 }],
    imagemPrincipal: { type: String, required: true},  // o require é true, mas mudado para false so para usar os testes
    imagensIlustrativas: [{ type: String, required: false}]
});

ItemSchema.virtual("url").get(function () {
    return "/init/item/" + this._id;
});


module.exports = mongoose.model("Item", ItemSchema);