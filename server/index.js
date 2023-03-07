const express = require("express"); 
const app = express();
const mysql = require("mysql2"); 
const cors = require("cors"); 
const bodyParser = require("body-parser");

const db = mysql.createConnection({
    host:"localhost",
    user: "",
    password:"",
    database: "",
    port:3309
});

db.connect(function(err) { 
    if (err) throw err;
    console.log("Connected!");
}); 

app.use(cors()); 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true})); 

app.post("/api/insert", (req, res)=>{
    
    const workout = req.body.workout
    const reps = req.body.reps

    const sqlInsert = "INSERT INTO work1 (Workout, reps) VALUES (?,?)"; 
    db.query(sqlInsert, [workout, reps], (err, result) => {
        console.log(result)
    })
}); 

app.get("/api/get", (req, res)=>{

    const sqlSelect = "SELECT * FROM work1";
    db.query(sqlSelect, (err,result) => {
        res.send(result)
    }) 
});

app.delete("/api/delete/:id", (req, res)=>{
    
    const id = req.params.id;
    const sqlDelete = "DELETE FROM work1 WHERE id = ?"; 
    db.query(sqlDelete, id, (err, result) => {
        console.log(result); 
    });
}); 

app.put("/api/update/:id", (req, res)=>{
    
    const workout = req.params.id;
    const reps = req.body.reps;     

    const sqlUpdate = "UPDATE work1 SET reps = ? WHERE id = ?"; 
    db.query(sqlUpdate, [reps, workout], (err, result) => {
        console.log(workout);
        console.log(reps) 
    });

}); 

app.put("/api/update/name/:id", (req, res)=>{
    
    const workout = req.params.id;
    const name = req.body.workout;     

    const sqlUpdate = "UPDATE work1 SET Workout = ? WHERE id = ?"; 
    db.query(sqlUpdate, [name, workout], (err, result) => {
        console.log(workout);
        console.log(name) 
    });

}); 


app.listen(3001, () => {
    console.log("lisetning on port 3001"); 
}); 
