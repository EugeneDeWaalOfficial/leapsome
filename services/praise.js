// Imports
const { BadRequestError } = require("../core/errors");

const { Praise } = require("../models");

// Exports
module.exports = {
  getList,
  create,
};

// Methods

/**
 * Retrieves all the praise from the database
 *
 * @returns {Array<Object>} List of praises
 *
 */
async function getList() {
  return Praise.find({})
    .populate("sender receiver", "firstname lastname")
    .sort({ createdAt: -1 })
    .lean();
}

/**
 * Create a new praise
 *
 * @param {Object} obj
 * @param {String} obj.sender
 * @param {String} obj.receiver
 * @param {String} obj.content
 *
 * @return {Object} Praise
 *
 */
async function create({ sender, receiver, content }) {
  if (!sender) {
    throw new BadRequestError("Missing sender");
  }

  if (!receiver) {
    throw new BadRequestError("Missing receiver");
  }

  if (!content) {
    throw new BadRequestError("Missing content");
  }

  const praise = await Praise.create({
    sender,
    receiver,
    content,
  });

  praise.populate("sender receiver", "firstname lastname");

  return praise;
}
