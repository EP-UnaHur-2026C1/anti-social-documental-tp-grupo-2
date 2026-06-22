const { Router } = require("express");
const commentController = require("../controllers/comment.controllers");
const validateSchema = require("../middlewares/validateSchema");
const {validateCommentExists, validatePostExists, validateUserIdExists} = require("../middlewares/valideteResource");
const { commentSchema, commentUpdateSchema } = require('../schemas/commentSchema');
const router = Router();

router.get("/", commentController.getAll);
router.get("/:id", validateCommentExists, commentController.getById);
router.post("/:postId", validatePostExists, validateUserIdExists, validateSchema(commentSchema), commentController.create);
router.put("/:id", validateCommentExists, validateSchema(commentUpdateSchema), commentController.update);
router.delete("/:id", validateCommentExists, commentController.remove);

module.exports = router;