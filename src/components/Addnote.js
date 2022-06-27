import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'

const Addnote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "default" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

  return (
    <div>
        <div className="container my-3">
            <h2>Add a note</h2>
            <form className="my-3">
                <div className="mb-3 row">
                <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="title" onChange={onChange} name="title"/>
                </div>
                </div>

                <div className="mb-3 row">
                <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="description" onChange={onChange} name="description"/>
                </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Addnote
