import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

function Home() {
  const context = useContext(noteContext);
  const {notes, setNotes} = context;
  return (
    <div>
      <div className="container my-3">
    
        <h2>Add a note</h2>
    
        <div className="mb-3 row">
          <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com"/>
          </div>
        </div>
    
        <div className="mb-3 row">
          <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword" />
          </div>
        </div>
    
      </div>
    
      <div className="container my-3">
        <h2>Your Notes</h2>
        {notes.map((note)=>{
          return note.title;
          })
        }
      </div>
    </div>
  );
}

export default Home;
