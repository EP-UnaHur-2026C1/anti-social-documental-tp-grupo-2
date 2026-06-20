const { Router } = require("express");
const commentController = require("../controllers/comment.controllers");
const validateSchema = require("../middlewares/validateSchema");
const router = Router();

// router.get("/", commentController.getAll);
// router.get("/:id", validateSchema(idParamSchema, "params"), commentController.getById);
// router.post("/", commentController.create);
// router.put("/:id", validateSchema(idParamSchema, "params"), commentController.update);
// router.delete("/:id", validateSchema(idParamSchema, "params"), commentController.remove);

module.exports = router;