const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));

function getNewID() {
  return Math.random().toString(36).substring(3);
}


// Create
app.post("/problems", (req, res) => {
    const problemList = readJSONFile();
    const newProblem = req.body;
    newProblem.id = getNewID();
    const newProblemList = [...problemList, newProblem];
    writeJSONFile(newProblemList);
    res.json(newProblem);
  });
  
  // Read One
  app.get("/problems/:id", (req, res) => {
    const problemsList = readJSONFile();
    const id = req.params.id;
    let idFound = false;
    let foundProblem;
  
    problemsList.forEach(problem => {
      if (id === problem.id) {
        idFound = true;
        foundProblem = problem;
      }
    });
  
    if (idFound) {
      res.json(foundProblem);
    } else {
      res.status(404).send(`Problem ${id} was not found`);
    }
  });
  
  // Read All
  app.get("/problems", (req, res) => {
 
    const problemsList = readJSONFile();
    res.json(problemsList);
  });
  
  // Update
  app.put("/problems/:id", (req, res) => {
    const problemsList = readJSONFile();
    const id = req.params.id;
    const newProblem = req.body;
    newProblem.id = id;
    idFound = false;
  
    const newProblemsList = problemsList.map((problem) => {
       if (problem.id === id) {
         idFound = true;
         return newProblem;
       }
      return problem;
    })
    
    writeJSONFile(newProblemsList);
  
    if (idFound) {
      res.json(newProblem);
    } else {
      res.status(404).send(`Problem ${id} was not found`);
    }
  
  });
  
  // Delete
  app.delete("/problems/:id", (req, res) => {
    const problemsList = readJSONFile();
    const id = req.params.id;
    const newProblemsList = problemsList.filter((problem) => problem.id !== id)
  
    if (problemsList.length !== newProblemsList.length) {
      res.status(200).send(`Problem ${id} was removed`);
      writeJSONFile(newProblemsList);
    } else {
      res.status(404).send(`Problem ${id} was not found`);
    }
  });
  
  // Functia de citire din fisierul db.json
  function readJSONFile() {
    return JSON.parse(fs.readFileSync("db.json"))["problems"];
  }
  
  // Functia de scriere in fisierul db.json
  function writeJSONFile(content) {
    fs.writeFileSync(
      "db.json",
      JSON.stringify({ problems: content }),
      "utf8",
      err => {
        if (err) {
          console.log(err);
        }
      }
    );
  }
  

 app.listen("3000", () => {
   console.log("Server started at: http://localhost:3000");
 });