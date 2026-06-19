const { Router } = require("express");
const commentController = require("../controllers/comment.controllers");
const validateSchema = require("../middlewares/validateSchema");
const { commentSchema, commentUpdateSchema } = require("../schemas/commentSchema");
const { idParamSchema } = require("../schemas/paramsSchema");
const router = Router();

router.get("/", commentController.getAll);
router.get("/:id", validateSchema(idParamSchema, "params"), commentController.getById);
router.post("/", validateSchema(commentSchema), commentController.create);
router.put("/:id", validateSchema(idParamSchema, "params"), validateSchema(commentUpdateSchema), commentController.update);
router.delete("/:id", validateSchema(idParamSchema, "params"), commentController.remove);

module.exports = router;