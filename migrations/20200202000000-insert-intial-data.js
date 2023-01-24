const mongoose = require("mongoose");

module.exports = {
  async up(db) {
    // Add users
    await db.collection("users").insertMany([
      {
        _id: new mongoose.Types.ObjectId("000000000000000000000001"),
        firstname: "Billie",
        lastname: "Some",
      },
      {
        _id: new mongoose.Types.ObjectId("000000000000000000000002"),
        firstname: "Lee",
        lastname: "Leaper",
      },
      {
        _id: new mongoose.Types.ObjectId("000000000000000000000003"),
        firstname: "Jim",
        lastname: "Halpert",
      },
      {
        _id: new mongoose.Types.ObjectId("000000000000000000000004"),
        firstname: "Tim",
        lastname: "Parker",
      },
      {
        _id: new mongoose.Types.ObjectId("000000000000000000000005"),
        firstname: "Susan",
        lastname: "Leapsome",
      },
      {
        _id: new mongoose.Types.ObjectId("000000000000000000000006"),
        firstname: "Sarah",
        lastname: "Müller",
      },
    ]);

    // Add some praise
    await db.collection("praises").insertMany([
      {
        sender: new mongoose.Types.ObjectId("000000000000000000000002"),
        receiver: new mongoose.Types.ObjectId("000000000000000000000003"),
        content:
          "I wanted to say this publicly, too - you have been an outstanding and invaluable partner in achieving this quarter's goals. Thanks again for being such a great team player!",
      },
      {
        sender: new mongoose.Types.ObjectId("000000000000000000000002"),
        receiver: new mongoose.Types.ObjectId("000000000000000000000001"),
        content:
          "Thanks so much for helping out during the workshop. Your support was invaluable and I think that due to your input we managed to nail the presentation. Really appreciate it!",
      },
      {
        sender: new mongoose.Types.ObjectId("000000000000000000000005"),
        receiver: new mongoose.Types.ObjectId("000000000000000000000003"),
        content:
          "The team event was awesome. Really liked the location, the food and the games 🙂 Thank you so much for organizing this, I think the entire team really enjoyed it!",
      },
      {
        sender: new mongoose.Types.ObjectId("000000000000000000000004"),
        receiver: new mongoose.Types.ObjectId("000000000000000000000002"),
        content:
          "First of: I'm happy to have you on board as a full-time team member. You did a really great job on managing the executive degree next to delivering impressive consulting results. You are always striving to learn and inspire the rest of us with your knowledge. Looking forward to working with you and learning from you!",
      },
    ]);
  },

  async down(db) {
    // Remove all users
    await db.collection("users").remove({});

    // Remove all praise
    await db.collection("praises").remove({});
  },
};
