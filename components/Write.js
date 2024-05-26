import React, {useState} from 'react';
import { getDatabase, ref, set, push } from 'firebase/database';
import app from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';

function Write() {

  const navigate = useNavigate();

  let [inputValue1, setInputValue1] = useState('')
  let [inputValue2, setInputValue2] = useState('')

  const saveData = async () => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "nature/fruits"))
    set(newDocRef, {
      fruitName: inputValue1,
      fruiteDefinition: inputValue2
    }).then (()=>{
      alert("data saved successfully")
    }).catch((error) =>{
      alert("error: ", error.message)
    })
  }

  return (
    <div>

      <h1>Put your fruit</h1>
      <input placeholder='Fruit Name' type="text" value={inputValue1} onChange={(e) => setInputValue1(e.target.value)}></input>
      <input placeholder='Fruit Description' type="text" value={inputValue2} onChange={(e) => setInputValue2(e.target.value)}></input>
      <button onClick={saveData}>Write</button>
      <br/>
      <br/>
      <br/>
      <button onClick={ () => navigate('/')}>Go update write</button>
      <button onClick={ () => navigate('/updateread')}>Go update read</button>
      <button onClick={ () => navigate('/read')}>Go read</button>
    </div>
  )
}

export default Write
