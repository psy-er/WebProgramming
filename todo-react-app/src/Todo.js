import React, { useState } from 'react';

const Todo = (props) => {
    //let item = props.item;

    // [상태변수, 상태변수 업데이트 함수]
    const [item, setItem ] = useState(props.item);

    let output = <div className = "Todo"> {/* 주석 */}
        <input 
            type="checkbox" 
            id={item.id} 
            name={item.id} 
            checked={item.done} />
        <label id={item.id} > {item.title} </label>
    </div>;

    return output;

};

export default Todo;