// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';

// import Login from './pages/Login';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import PasswordReset from './pages/PasswordReset';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route exact path='/' element={<Login/>} />
        <Route  path='/sign-up' element={<Signup />} />
        <Route  path='/home' element={<Home/> } />
        <Route  path='/forgot' element={<ForgotPassword/> } />
        <Route  path='/reset-password/:id/:token' element={<PasswordReset/> } />
      </Routes>
      </div>
  );
}

export default App;
