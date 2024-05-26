import React, {useState} from 'react';
import { getDatabase, ref, get, remove } from 'firebase/database';
import app from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';

function UpdateRead() {

  const navigate = useNavigate();

  let [fruitArray, setFruitArray] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app)
    const dbRef = ref(db, "nature/fruits");
    const snapshot = await get(dbRef);
    if(snapshot.exists()){

      const myData = snapshot.val();
      const temporaryArray = Object.keys(myData).map(myFireId => {
        return {
          ...myData[myFireId],
          fruitId: myFireId
        }
      })

      setFruitArray(temporaryArray);
    } else{
      alert("error");
    }
  }

  const deleteFruit = async (fruitIdParam) => {
    const db = getDatabase(app)
    const dbRef = ref(db, "nature/fruits/"+fruitIdParam);
    await remove(dbRef);
    window.location.reload();
  }

  return (
    <div>
      <h1>Click to show the fruit table</h1>
      <button onClick={fetchData}>Display Data</button>
      <ul>
        {fruitArray.map( (item, index) => (
          <li key={index}>
            {item.fruitName}: {item.fruiteDefinition} : {item.fruitId} 
            <button className='button' onClick={() => navigate(`/updatewrite/${item.fruitId}`)}>Update</button>
            <button className='button' onClick={() => deleteFruit(item.fruitId)}>Delete</button>
            </li>
        ) )}
      </ul>
      <br/>
      <br/>
      <br/>
      <button onClick={ () => navigate('/')}>Go homepage</button>
      <button onClick={ () => navigate('/read')}>Go read</button>
      <button onClick={ () => navigate('/write')}>Go write</button>
    </div>
  )
}

export default UpdateRead
