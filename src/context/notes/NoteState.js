import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) =>{
    const notesInitial = [
        {
            "_id": "62b85bdf7427053f95a5s9e3",
            "user": "62b35aa7eb7cc2fefae311e2",
            "title": "My Note",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2022-06-26T13:15:11.204Z",
            "__v": 0
          },
          {
            "_id": "62b15bfd7427053f95a5d9e5",
            "user": "62b35aa7eb7cc2fefae311e2",
            "title": "My Program",
            "description": "Coding is my love",
            "tag": "personal",
            "date": "2022-06-26T13:15:41.393Z",
            "__v": 0
          },
          {
            "_id": "62b25bdf7427053f95a5d9e3",
            "user": "62b35aa7eb7cc2fefae311e2",
            "title": "My Note",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2022-06-26T13:15:11.204Z",
            "__v": 0
          },
          {
            "_id": "62b85bfd7127053f95a5d9e5",
            "user": "62b35aa7eb7cc2fefae311e2",
            "title": "My Program",
            "description": "Coding is my love",
            "tag": "personal",
            "date": "2022-06-26T13:15:41.393Z",
            "__v": 0
          },
          {
            "_id": "62b85bdf7327053f95a5d9e3",
            "user": "62b35aa7eb7cc2fefae311e2",
            "title": "My Note",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2022-06-26T13:15:11.204Z",
            "__v": 0
          },
          {
            "_id": "62b85bfd7427053r95a5d9e5",
            "user": "62b35aa7eb7cc2fefae311e2",
            "title": "My Program",
            "description": "Coding is my love",
            "tag": "personal",
            "date": "2022-06-26T13:15:41.393Z",
            "__v": 0
          },
          {
            "_id": "62b85bdf7427053f95a5d9e3",
            "user": "62b35aa7eb7cc2tefae311e2",
            "title": "My Note",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2022-06-26T13:15:11.204Z",
            "__v": 0
          },
          {
            "_id": "62b85bfd7427053f95a5d9q5",
            "user": "62b35aa7eb7cc2fefae311e2",
            "title": "My Program",
            "description": "Coding is my love",
            "tag": "personal",
            "date": "2022-06-26T13:15:41.393Z",
            "__v": 0
          },
          {
            "_id": "62b85bdf7427053f95a5d9w3",
            "user": "62b35aa7eb7cc2fefae311e2",
            "title": "My Note",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2022-06-26T13:15:11.204Z",
            "__v": 0
          },
          {
            "_id": "62b85bfd7427053f95p5d9e5",
            "user": "62b35aa7eb7cc2fefae311e2",
            "title": "My Program",
            "description": "Coding is my love",
            "tag": "personal",
            "date": "2022-06-26T13:15:41.393Z",
            "__v": 0
          },
    ]
    const [notes, setNotes] = useState(notesInitial);
    //Add a note
    const addNote = (title, description, tag)=>{
      //TODO API Call
      console.log("Adding a note")
      const note ={
            "_id": "62b85bfd7427053f95p5d9e5",
            "user": "62b35aa7eb7cc2fefae311e2",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-06-26T13:15:41.393Z",
            "__v": 0 
      };
      setNotes(notes.concat(note));
    }
// Delete a Note
const deleteNote = (id)=>{
  //TODO API Call
  console.log("Deleting note with ID: " +id);
  const newNotes = notes.filter((note)=>{return note._id!==id});
  setNotes(newNotes);
}
// Edit a Note
const editNote = ()=>{

}

return (
  <noteContext.Provider value={{notes, addNote,deleteNote, editNote }}>
        {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;