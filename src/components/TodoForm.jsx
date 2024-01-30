// TodoForm.js (React 컴포넌트)

import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoForm = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [newTodo, setNewTodo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/data");
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [newTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 서버로 새로운 Todo 생성 요청
      const response = await axios.post("http://localhost:5000/api/todos", {
        text,
      });

      if (response.status === 201) {
        console.log("새로운 Todo가 생성되었습니다.");
        setNewTodo(!newTodo);
        setText("");
      } else {
        console.error("Todo 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("서버에 연결 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Todo 내용:
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <button type="submit">추가</button>
      </form>
      <br/>
      내용
      {data.map((item) => (
        <div key={item._id}>{item.text}</div>
      ))}
    </>
  );
};

export default TodoForm;
