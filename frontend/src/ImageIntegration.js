import React, { useState } from 'react'

const ImageIntegration = () => {

  const [imgUrl, setImgUrl] = useState({imageUpload: ""});

  const [imgData, setImgData] = useState({});
  const [load, setLoad] = useState(true);

  fetch("http://localhost:5000/uploadImage")
    .then(response => response.json())
    .then((data) => {
      setImgData(data)
      setLoad(false)
    })

  function encode64 (e) {
    if (window.FileReader) {
      var file = e.target.files[0];
      var reader = new FileReader();
      if (file && file.type.match("image.*")) {
        reader.readAsDataURL(file);
      } else {
        console.log("Wrong")
      }
      reader.onloadend = function () {
        setImgUrl({imageUpload: reader.result})
      };
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    window.alert("Registered");
    fetch("http://localhost:5000/uploadImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imgUrl),
    });
  }

  return (
    <div>
      <form
        method="POST"
        action="http://localhost:5000/uploadImage"
      >
        <input type="file" onChange={encode64} />
        <div onClick={handleSubmit}><p>Submit</p></div>
      </form>
      {load ? <h1>Loading</h1> : <img src={imgData[0].imageUpload} alt="okay" />}
    </div>
  )
}

export default ImageIntegration