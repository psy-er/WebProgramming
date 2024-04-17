import React, { useState } from 'react';
import { ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteOutline from "@mui/icons-material/DeleteOutline"

const Todo = (props) => {
    //let item = props.item;

    // [상태변수, 상태변수 업데이트 함수]
    const [item, setItem] = useState(props.item);
    const [readOnly, setReadOnly] = useState(true);

    const deleteItem = props.deleteItem;
    const editItem = props.editItem;

    const editEventHandler = (e) => {
        item.title = e.target.value;
        editItem();
    }

    const turnOffReadOnly = () => {
        setReadOnly(false);
    }

    const turnOnReadOnly = (e) => {
        if(e.key == "Enter"){
            setReadOnly(true);
        }
    }

    const deleteEventHandler = () => {
        deleteItem(item);
    }

    const checkboxEventHandler = (e) =>{
        item.done = e.target.checked;
        editItem();
    }

    return(
        <ListItem>
            <Checkbox checked={item.done} onChange={checkboxEventHandler}/>
            <ListItemText>
                <InputBase
                inputProps={{"aria-label": "naked", readOnly: readOnly}}
                onClick={turnOffReadOnly}
                onKeyDown={turnOnReadOnly}
                onChange={editEventHandler}
                type="text"
                id={item.id}
                name={item.id}
                value={item.title}
                multiline={true}
                fullWidth={true}
                />
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton aria-label="Delete Todo" onClick={deleteEventHandler} >
                    <DeleteOutline/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default Todo;