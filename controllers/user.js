const { User, Thought } = require('../models');
module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find({}).populate('thoughts').populate('friends');
            res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async getUserById({ params }, res) {
        try {
            const user = await User.findOne({ _id: params.id }).populate('thoughts').populate('friends');
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async createUser({ body }, res) {
        try {
            const user = await User.create(body);
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async addFriend (req, res){
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            res.json(user);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },
    async removeFriend (req, res){
        try {
            const user = await
            User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            res.json(user);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
};