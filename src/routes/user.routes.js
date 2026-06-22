const { Router } = require("express");
const userController = require("../controllers/user.controllers");
const validateSchema = require("../middlewares/validateSchema");
const { userSchema, userUpdateSchema } = require('../schemas/userSchema');
const router = Router();

router.get("/", userController.getAll);
router.get("/:nickname", userController.getByNickname);
router.post("/", validateSchema(userSchema), userController.create);
router.delete("/:nickname", userController.remove);
router.put("/:nickname", validateSchema(userUpdateSchema), userController.update);

router.get('/:nickname/followers', userController.getFollowers);
router.get('/:nickname/following', userController.getFollowing);
router.post('/:nickname/following/:followedNickname', userController.follow);
router.delete('/:nickname/following/:followedNickname', userController.unfollow);

module.exports = router;
