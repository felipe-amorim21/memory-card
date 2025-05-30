import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('');

  const shuffleCards = (data) => {
    return data.sort(() => Math.random() - 0.5);
  }

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

        shuffleCards(pokemonObject)
        setData(pokemonObject);

      }
      catch(err){
        setError(err);
      }
    }

    fetchData();
  }, []);


  const cardsToShow = data ? data.slice(0 , 9) : []

  const handleClick = (cardId) => {
    if(clickedCards.includes(cardId)){
      setGameStatus('Você Perdeu, Game Over');
    } else {
      setClickedCards((prev) => [...prev, cardId]);
      setScore(score + 1);
      shuffleCards(data);

      if(clickedCards.length + 1 === data.length + 1) {
        setGameStatus("Parabéns, Você Ganhou!")
      }
    }
  }

  return (
    <>
      <div>
        Score: {score}
      </div>
      <div className='card-container'>
        {cardsToShow && cardsToShow.map(p => (
        <Card key={p.id} id={p.id} name={p.name} image={p.image} onClick={handleClick}/>
        ))}
      </div>
      
    </>
  )
}

export default App
