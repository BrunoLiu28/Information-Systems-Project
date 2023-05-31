var Item = require("../models/item");
var Utilizador = require("../models/utilizador");
var Lista = require("../models/lista");
const { body, validationResult } = require("express-validator");



exports.reset = function (req, res, next) {
    const items = [];
    const utilizadores = [];
    const listas = [];

    const mongoose = require("mongoose");
    mongoose.set("strictQuery", false); // Prepare for Mongoose 7

    // const mongoDB = "mongodb+srv://Grupo20:Vh7phAVTa3BbjK0E@projetopsigrupo20.bgxtint.mongodb.net/retryWrites=true&w=majority";
    const mongoDB = "mongodb://psi020:psi020@localhost:27017/psi020?retryWrites=true&authSource=psi020";
    main().catch((err) => console.log(err));

    async function main() {
        console.log("Debug: About to connect");
        await mongoose.connect(mongoDB);
        console.log("Debug: Should be connected?");

        await Item.deleteMany({});
        await Utilizador.deleteMany({});
        await Lista.deleteMany({});

        await createItems();
        await createListas();
        await createUtilizadores();


        console.log("Debug: Closing mongoose");
        res.json({ msg: "Reset made"});
    }

    async function createItems() {
        console.log("Adding Items");
        await Promise.all([
            itemCreate("League of Legends", "jogo", "League of Legends Descricao 1", "Steam", ["Portugues", "Ingles"], 10, "https://i.imgur.com/v3LmzQH.png",[3,5,2,1,4]),
            itemCreate("The Witcher 3 - Blood And Wine", "DLC", "The Witcher Descricao 2", "Ubisoft", ["Portugues", "Frances"],25, "https://i.imgur.com/CFKPAQU.png",[]),
            itemCreate("Valorant", "jogo", "Valorant Descricao 3", "EpicGames", ["Portugues", "Frances", "Ingles"],44, "https://i.imgur.com/WkP0CS5.png",[1,2,5,3,1]),
            itemCreate("Minecraft", "jogo", "Minecraft Descricao 3", "Origin", ["Portugues", "Frances", "Ingles"], 55, "https://i.imgur.com/jQcTsaq.png",[1,2]),
            itemCreate("PUGB", "jogo", "PUGB Descricao 3", "Steam", ["Portugues"], 55, "https://i.imgur.com/xmYGZl1.png",[5,5,4,5,3]),
            itemCreate("CS:GO", "jogo", "CS:GO Descricao 3", "Steam", ["Portugues", "Frances", "Ingles"], 55, "https://i.imgur.com/Ehv8c9F.png",[5,4,5,4,4]),
            itemCreate("CIV VI", "jogo", "CIV VI Descricao 3", "Steam", ["Portugues", "Frances", "Ingles"], 55, "https://i.imgur.com/ol5CCzT.jpg",[3,2,1,3], ["https://i.imgur.com/PcLDi1J.jpg","https://i.imgur.com/lZf3r8T.jpg", "https://i.imgur.com/M5uH0Qk.jpg", "https://i.imgur.com/3nqTqFv.jpg", "https://i.imgur.com/q6sLmYv.jpg"]),
            itemCreate("Sims 4 High School Years Expansion Pack", "DLC", "Sims 4 High School Years Expansion Pack Descricao 3", "Steam", ["Portugues"], 55, "https://i.imgur.com/SmqL3xX.jpg",[1,2,1,1]),
            itemCreate("Sims 4 Growing Together Expansion Pack", "DLC", "Sims 4 Growing Together Expansion Pack Descricao 3", "Steam", ["Portugues"], 55, "https://i.imgur.com/XEx7qjd.jpg",[3,3,4,2]),
            itemCreate("Portal 2", "jogo", "Portal 2 Descricao 3", "Steam", ["Portugues"], 55, "https://i.imgur.com/jXrRToQ.png",[2,3,4,5]),
            itemCreate("God of War", "jogo", "God of War Descricao 3", "Steam", ["Portugues"], 55, "https://i.imgur.com/FvoDsGB.png",[1,4,2,3,2,2]),
        ]);
    }

    async function itemCreate(nome, tipo,descricao, plataforma,idiomas, preco,imagemPrincipal, avaliacoes, imagensSecundarias) {
        const item = new Item({nome: nome, tipo: tipo , descricao: descricao, plataforma: plataforma,
            idiomas: idiomas, preco: preco, imagemPrincipal:imagemPrincipal, avaliacoes:avaliacoes, imagensIlustrativas: imagensSecundarias});
        await item.save();
        items.push(item);
        console.log(`Added Item: ${nome}`);
    }

    async function createListas() {
        console.log("Adding Listas");
        await Promise.all([
            listaCreate("Lista 1", [items[0], items[1],items[2],items[3]]),
            listaCreate("Lista 2", [items[2], items[3]]),
            listaCreate("Lista 3", [items[0]])
        ]);
    }

    async function listaCreate(nome, objetos) {
        const lista = new Lista({ nome, objetos });
        await lista.save();
        listas.push(lista);
        console.log(`Added Item: ${nome}`);
    }


    async function createUtilizadores() {
        console.log("Adding Utilizadores");
        await Promise.all([
            utilizadorCreate("mmmmmm", "123456789Ab",  listas[0], [items[4],items[6],items[8],items[5]]),
            utilizadorCreate("teste2", "123456789Ab", listas[1]),
            utilizadorCreate("aaaaa", "123456789Ab", listas[2]),
            utilizadorCreate("teste1", "123456789Ab",  listas[0], [items[4],items[6],items[8],items[5]], [await utilizadorCreate("bbbbb", "123456789Ab", listas[2]), await utilizadorCreate("ccccc", "123456789Ab", listas[2])], [await utilizadorCreate("teste8", "123456789Ab", listas[1]), await utilizadorCreate("teste9", "123456789Ab", listas[1])], "https://i.imgur.com/0UoLUaD.jpg"),
        ]);
    }

    async function utilizadorCreate(userId, pass, lista, biblioteca, seguidores, aSeguir, imagem) {
        const utilizador = new Utilizador({userId: userId, pass: pass , listas: [lista],
            listaSegue: aSeguir, listaSeguidores:seguidores, bibliotecaItems: biblioteca, imagemDePerfil: imagem});
        await utilizador.save();
        utilizadores.push(utilizador);
        console.log(`Added Item: ${userId}`);
    }

};