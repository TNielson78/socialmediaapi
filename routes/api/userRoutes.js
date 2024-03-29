const router = require('express').Router();
const {getAllUsers, getUserById, createUser, addFriend, removeFriend} = require('../../controllers/user');

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUserById);
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);


module.exports = router;