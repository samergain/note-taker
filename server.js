const express = require("express");
const path = require("path");
const fs = require("fs");
// Sets up the Express App
// ===============================================
const app = express();
const PORT = process.env.PORT || 7500;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// ===============================================
// HTML routes
app.get("/", function(req,res){
    console.log("/ was called");
    res.sendFile(path.join(__dirname,"./public/index.html"));
});

app.get("/notes", function(req,res){
    console.log("/notes was called");
    res.sendFile(path.join(__dirname,"/public/notes.html"));
});
// ===============================================
// API routes
app.get("/api/notes", function(req,res){
    res.json(fs.readFile(path.join(__dirname,"./db/db.json")));
});
// app.post("/api/notes", function(req,res){
//     const newNote = req.body;
//     fs.appendFile(path.join(__dirname,"./db/db.json"),newNote, err => (err)? console.log(err):console.log("new note saved!"));
//     res.json(newNote);
// });







app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT);
  });