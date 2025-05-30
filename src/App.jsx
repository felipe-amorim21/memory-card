import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

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

        const pokemonFetch = result.results.map(pokemon => (
          fetch(pokemon.url).then( res => res.json())
        ))

        const detailedPokemon = await Promise.all(pokemonFetch);


        const pokemonObject = detailedPokemon.map(p => ({
          id: p.id,
          name: p.name,
          image: p.sprites.front_default,
        }))
        
        setData(pokemonObject);

      }
      catch(err){
        setError(err);
      }
    }

    fetchData();
  }, []);


  const shuffleCards = (data) => {
    return data.sort(() => Math.random() - 0.5);
  }

  data && shuffleCards(data)

  const cardsToShow = data ? data.slice(0 , 9) : []

  return (
    <>
      {cardsToShow && cardsToShow.map(p => (
        <Card key={p.id} name={p.name} id={p.id} image={p.image} />
      ))}
    </>
  )
}

export default App
