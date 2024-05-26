import React, {useState, useEffect} from 'react';
import { getDatabase, ref, set, get } from 'firebase/database';
import app from "../firebaseConfig";
import { useNavigate, useParams } from 'react-router-dom';

function UpdateWrite() {

  const navigate = useNavigate();
  const {firebaseId} = useParams();

  let [inputValue1, setInputValue1] = useState('')
  let [inputValue2, setInputValue2] = useState('')

  useEffect(() =>{
    const fetchData = async () => {
      const db = getDatabase(app)
      const dbRef = ref(db, "nature/fruits/"+firebaseId);
      const snapshot = await get(dbRef);
      if(snapshot.exists()){
        const targetObject = snapshot.val();
        setInputValue1(targetObject.fruitName)
        setInputValue2(targetObject.fruiteDefinition)
      } else{
        alert("error");
      }
    }
    fetchData();
  }, [firebaseId]) 

  const overwriteData = async () => {
    const db = getDatabase(app);
    const newDocRef = ref(db, "nature/fruits/"+firebaseId)
    set(newDocRef, {
      fruitName: inputValue1,
      fruiteDefinition: inputValue2
    }).then (()=>{
      alert("data saved successfully")
    }).catch((error) =>{
      alert("Error: " + error.message);
    })
  }

  return (
    <div>
      <input placeholder='Fruit Name' type="text" value={inputValue1} onChange={(e) => setInputValue1(e.target.value)}></input>
      <input placeholder='Fruit Description' type="text" value={inputValue2} onChange={(e) => setInputValue2(e.target.value)}></input>
      <button onClick={overwriteData}>Update</button>
      <br/>
      <br/>
      <br/>
      <button onClick={ () => navigate('/')}>Go homepage</button>
      <button onClick={ () => navigate('/updateread')}>Go updateread</button>
      <button onClick={ () => navigate('/read')}>Go read</button>
    </div>
  )
}

export default UpdateWrite
