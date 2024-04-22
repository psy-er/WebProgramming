import './App.css';
import Todo from './Todo';
import React, {useState, useEffect} from "react";
import { Container, List, Paper } from "@mui/material";
import AddTodo from "./AddTodo";
import {call} from "./service/ApiService";

function App() { // 백엔드 받아오기 전 임시 데이터
  const [items, setItems] = useState([]);

  const requestOptions = {
    method: "GET",
    headers: {"Content-Type": "application/json"}
  };

  useEffect(() => {
      call("/todo", "GET", null)
      .then((response) => setItems(response.data));
  },[]); // 배열 인자가 없어서 한번만 실행된다

  fetch("http://localhost:8080/todo", requestOptions)
  .then((response)=> response.json())
  .then(
    // 람다 함수가 2개, 첫번째는 요청이 잘 왔을때, 두번째는 요청 문제 생길때
    (response) => {
      setItems(response.data);
    },
    (error) => {

    }
  );

  const addItem = (item) => {
    call("/todo", "POST", item)
    .then((response)=> setItems(response.data));
  };

  const deleteItem = (item) => {
    call("/todo", "DELETE", item)
    .then((response)=> setItems(response.data));
  };

  const editItem = () => {
    setItems([...items]);
  }

  // JSX 결과를 변수에 저장함

  let todoItems = items.length >0 && (
    <Paper style ={{margin: 16}}>
      <List>
        {items.map((item) => (
          <Todo item={item} key={item.id} 
          editItem={editItem} deleteItem={deleteItem}/>
        ))}
      </List>
    </Paper>

  );
  return (
    <div className='App'>
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className="App">
          {todoItems}
        </div>
      </Container>
    </div>
  )
}
export default App;
