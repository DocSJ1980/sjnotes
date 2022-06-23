// Importing express server, router, middleware i.e. fetchuser, models i.e. Notes and express validator
const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//FIRST ROUTE: Get all the notes using : GET "/api/notes/fetchallnotes" Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {}
});

//SECOND ROUTE: Add note using : Post "/api/notes/addnotes" Login required
//Creating end point with post request and implementing login required through middleware
router.post("/addnotes", fetchuser,
    //Creating validations through express-validator to avoid useless requests to server
    [
    body("title", "Please enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be 5 characters long.").isLength({ min: 5 }),
    ],
    //Creating asyinc function for implementing the route
    async (req, res) => {
        try {
            //Put inputs to req.body
            const { title, description, tag } = req.body;
            //If there are errors, return bad reqquest aand the rrors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            // Create a new note using inputs from req.body
            const note = new Notes({
                title,
                description,
                tag,
                user: req.user.id,
            });
            // Save the created note and save in a const
            const savedNote = await note.save();
            //send saved note in response
            res.json(savedNote);
        } 
        //Try statement completed, now catching errors if above not successful.
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

//THIRD ROUTE: Update an existing note using : Post "/api/notes/updatenotes" Login required
router.put("/updatenote/:id", fetchuser,
    //Creating asyinc function for implementing the route
    async (req, res) => {
        //Put inputs to req.body
        const { title, description, tag } = req.body;
        
        //Create new note object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
        
        //Find the note to be updated and store
        let note = await Notes.findById(req.params.id);
        
        //Check if note belongs to logged in user and check if no note found
        if (!note){return res.status(404).send("Not Found")}
        if (note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        
        //if above condtions found true then update the note and return in response 
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note});
    }
)
module.exports = router
