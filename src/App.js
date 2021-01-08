import "./App.css";
import React, { useState, useEffect } from "react";
//import React from 'react';
import Todo from "./Todo";
import db from "./firebase";
import firebase from 'firebase';

import { Button, FormControl, Input, InputLabelm, TextField } from "@material-ui/core";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  // console.log(input);

// when the app loads, we needs to listen and fetch new todos as they get added/removed

useEffect(() => {
  // this code runs when app.js loads
db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    //console.log(snapshot.docs.map(doc => doc.data()));
    setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
  })
}, []);

  const addTodo = (event) => {
    // this will fire up when button clicked..
    event.preventDefault(); // will stop refreshing page everytime
    db.collection('todos').add({
      todo:input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput(""); // to clear up the input field after hitting submit
  };
  return (
    <div className="App">
      <h1>Anonymous Console 🔥 </h1>
      <form>
        <TextField label="✍ Write a message" variant="outlined" 
        value={input}
        onChange={(event) => setInput(event.target.value)}
        />

        <Button
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
          style={{marginLeft:17, marginTop: 8}}
        >
          SEND
        </Button>
      </form>
      <ul>
        {todos.map(todo => (
          <Todo todo={todo} />
          // <li> {todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
