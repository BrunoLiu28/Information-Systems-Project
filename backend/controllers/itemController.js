var Item = require("../models/item");
var async = require("async");

const { body, validationResult } = require("express-validator");

exports.item_list = function (req, res, next) {
    Item.find()
        .sort([["nome", "ascending"]])
        .exec()
        .then((list_items) => {
            console.log(res.json(list_items));
        })
        .catch((err) => {
            return next(err);
        });
};
exports.get_item = async (req, res) => {

    try {
        const id = req.params.itemid;
        const item = await Item.findById(id).populate('avaliacoes').populate('imagensIlustrativas');
        if(!item){
            res.status(404).json({msg: "Item não encontrado."})
            return;
        }
        res.json(item)
    } catch (error) {
        console.log(error);        
    }

}

exports.item_search = async (req, res) => {
    const nome = req.query.nome;
    if (!nome) {
        return res.status(400).send('Missing search term');
    }

    try {
        const items = await Item.find({ nome: { $regex: new RegExp(nome, 'i') } });
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}


exports.item_create_post = async function (req, res, next) {

    const errors = validationResult(req);

    var item = new Item({ nome: req.body.nome, tipo: req.body.tipo , descricao: req.body.descricao, plataforma: req.body.plataforma,
        idiomas: req.body.idiomas, preco: req.body.preco, imagemPrincipal: req.body.imagemPrincipal});

    if (!errors.isEmpty()) {
        console.log("error");
        return;
    } else {
        Item.findOne({ nome: req.body.nome }).exec(function (err, results) {
            if (err) {
                return next(err);
            }

            if (results) {
                res.statusCode = 404
            } else {
                item.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                });
            }
        });
    }
    res.json({ msg: "Added item : " + req.body.nome });
};