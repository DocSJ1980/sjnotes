import React, { useContext, useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) =>{
    const notesInitial = [
        {
            "_id": "62b85bdf7427053f95a5d9e3",
            "user": "62b35aa7eb7cc2fefae311e2",
            "title": "My Note",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2022-06-26T13:15:11.204Z",
            "__v": 0
          },
          {
            "_id": "62b85bfd7427053f95a5d9e5",
            "user": "62b35aa7eb7cc2fefae311e2",
            "title": "My Program",
            "description": "Coding is my love",
            "tag": "personal",
            "date": "2022-06-26T13:15:41.393Z",
            "__v": 0
          }
    ]
    const [notes, setNotes] = useState(notesInitial);
    return (
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;