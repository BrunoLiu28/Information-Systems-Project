var express = require('express');
var router = express.Router();

var item_controller = require("../controllers/itemController");
var utilizador_controller = require("../controllers/utilizadorController");
var init_controller = require("../controllers/initController");
var lista_controller = require("../controllers/listaController");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/init", init_controller.reset);

/// ITEM ROUTES ///

router.get("/items", item_controller.item_list);

router.get("/items-search", item_controller.item_search);

router.post("/item", item_controller.item_create_post);

router.get("/item/:itemid", item_controller.get_item);

router.put("/utilizador/:id/item/:itemid", utilizador_controller.add_itemCarrinho);

router.put("/utilizador/:id/wishlist/:itemid", utilizador_controller.add_itemWishlist);

/// UTILIZADOR ROUTES ///
router.put("/prof-sets", utilizador_controller.update);

router.post("/register", utilizador_controller.utilizador_create_post);

router.post("/login", utilizador_controller.utilizador_login_post);

router.get("/:id/main-page", utilizador_controller.utilizador_main_page);

router.get("/listas", lista_controller.lista_list);

router.put("/wishlist/:userId/:itemId", utilizador_controller.removerItemWishlist);

module.exports = router;
