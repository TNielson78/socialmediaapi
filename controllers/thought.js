const {User, Thought} = require('../models');
module.exports = { 
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async getThoughtById({ params },res) {
        try {
            const thought = await Thought.findOne({ _id: params.id });
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async createThought({ body }, res) {
        try {
            const thought = await Thought.create(body);
            const updatedUser = await User.findOneAndUpdate({_id:body.userId},{$push:{thoughts:thought._id}},{new:true});
            res.json({thought, updatedUser});
        }
        catch (error) {
            res.status(500).json(error);
        }
    },
};