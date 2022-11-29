const express = require("express");
const router = express.Router();
const compController = require("../controllers/company");

router.post("/add", compController.createComp);
router.get("/viewone/:id", compController.getComp);
router.get("/allcomps", compController.getComps);
router.post("/edit/:id", compController.updateComp);
router.delete("/delete", compController.deleteCompany);
module.exports = router;
