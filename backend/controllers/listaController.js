var Lista = require("../models/lista");
var async = require("async");

const { body, validationResult } = require("express-validator");

exports.lista_list = function (req, res, next) {
    Lista.find()
        .sort([["nome", "ascending"]])
        .exec()
        .then((list_items) => {
            console.log(res.json(list_items));
        })
        .catch((err) => {
            return next(err);
        });
};
