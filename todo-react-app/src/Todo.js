import React, { useState } from 'react';
import { ListItem, ListItemText, InputBase, Checkbox } from '@mui/material';

const Todo = (props) => {
    //let item = props.item;

    // [상태변수, 상태변수 업데이트 함수]
    const [item, setItem] = useState(props.item);

    return(
        <ListItem>
            <Checkbox checked={item.done}/>
            <ListItemText>
                <InputBase
                inputProps={{"aria-label": "naked"}}
                type="text"
                id={item.id}
                name={item.id}
                value={item.title}
                multiline={true}
                fullWidth={true}
                />
            </ListItemText>
        </ListItem>
    );
};

export default Todo;