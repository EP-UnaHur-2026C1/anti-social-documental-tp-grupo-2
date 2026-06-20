const { Router } = require("express");
const tagController = require("../controllers/tag.controllers");
const validateSchema = require("../middlewares/validateSchema");
const router = Router();

// router.get("/", tagController.getAll);
// router.get("/:id", validateSchema(idParamSchema, "params"), tagController.getById);
// router.post("/", tagController.create);
// router.put("/:id", validateSchema(idParamSchema, "params"), tagController.update);
// router.delete("/:id", validateSchema(idParamSchema, "params"), tagController.remove);

module.exports = router;