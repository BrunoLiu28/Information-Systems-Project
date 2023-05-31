var Utilizador = require("../models/utilizador");
var Item = require("../models/item");
var async = require("async");

const { body, validationResult } = require("express-validator");


exports.utilizador_create_post = async function (req, res, next) {

    const errors = validationResult(req);

    var utilizador = new Utilizador({ userId: req.body.userId, pass: req.body.pass});

    if (!errors.isEmpty()) {
        console.log("error");
        return;
    } else {
        try {
            const results = await Utilizador.findOne({ userId: req.body.userId }).exec();
            if (results) {
                res.status(400).json({message: 'Error: User already exists'});
            } else {
                await utilizador.save();
                const user = await Utilizador.findOne({userId: req.body.userId}).exec();
                console.log(user._id);
                res.status(200).json({userId: user._id, message: 'Authentication successful'});
            }
        } catch (err) {
            return next(err);
        }
    }
};


exports.utilizador_login_post = async function (req, res, next) {

    const errors = validationResult(req);

    var utilizador = new Utilizador({ userId: req.body.userId, pass: req.body.pass});

    if (!errors.isEmpty()) {
        console.log("error");
        return;
    } else {
        const user = await Utilizador.findOne({ userId: req.body.userId }).exec();
        console.log(utilizador.pass);
        console.log(req.body.userId);
        if (!user || user.pass !== utilizador.pass) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        console.log(user._id);
        res.status(200).json({ userId: user._id, message: 'Authentication successful' });
    }
};


exports.utilizador_main_page = async function (req, res, next) {

    const utilizador = await Utilizador.findById(req.params.id).populate({
        path: 'listas',
        populate: {
            path: 'objetos',
            model: 'Item'
        }
    }).populate('bibliotecaItems')
        .populate('listaSegue')
        .populate('listaSeguidores')
        .populate('carrinho')
        .populate('wishlist')
        .exec();
    if (!utilizador) {
        return res.status(404).json({ message: 'User doesnt exists' });
    }
    console.log(utilizador.userId);
    console.log(res.json(utilizador));

};

exports.update = async function (req, res, next){
    const id = req.body.id;

    const utilizador1 = await Utilizador.findById(id);

    const utilizador = {
        userId :req.body.userId,
        pass : req.body.pass,
        imagemDePerfil :req.body.imagemDePerfil,
        listas: utilizador1.listas,
        bibliotecaItems: utilizador1.bibliotecaItems,
        listaSegue: utilizador1.listaSegue,
        listaSeguidores: utilizador1.listaSeguidores,
        carrinho : utilizador1.carrinho,
    };

    console.log(req.body.imagemDePerfil)
    console.log(req.body.pass)
    console.log(req.body.userId)
    const userCheck = await Utilizador.findOne({ userId: req.body.userId }).exec();
    if(!userCheck || req.body.userId == utilizador1.userId){
        const updatedUser = await Utilizador.findByIdAndUpdate(id,utilizador);
        if(!updatedUser){
            res.status(404).json({msg: "Utilizador não encontrado."});
            return;
        }
        res.status(200).json({updatedUser, msg: "Utilizador atualizado com sucesso."});

    }else{
        res.status(400).json({message: 'Error: User already exists'});
    }
};

exports.add_itemCarrinho = async function (req, res, next) {
    const user = await Utilizador.findById(req.params.id);
    const item = await Item.findById(req.params.itemid);

    if (!user) {
        res.status(404).send('User not found');
    } else if (!item) {
        res.status(404).send('Item not found');
    } else {
        if (user.carrinho.includes(item._id)) {
            res.status(400).json({message: 'Item already in cart'});
        } else {
            // Add the item to the user's cart and send a success response.
            user.carrinho.push(item);
            await user.save();
            res.status(200).json({message: 'Item added to cart' });
        }
    }
};

exports.add_itemWishlist = async function (req, res, next) {
    const user = await Utilizador.findById(req.params.id);
    const item = await Item.findById(req.params.itemid);
    // console.log("ENTROU NA BD")
    if (!user) {
        res.status(404).send('User not found');
    } else if (!item) {
        res.status(404).send('Item not found');
    } else {
        if (user.wishlist.includes(item._id)) {
            res.status(400).json({message: 'Item already in cart'});
        } else {
            // Add the item to the user's cart and send a success response.
            user.wishlist.push(item);
            await user.save();
            res.status(200).json({message: 'Item added to cart' });
        }
    }
};

exports.removerItemWishlist = async function (req, res){
    const user = await Utilizador.findById(req.params.userId);
    const item = await Item.findById(req.params.itemId);

    console.log(req.params.userId);
    console.log(req.params.itemId);
    
    if (!user) {
        res.status(404).send('User not found');
    } else if (!item) {
        res.status(404).send('Item not found');
    } else{
        // user.wishlist.find((item)=> item._id == itemid);
        if (user.wishlist.find((item)=> item._id == req.params.itemId)) {
            user.wishlist.remove(req.params.itemId);
            await user.save();
            res.status(200).json({message: 'Item removed successfully'});
        } else {
            res.status(400).json({message: 'Item not in wishlist'});
        }
    }
}