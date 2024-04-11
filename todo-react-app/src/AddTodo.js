import React, {useState} from "react";

import {Button, Grid, TextField} from "@mui/material";

const AddTodo = (props) => {

    const [item, setItem] = useState({title: ""});

    const onInputChange = (e) => {
        setItem({title: e.target.value});
        console.log(item);
    }

    return (
        <Grid container style={{ marginTop:20 }}>
            <Grid xs={11} md={11} item Style={{paddingRight:16}}>
                <TextField placeholder='Add Todo here' fullWidth
                onChange={onInputChange} value={item.title}></TextField>
            </Grid>
            <Grid xs={1} md={1} item>
                <Button fullWidth style={{height: '100%'}} color="secondary" variant='outlined'>
                    +
                </Button>
            </Grid>
        </Grid>
    );
}

export default AddTodo;