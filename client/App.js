import React from 'react'; 
import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios'; 

function App() {

  //Setting up useState to capture data
  const [workout, setWorkout] = useState(""); 
  const [reps, setReps] = useState(""); 
  const [wdata, setWdata] = useState(""); 
  const [updateReps, setUpdateReps] = useState(""); 
  const [updateName, setUpdateName] = useState(""); 

  //Auto refresh 
  const refresh = () => { 
    window.location.reload();
  }

  //Pull data from SQLdd
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) =>{
      setWdata(response.data)
    }); 
  }, []); 

  //Insert 
  const submitProgress = () => {
    Axios.post("http://localhost:3001/api/insert", {
      workout: workout, 
      reps: reps,
    }).then(() =>{
        alert("Successful insert")
      })
      refresh(); 
  }; 
  
  //Delete using unique ID 
  const deleteWork = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`); 
    refresh(); 
  };
  
  //Update Reps using ID to avoid changing duplicates
  const updateProgress = (id) => {
    Axios.put(`http://localhost:3001/api/update/${id}`, {
    reps: updateReps,        
    });
    setUpdateReps("");
    refresh();
  }; 
  //Update Workout name to avoid changing duplicates 
  const updateWorkout = (id) => {
    Axios.put(`http://localhost:3001/api/update/name/${id}`, {
    workout: updateName,        
    });
    setUpdateName("");
    refresh();
  }; 

  return (
    <div className="App">
        <h1>Test App</h1>

      <div classname = "form">
        
        <label>Type of Workout:</label>
        <input type ="text" name="workout" onChange={(e) =>
        setWorkout(e.target.value)}/>

        <label>Number of Reps:</label>
        <input type ="text" name="reps" onChange={(e) =>
        setReps(e.target.value)}/>

        <button onClick = {submitProgress} > Submit </button>

        {wdata && wdata.map((val) => {
          return (
            <div classname = "card">
            
              <h1>  Workout Type: {val.Workout} </h1> 
              <p> Rep Range: {val.reps} </p>           
              
              <button onClick={()=> {deleteWork(val.id)}} > Delete </button>
            
              <label>Update reps:</label>
              <input type="text" name="updateReps" onChange={(e) => 
                setUpdateReps(e.target.value)} /> 
              
              <button onClick={()=> {updateProgress(val.id)}} > Update Reps </button>

              <label>Update name:</label>
              <input type="text" name="updateName" onChange={(e) => 
                setUpdateName(e.target.value)} /> 
              
              <button onClick={()=> {updateWorkout(val.id)}} > Update Name </button>

            </div>
          ); 
        }
        )}
      </div>
    </div>
  );
}

export default App;
