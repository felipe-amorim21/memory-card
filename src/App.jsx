import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async ()=> {
      try{
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        if(!response){
          throw new Error("Erro na requisição");
        }
        const result = await response.json();
        setData(result);
      }
      catch(err){
        setError(err);
      }
    }

    fetchData();
  }, []);



  return (
    <>
      
    </>
  )
}

export default App
