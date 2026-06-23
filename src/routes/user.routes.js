const { Router } = require("express");
const userController = require("../controllers/user.controllers");
const validateSchema = require("../middlewares/validateSchema");
const { validateUserExists, validateFollowedUserExists } = require("../middlewares/valideteResource")
const { userSchema, userUpdateSchema } = require('../schemas/userSchema');
const router = Router();

router.get("/", userController.getAll);
router.get("/:nickname", validateUserExists, userController.getByNickname);
router.post("/", validateSchema(userSchema), userController.create);
router.delete("/:nickname", validateUserExists, userController.remove);
router.put("/:nickname", validateUserExists, validateSchema(userUpdateSchema), userController.update);

// Ver seguidores
router.get('/:nickname/followers', validateUserExists, userController.getFollowers);
router.get('/:nickname/following', validateUserExists, userController.getFollowing);

// Seguir y dejar de seguir
router.post('/:nickname/following/:followedNickname', validateUserExists, validateFollowedUserExists, userController.follow);
router.delete('/:nickname/following/:followedNickname', validateUserExists, validateFollowedUserExists, userController.unfollow);

module.exports = router;
