const { Router } = require("express");
const postController = require("../controllers/post.controllers");
const validateSchema = require("../middlewares/validateSchema");
const { validatePostExists, validateUserExists, validateImageUrl, validateImageExists, validateTagExists, validateTagNotAssociated, validateTagAssociated } = require("../middlewares/valideteResource");
const { postSchema, postUpdateSchema, postTagSchema } = require('../schemas/postSchema');
const upload = require("../middlewares/upload");
const router = Router();

router.get("/", postController.getAll);
router.get("/:id", validatePostExists,  postController.getById);
router.post("/:nickname", validateUserExists, validateSchema(postSchema), postController.create);
router.put("/:id", validatePostExists, validateSchema(postUpdateSchema), postController.update);
router.delete("/:id", validatePostExists, postController.remove);

// Imágenes
router.post('/:id/images', validatePostExists, upload.single('image'), postController.addImage);
router.delete('/:id/images/:imageId', validatePostExists, validateImageExists, postController.removeImage);
// Tags
router.post('/:id/tags/:tagId', validatePostExists, validateTagExists, validateTagNotAssociated, postController.addTag);
router.delete('/:id/tags/:tagId', validatePostExists, validateTagExists, validateTagAssociated, postController.removeTag);

module.exports = router;
