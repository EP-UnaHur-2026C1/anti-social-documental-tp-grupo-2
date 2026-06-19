const { Router } = require("express");
const tagController = require("../controllers/tag.controllers");
const validateSchema = require("../middlewares/validateSchema");
const { tagSchema, tagUpdateSchema } = require("../schemas/tagSchema");
const { idParamSchema } = require("../schemas/paramsSchema");
const router = Router();

router.get("/", tagController.getAll);
router.get("/:id", validateSchema(idParamSchema, "params"), tagController.getById);
router.post("/", validateSchema(tagSchema), tagController.create);
router.put("/:id", validateSchema(idParamSchema, "params"), validateSchema(tagUpdateSchema), tagController.update);
router.delete("/:id", validateSchema(idParamSchema, "params"), tagController.remove);

module.exports = router;