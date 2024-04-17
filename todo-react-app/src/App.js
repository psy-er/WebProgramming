import './App.css';
import Todo from './Todo';
import React, {useState, useEffect} from "react";
import { Container, List, Paper } from "@mui/material";
import AddTodo from "./AddTodo";

function App() { // 백엔드 받아오기 전 임시 데이터
  const [items, setItems] = useState([]);

  const requestOptions = {
    method: "GET",
    headers: {"Content-Type": "application/json"}
  };

  useEffect(() => {
      const requestOptions={
        method: "GET",
        headers: {"Content-Type": "application/json"},
      };
      fetch("http://localhot:8080/todo", requestOptions)
      .then((response) => response.json())
      .then(
        (response) => {
          setItems(response.data);
        },
        (error) => {}
      );
  },[]);

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
    item.id = "ID-" + items.length;
    item.done = false;
    setItems([...items, item]); // items 배열에 item 원소 추가 => 리랜더링된다
    console.log("items: ", items);
  }

  const deleteItem = (item) => {
    // 삭제할 아이템을 찾는다.
    const newItems = items.filter(e => e.id !== item.id);
    // 삭제할 아이템을 제외한 아이템을 다시 배열에 저장한다.
    setItems([...newItems]);
  }

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
