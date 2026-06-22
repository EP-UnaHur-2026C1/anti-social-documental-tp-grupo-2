const { Router } = require("express");
const tagController = require("../controllers/tag.controllers");
const validateSchema = require("../middlewares/validateSchema");
const { tagSchema }  = require('../schemas/tagSchema');
const { validateTagExists } = require("../middlewares/valideteResource");
const router = Router();

router.get("/", tagController.getAll);
router.get("/:id", validateTagExists, tagController.getById);
router.post("/", validateSchema(tagSchema), tagController.create);
router.put("/:id",validateTagExists, validateSchema(tagSchema), tagController.update);
router.delete("/:id", validateTagExists, tagController.remove);

module.exports = router;