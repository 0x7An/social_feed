const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async follow(req, res, next) {
    try {
      const userToFollow = await User.findById(req.params.id);

      if (!userToFollow) {
        return res.status(404).json({ error: 'User does not exist' });
      }

      if (userToFollow.followers.indexOf(req.userId) !== -1) {
        return res.status(400).json({ error: `You're already following ${userToFollow.username}` });
      }

      userToFollow.followers.push(req.userId);
      await userToFollow.save();

      const userLogged = await User.findById(req.userId);
      userLogged.following.push(userToFollow.id);
      await userLogged.save();

      return res.json(userLogged);
    } catch (err) {
      return next(err);
    }
  },

  async unfollow(req, res, next) {
    try {
      const userToUnfollow = await User.findById(req.params.id);

      if (!userToUnfollow) {
        return res.status(404).json({ error: 'User not found' });
      }

      const following = userToUnfollow.followers.indexOf(req.userId);
      if (following === -1) {
        return res.status(400).json({ error: `You're not following ${userToUnfollow.username}` });
      }

      userToUnfollow.followers.splice(following, 1);
      await userToUnfollow.save();

      const userLogged = await User.findById(req.userId);

      const positionUnfollow = userLogged.following.indexOf(userToUnfollow.id);
      userLogged.following.splice(positionUnfollow, 1);

      await userLogged.save();

      return res.json(userLogged);
    } catch (err) {
      return next(err);
    }
  },
};
