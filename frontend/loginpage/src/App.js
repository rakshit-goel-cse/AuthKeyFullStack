import LoginPage from './components/loginPage/loginPage';
import { useState } from 'react';
import MainPage from './components/mainPage/MainPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
      <div className="backg-black" style={{height:"100vh", width:"100vw",backgroundColor:"black"}}>
      {!loggedIn 
      ? <LoginPage setLoggedIn={setLoggedIn}/>
      : <MainPage />
      }
      
    </div>
  );
}

export default App;
