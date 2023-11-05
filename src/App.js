import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Vehicle from './Vehicle';

function App() {

  const [username, setUsername] = useState(null);
  const [counter, setCounter] = useState(0);

  const handleLogin = () =>{
    //user login process
    setUsername("Gamitha");
  }

  const increaseCounter = () => {
    setCounter(counter + 1);
  }

  const decreaseCounter = () => {
    setCounter(counter - 1);
  }

  return (
    <div className="App">

      <div>
        <h1>Hi {username}</h1>
        <button onClick={handleLogin}>Login</button>
      </div>

      <div>
        <h1>Counter: {counter}</h1>
        <button onClick={increaseCounter}>Increase</button>
        <button onClick={decreaseCounter}>Decrease</button>
      </div>


      <SampleComponent title="Passing title from Parent" />
      <Vehicle model="Toyota Corolla" description="A family car" />
      <Vehicle model="Landcruiser" description="A SUV" />
      <Vehicle model="Nissan Sunny" />
    </div>
  );
}

const SampleComponent = (props) => {
  return (
    <h1>{props.title}</h1>
  )
}
export default App;
