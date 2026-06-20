const { Router } = require("express");
const postController = require("../controllers/post.controllers");
const validateSchema = require("../middlewares/validateSchema");
const upload = require("../middlewares/upload");
const router = Router();

// router.get("/", postController.getAll);
// router.get("/:id", validateSchema(idParamSchema, "params"), postController.getById);
// router.post("/", postController.create);
// router.put("/:id", validateSchema(idParamSchema, "params"), postController.update);
// router.delete("/:id", validateSchema(idParamSchema, "params"), postController.remove);

// // Imágenes
// router.post("/:id/images", validateSchema(idParamSchema, "params"), upload.single("image"), postController.addImage);
// router.delete("/:id/images/:imageId", validateSchema(idParamSchema, "params"), postController.removeImage);

// // Tags
// router.post("/:id/tags", validateSchema(idParamSchema, "params"), postController.addTag);
// router.delete("/:id/tags/:tagId", validateSchema(idParamSchema, "params"), postController.removeTag);

module.exports = router;
