const { Router } = require("express");
const tagController = require("../controllers/tag.controllers");
const validateSchema = require("../middlewares/validateSchema");
const { tagSchema }  = require('../schemas/tagSchema');
const router = Router();

router.get("/", tagController.getAll);
router.get("/:id", tagController.getById);
router.post("/", validateSchema(tagSchema), tagController.create);
router.put("/:id", validateSchema(tagSchema), tagController.update);
router.delete("/:id", tagController.remove);

module.exports = router;