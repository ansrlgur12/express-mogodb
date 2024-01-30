// server.js

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// db
mongoose
  .connect(
    "mongodb+srv://root:1234@ansrlgur12.f3ysspm.mongodb.net/"
  )
  .then(() => console.log("connected"))
  .catch(() => console.log("failed"));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB 연결 오류:"));
db.once("open", () => {
  console.log("MongoDB에 연결되었습니다.");
});

// Mongoose 모델 정의
const Todo = mongoose.model("Todo", { text: String });

app.use(express.static(path.join(__dirname, 'build')));



// API 엔드포인트 설정
app.post("/api/todos", async (req, res) => {
  const { text } = req.body;

  try {
    // 새로운 Todo 생성
    const newTodo = new Todo({ text });
    await newTodo.save();

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "서버 오류" });
  }
});

// API 엔드포인트 설정
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

// 정적 파일 제공 (CRA 빌드 파일)
app.use(express.static(path.join(__dirname, "build")));

// 모든 요청에 대해 CRA 빌드 파일로 라우팅
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.get('/api/data', async (req, res) => {
  try {
    const result = await Todo.find({});
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
