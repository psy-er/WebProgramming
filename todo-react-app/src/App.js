import './App.css';
import Todo from './Todo';
import React, {useState} from "react";

function App() { // 백엔드 받아오기 전 임시 데이터
  const [items, setItems] = useState([{
    id : "0",
    title : "Hello World 1",
    done : true
  },{
    id : "1",
    title : "Hello World 2",
    done : false
  },{
    id : "2",
    title : "Hello World 3",
    done : true
  }]);

  // JSX 결과를 변수에 저장함

  let todoItems = 
  items.length > 0 && 
  items.map((item) => <Todo item={item} key={item.id}/>);

  return(
    <div className="App">
      {/* <Todo item={items[0]}/> */}
      {/* <Todo item={items[1]}/> */}
      {todoItems}
    </div>
  );
}

export default App;
