const router = require("express").Router();
const articlesController = require("../../controllers/articlesController")

router.get("/api/saved")
    .get(articlesController.findAll)

module.exports = router;