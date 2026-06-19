const {Router} = require("express");
const userController = require("../controllers/user.controllers");
const validateSchema = require("../middlewares/validateSchema");
const {userSchema, userUpdateSchema} = require("../schemas/userSchema");
const { nicknameParamSchema, userFollowParamSchema } = require("../schemas/paramsSchema");
const router = Router();

router.get("/", userController.getAll);
router.get("/:nickname", validateSchema(nicknameParamSchema, "params"), userController.getByNickname);
router.post("/", validateSchema(userSchema), userController.create);
router.delete("/:nickname", validateSchema(nicknameParamSchema, "params"), userController.remove);
router.put("/:nickname", validateSchema(nicknameParamSchema, "params"), validateSchema(userUpdateSchema), userController.update);

// -- Rutas para followers --

// Obtener seguidores de un usuario
router.get("/:nickname/followers", validateSchema(nicknameParamSchema, "params"), userController.getFollowers);

// Obtener seguidos por un usuario
router.get("/:nickname/following", validateSchema(nicknameParamSchema, "params"), userController.getFollowing);

// Seguir a un usuario
router.post("/:nickname/following/:followedId", validateSchema(userFollowParamSchema, "params"), userController.follow);

// Dejar de seguir a un usuario.
router.delete("/:nickname/following/:followedId", validateSchema(userFollowParamSchema, "params"), userController.unfollow);

module.exports = router;
