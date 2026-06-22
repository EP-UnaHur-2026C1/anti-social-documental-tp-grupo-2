const { Router } = require("express");
const postController = require("../controllers/post.controllers");
const validateSchema = require("../middlewares/validateSchema");
const { postSchema, postUpdateSchema, postTagSchema } = require('../schemas/postSchema');
const upload = require("../middlewares/upload");
const router = Router();

router.get("/", postController.getAll);
router.get("/:id", postController.getById);
router.post("/:nickname", validateSchema(postSchema), postController.create);
router.put("/:id", validateSchema(postUpdateSchema), postController.update);
router.delete("/:id", postController.remove);

// // Imágenes
router.post("/:id/images", postController.addImage);
router.delete("/:id/images/:imageId", postController.removeImage);

// // Tags
router.post("/:id/tags", validateSchema(postTagSchema), postController.addTag);
router.delete("/:id/tags/:tagId", postController.removeTag);

module.exports = router;
