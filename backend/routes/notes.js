const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//FIRST ROUTE: Get all the notes using : GET "/api/auth/fetchallnotes" Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {}
});

//FIRST ROUTE: Add note using : Post "/api/auth/addnotes" Login required
router.post("/addnotes", fetchuser,
  [
    body("title", "Please enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be 5 characters long.").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If there are errors, return bad reqquest aand the rrors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
        }
  }
);

module.exports = router
