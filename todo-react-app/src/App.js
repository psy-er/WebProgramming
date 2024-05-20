import './App.css';
import Todo from './Todo';
import React, {useState, useEffect} from "react";
import { Container, List, Paper, Grid, Button, AppBar, Toolbar, Typography } from "@mui/material";
import AddTodo from "./AddTodo";
import {call, signout} from "./service/ApiService";

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

  const editItem = (item) => {
    call("/todo", "PUT", item)
    .then((response)=> setItems(response.data));
  }

  // JSX 결과를 변수에 저장함

  let todoItems = items.length > 0 && (
    <Paper style ={{margin: 16}}>
      <List>
        {items.map((item) => (
          <Todo item={item} key={item.id} 
          editItem={editItem} deleteItem={deleteItem}/>
        ))}
      </List>
    </Paper>
  )
  return (
    <div className='App'>
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className="App">
          {todoItems}
        </div>
      </Container>
    </div>
  );

  // navigationBar 추가
  let navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Button color="inherit" raised onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  return (
    <div className="App">
      {navigationBar} {/*네비게이션 바 렌더링 */}
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className='TodoList'>{todoItems}</div>
      </Container>
    </div>
  );
}

export default App;
