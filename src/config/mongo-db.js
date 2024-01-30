const mongoose = require("mongoose");

exports.mongoDB = () => {
  mongoose
    .connect("mongodb+srv://root:1234@ansrlgur12.f3ysspm.mongodb.net/")
    .then(() => console.log("connected"))
    .catch(() => console.log("mongodb connection failed"));
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB 연결 오류:"));
  db.once("open", () => {
    console.log("MongoDB에 연결되었습니다.");
  });

};

export const Todo = mongoose.model("Todo", { text: String });