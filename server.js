// server.js

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
const { mongoDB } = require("./src/config/mongo-db");

mongoDB();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));



// // API 엔드포인트 설정
// app.get("/api/hello", (req, res) => {
//   res.json({ message: "Hello from Express!" });
// });

// 정적 파일 제공 (CRA 빌드 파일)
app.use(express.static(path.join(__dirname, "build")));

// 모든 요청에 대해 CRA 빌드 파일로 라우팅
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
