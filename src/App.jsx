import { useState, useEffect, use } from 'react'
import './App.css'
import Card from './components/Card'

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('');
  const [bestScore, setBestScore] = useState(0);
  const [loading, setLoading] = useState(true)

  const shuffleCards = (data) => {
    const newData = [...data];
    return newData.sort(() => Math.random() - 0.5);
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

        
        setData(shuffleCards(pokemonObject));
        setLoading(false);

      }
      catch(err){
        setError(err);
        setLoading(false);
      }
    }

    fetchData();
  }, []);


  const updateBestScore = (score) => {
    if(score > bestScore){
      setBestScore(score);
    }
  }

  const resetgame = () => {
    setScore(0);
    setClickedCards([]);
    setGameStatus('');
    setData((data) => shuffleCards(data));
  }


  const cardsToShow = data ? data.slice(0 , 9) : []

  const handleClick = (cardId) => {
    if(clickedCards.includes(cardId)){
      setGameStatus('Você Perdeu, Game Over');
      updateBestScore(score);
    } else {
      setClickedCards((prev) => [...prev, cardId]);
      setScore(prevScore => prevScore + 1);
      setData(shuffleCards(data));

      if(clickedCards.length === data.length) {
        setGameStatus("Parabéns, Você Ganhou!")
        updateBestScore(score);
      }
    }
  }

  if (loading) {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>Carregando Pokémon...</p>
    </div>
  );
}

  return (
    <>
      
      <div className='Score'>
         Score: {score} | Best Score: {bestScore}
      </div>
      {gameStatus && <div className='game-status'>
        <h2>{gameStatus}</h2>
        <button onClick={resetgame}>Reiniciar Jogo</button>
        </div>}
      <div className='card-container'>
        {cardsToShow && cardsToShow.map(p => (
        <Card key={p.id} id={p.id} name={p.name} image={p.image} onClick={handleClick}/>
        ))}
      </div>
      
    </>
  )
}

export default App
