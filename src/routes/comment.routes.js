const { Router } = require("express");
const commentController = require("../controllers/comment.controllers");
const validateSchema = require("../middlewares/validateSchema");
const { commentSchema, commentUpdateSchema } = require('../schemas/commentSchema');
const router = Router();

router.get("/", commentController.getAll);
router.get("/:id", commentController.getById);
router.post("/:postId", validateSchema(commentSchema), commentController.create);
router.put("/:id", validateSchema(commentUpdateSchema), commentController.update);
router.delete("/:id", commentController.remove);

module.exports = router;