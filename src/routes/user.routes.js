const { Router } = require("express");
const userController = require("../controllers/user.controllers");
const validateSchema = require("../middlewares/validateSchema");
const router = Router();

router.get("/", userController.getAll);
router.get("/:nickname", userController.getByNickname);
router.post("/", userController.create);
router.delete("/:nickname", userController.remove);
router.put("/:nickname", userController.update);

// // -- Rutas para followers --

// // Obtener seguidores de un usuario
// router.get("/:nickname/followers", userController.getFollowers);

// // Obtener seguidos por un usuario
// router.get("/:nickname/following", userController.getFollowing);

// // Seguir a un usuario
// router.post("/:nickname/following/:followedId", validateSchema(userFollowParamSchema, "params"), userController.follow);

// // Dejar de seguir a un usuario.
// router.delete("/:nickname/following/:followedId", validateSchema(userFollowParamSchema, "params"), userController.unfollow);

module.exports = router;
