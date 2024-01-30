import { Todo } from "../config/mongo-db";
const express = require("express");
const app = express();

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

app.get('/api/data', async (req, res) => {
  try {
    const result = await Todo.find({});
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});