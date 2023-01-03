
import "./styles.css";
import { useState } from 'react';
import { CARD_ARRAY } from './data'

export default function App() {

  
  const [ playCards, setPlayCards] = useState([...CARD_ARRAY])
  const [score, setScore] = useState(3);
  const [ prevCard, setPrevCard] = useState(null)
  const [ isGameStarted, setIsGameStarted] = useState(false)
  const [ isGameEnded, setIsGameEnded] = useState(false)


  const shuffleArrayCards = (arrCards)=>{
    let arr = [...arrCards]
    for( let i =arr.length -1 ;i>=0; i--){
      let new_index = Math.floor(Math.random()*(i))
      let temp = arr[i];
      arr[i]  = arr[new_index];
      arr[new_index] = temp;
    }
    return arr;
  }
  const startGame =()=>{
    const cards = [...CARD_ARRAY]
    const shuffledCards = [...shuffleArrayCards(cards)]
   
    setPlayCards([...shuffledCards])
    setScore(3)
    setIsGameStarted(true);
  }

  const updateScoreAndCards =(index_card)=>{
    let open_cards =0;
    for(let item of playCards){
      if(item.isOpened){
        open_cards++;
      }
    }
    if(open_cards%2 ===0){
      if(playCards[index_card].color === playCards[prevCard].color){
        setScore(score=>score+3)
      }else{
        
        setTimeout(()=>{
          /**
           * flip the wrong card back again
           */
          let cards = [...playCards]
          cards[index_card].isOpened = false

          /**
           * shuffle then remaining
           */
          for( let i =cards.length -1 ;i>=0; i--){
            let new_index = Math.floor(Math.random()*(i))
            if(!cards[i].isOpened && !cards[new_index].isOpened){
              let temp = cards[i];
              cards[i]  = cards[new_index];
              cards[new_index] = temp;
            }
         
          }

          setPlayCards([...cards])
        },1000)
       
        setScore(score=>score-1)
      }
      //setPrevCard(index_card);
      
      if(score ===0 ){
        setIsGameEnded(true)
      }

      /**
       * check if all the cards are open
       */
      if(open_cards === 10){
        setIsGameEnded(true)
      }
    } else{
      setPrevCard(index_card);
    }

  }

  const flipCard =(index_card) =>{
    const cards = [...playCards]
    cards[index_card]['isOpened'] =true
    setPlayCards([...cards]);

    updateScoreAndCards(index_card)
  }

  return (
    <div className="App">
      <button onClick={startGame}> {!isGameStarted? (<span>Play Game </span>) : <span> Restart Game </span>}  </button> 
      {isGameStarted && (
        <>
          <div> Your current Score : {score} </div>
          <div className="cardsWrapper">
            {playCards.map((item, index)=>{
              return(
                <div onClick={()=>flipCard(index)} key={index} className="card">
                  {item.isOpened?<span>{item.color}</span>:<span>Click me to flip </span>}
                </div>
              )
              })}
          </div>

          {isGameEnded && (
            <div>
              {score ===0 && (
              <div>
                You Lost, try again!
              </div>)}
              {score >0 && (
              <div>
                COngrats You Won!
              </div>)}
            </div>
          )}
        </>
      )}
      
    </div>
  );
}
