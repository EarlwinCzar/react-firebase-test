import React, {useState} from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import app from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';

function Read() {

  const navigate = useNavigate();

  let [fruitArray, setFruitArray] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app)
    const dbRef = ref(db, "nature/fruits");
    const snapshot = await get(dbRef);
    if(snapshot.exists()){
      setFruitArray(Object.values(snapshot.val()));
    } else{
      alert("error");
    }
  }

  return (
    
    <div>
      <h1>Display the fruit table!</h1>
      <button onClick={fetchData}>Display Data</button>
      <ul>
        {fruitArray.map( (item, index) => (
          <li key={index}>
            {item.fruitName}: {item.fruiteDefinition}
            </li>
        ) )}
      </ul>

      <br/>
      <br/>
      <br/>
      <button onClick={ () => navigate('/')}>Go homepage</button>
      <button onClick={ () => navigate('/write')}>Go write</button>
      <button onClick={ () => navigate('/updateread')}>Go updateread</button>
    </div>
  )
}

export default Read
