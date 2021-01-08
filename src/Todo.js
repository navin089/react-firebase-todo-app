import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Modal,
  Button,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import React, { useState } from "react";
import "./Todo.css";
import "./App";
import db from "./firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const updateTodo = () => {
    // update the todo with the new input text..
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h3>Update Message ✔ </h3>
          <FormControl>
            <InputLabel>✒ Update message</InputLabel>
            <Input
              placeholder={props.todo.todo}
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </FormControl>
          <Button
            disabled={!input}
            type="submit"
            onClick={updateTodo}
            variant="contained"
            color="primary"
          >
            UPDATE
          </Button>
        </div>
      </Modal>
    <div  className="todo-container">
      <List className="todo_list">
        <ListItem>
          <ListItemText primary={props.todo.todo} secondary="message sent ✔ " />
        </ListItem>

        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => setOpen(true)}
          style={{ marginLeft: -325, marginBottom: 13 }}
        >
          EDIT
        </Button>
        <DeleteForeverIcon
          style={{
            marginLeft: 7,
            marginButtom: 190,
          }}
          onClick={(event) =>
            db.collection("todos").doc(props.todo.id).delete()
          }
        />
      </List>
      </div>
    </>
  );
}

export default Todo;
