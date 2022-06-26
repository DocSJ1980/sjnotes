import React from "react";
import Notes from "./Notes";

function Home() {
  return (
    <div>
      <div className="container my-3">
    
        <h2>Add a note</h2>
    
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="text" className="form-control-plaintext" id="staticEmail" />
          </div>
        </div>
    
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword" />
          </div>
        </div>
    
      </div>
      <Notes/>
    </div>
  );
}

export default Home;
