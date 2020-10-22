const express = require("express");
const path = require("path");
const fs = require("fs");
const { uuid } = require('uuidv4');
// Sets up the Express App
// ===============================================
const app = express();
const PORT = process.env.PORT || 7500;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// ===============================================
// HTML routes
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"/public/index.html"));
});

app.get("/notes", function(req,res){
    res.sendFile(path.join(__dirname,"/public/notes.html"));
});
// // ===============================================
// // API routes
app.get("/api/notes", function(req,res){
    fs.readFile(path.join(__dirname,"/db/db.json"), function(error, data) {
        if (error) {
            res.send("No known notes !");
        }
        else {
            console.log("reading from db.json");
            res.json(JSON.parse(data));
        }
    });
});


app.post("/api/notes", function(req,res){
    const postNote = req.body;
    postNote.id = uuid();
    res.json(postNote);
    fs.readFile(path.join(__dirname,"/db/db.json"), function(err,data){
        let notesArray = JSON.parse(data);
        notesArray.push(postNote);
        fs.writeFile(path.join(__dirname,"/db/db.json"),JSON.stringify(notesArray),
        err => (err)?console.log(err):console.log("Success! Note saved in db.json!"))
    })
});



// delete
app.delete("/api/notes/:id", function(req,res){
    fs.readFile(path.join(__dirname,"./db/db.json"), function(error, data) {
           let currentNotes = JSON.parse(data);
           let updatedNotes = currentNotes.filter(function(note) {
                                                 return note.id !== req.params.id;
                                                 }); 
        fs.writeFile(path.join(__dirname,"./db/db.json"),JSON.stringify(updatedNotes),
        err => (err)?console.log(err):res.json(data));    
    });  
});


app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT);
  });