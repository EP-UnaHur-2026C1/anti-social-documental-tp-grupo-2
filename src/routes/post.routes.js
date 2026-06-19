const { Router } = require("express");
const postController = require("../controllers/post.controllers");
const validateSchema = require("../middlewares/validateSchema");
const { postSchema, postUpdateSchema, postTagSchema } = require("../schemas/postSchema");
const { postImageSchema } = require("../schemas/postImageSchema");
const { idParamSchema, postImageParamSchema, postTagParamSchema } = require("../schemas/paramsSchema");
const upload = require("../middlewares/upload");
const router = Router();

router.get("/", postController.getAll);
router.get("/:id", validateSchema(idParamSchema, "params"), postController.getById);
router.post("/", validateSchema(postSchema), postController.create);
router.put("/:id", validateSchema(idParamSchema, "params"), validateSchema(postUpdateSchema), postController.update);
router.delete("/:id", validateSchema(idParamSchema, "params"), postController.remove);

// Imágenes
router.post("/:id/images", validateSchema(idParamSchema, "params"), upload.single("image"), postController.addImage);
router.delete("/:id/images/:imageId", validateSchema(postImageParamSchema, "params"), postController.removeImage);

// Tags
router.post("/:id/tags", validateSchema(idParamSchema, "params"), validateSchema(postTagSchema), postController.addTag);
router.delete("/:id/tags/:tagId", validateSchema(postTagParamSchema, "params"), postController.removeTag);

module.exports = router;
