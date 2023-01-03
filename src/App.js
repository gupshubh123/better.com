import logo from './logo.svg';
import './App.css';

function App() {
  const [guess, setGuess] = useState("")
  const [allGuessValues, setallGuessValues]  = useState([])
  const [actualValue, setActualValue] = useState(null)
  const ref = useRef(null);

  const guessHandler =(e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const guessValue = +data.get('guess')
    if(guessValue && guessValue>0 && guessValue<=100){
      setallGuessValues( [...allGuessValues, guessValue])
      setGuess(guessValue)
        ref.current.value =""
        if(guessValue === actualValue){
          console.log("correct guess")
          setActualValue(null)
          setallGuessValues([])
        }
    }
  }

  const startGame =() =>{
    const actualVal = Math.ceil(Math.random()*100)
    console.log(actualVal)
    setActualValue(actualVal)
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
