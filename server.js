const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs");
const db = require("./db/db.json");
const path = require("path");
const notes = require("./db/db.json");

app.use(bodyParser.json());

//it uses JSON formatting
app.use(express.json());
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));

// Add a static middleware for serving assets in the public folder
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname,"./public")));

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });

  
  app.get('/api/notes', (req, res) => {
    // read the notes from the JSON file
    fs.readFile('db/db.json', (err, data) => {
      if (err) throw err;
        const notes = JSON.parse(data);
        res.send(notes);
    });
  });
  


  app.post('/api/notes', (req, res) => {
    fs.readFile('db/db.json', (err, data) => {
      if (err) throw err;
  
      const notes = JSON.parse(data);
      const newNote = req.body;
  
     notes.push(newNote);
      fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
        if (err) throw err;
        console.log('Note added successfully');
      });
        res.send('Note added successfully');
    });
  });
  

  app.delete('/api/notes/:id', (req, res) => {
    // read the notes from the JSON file
    console.log("id= " +req.params.id);
    fs.readFile('db/db.json', (err, data) => {
      if (err) throw err;
  
      const notes = JSON.parse(data);
      const index = notes.findIndex((note) => note.id === req.params.id);
  
      notes.splice(index, 1);
  
      fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
        if (err) throw err;
        console.log('Note deleted successfully');
      });
  
      res.send('Note deleted successfully');
    });
  });
  
    