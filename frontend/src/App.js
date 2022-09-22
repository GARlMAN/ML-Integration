import React, {useEffect, useState} from "react";
import './App.css';
import * as tf from "@tensorflow/tfjs";



function App() {
  
  const [num, setNum] = useState();
  const [data, setData] = useState();

  const [model, setModel] = useState();
  const [load, setLoad] = useState(true);
  
  async function loadModel() {
    const webModel = await tf.loadLayersModel(
      "https://raw.githubusercontent.com/GARlMAN/testing-deployment/master/models_save/model.json"
      );
      setModel(webModel);
      setLoad(false)
    }
    
  useEffect(() => {
    loadModel()
  }, [])
  
  if(load === true) return <h1>Loading</h1>
  
  function predictModel(e) {
    e.preventDefault();
    let a = Number(num);
    let input_xs = tf.tensor([[a]]);
    let output = model.predict(input_xs);
    setData(output.dataSync()[0]);
  }
    
  // function make_prediction() {
    
  // }

  // make_prediction()
  

  // fetch(
  //   "https://raw.githubusercontent.com/GARlMAN/testing-deployment/master/models_save/model.json"
  // )
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   window.alert("Sent")

    // POST request
    // fetch("http://localhost:5000/post", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
  // }

  return (
    <div className="App">
      <form>
        <input
          value={num}
          onChange={(e) => {
            setNum(e.target.value);
          }}
          placeholder="Enter a number"
        />
        <button type="submit" onClick={predictModel}>Submit</button>
      </form>
      <p>{data}</p>
    </div>
  );
}

export default App;
