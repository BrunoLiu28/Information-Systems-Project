var mongoose = require("mongoose");
const Item = require("./item");

var Schema = mongoose.Schema;

// const ListaObjetosSchema = new Schema({
//     type: { type: String, required: true, enum: ["item", "utilizador"] },
//     data: { type: Schema.Types.ObjectId, required: true, refPath: "type" }
// });

// const ListaObjetosSchema = new Schema({
//     type: { type: String, required: true, enum: ["item"] },
//     data: { type: Schema.Types.ObjectId, required: true, ref: "Item" }
// });

const ListaSchema = new Schema({
    nome: { type: String, required: true, minLength: 3, maxLength: 100 },
    objetos: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});


ListaSchema.virtual("url").get(function () {
    return "/init/lista/" + this._id;
})
module.exports = mongoose.model("Lista", ListaSchema);
