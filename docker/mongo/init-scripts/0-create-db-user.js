var db = connect("root:example@127.0.0.1:27017/admin"); // eslint-disable-line no-undef

db = db.getSiblingDB("leapsome-interview");

db.createCollection("leapsome-interview");

db.createUser({
  user: "leapsome-user",
  pwd: "example",
  roles: [{ db: "leapsome-interview", role: "readWrite" }],
});
