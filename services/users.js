// Imports
const mongoose = require("mongoose");

const { NotFoundError, BadRequestError } = require("../core/errors");

const { Praise, Users } = require("../models");

// Exports
module.exports = {
  getList,
  getDetails,
};

// Methods

/**
 * Retrieves all the users from the database
 *
 * @returns {Array<Object>} List of Users
 *
 */
async function getList() {
  return Users.find({}).sort({ firstname: 1, lastname: 1 }).lean();
}

/**
 * Retrives a specifid user's details
 *
 * @param {Object} obj
 * @param {String} obj.id User's ID
 *
 * @returns {Object} User
 *
 */
async function getDetails({ id }) {
  if (!id) {
    throw new BadRequestError("Cannot get user details, no `id` provided");
  }

  const user = await Users.findById(id).lean();

  if (!user) {
    throw new NotFoundError(`User ${id} not found`);
  }

  const userId = new mongoose.Types.ObjectId(user._id);
  const stats = await Praise.aggregate([
    {
      $match: {
        $or: [{ sender: userId }, { receiver: userId }],
      },
    },
    {
      $group: {
        _id: "$sender",
        // Calculate number of praises the user has sent
        sent: {
          $sum: {
            $cond: { if: { $eq: ["$sender", userId] }, then: 1, else: 0 },
          },
        },
        // Calculate number of praises the user has received
        received: {
          $sum: {
            $cond: { if: { $eq: ["$receiver", userId] }, then: 1, else: 0 },
          },
        },
      },
    },
  ]);

  return {
    ...user,
    stats: {
      sent: stats[0] ? stats[0].sent : 0,
      received: stats[0] ? stats[0].received : 0,
    },
  };
}
