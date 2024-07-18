import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import GetData from './pages/GetData';
import CreateData from './pages/CreateData';
import UpdateData from './pages/UpdateData';
import Login from './pages/Login';
import Test from './pages/Test';
import { useEffect } from 'react';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/getData' element={<GetData/>}/>
        <Route path='/create' element={<CreateData/>}/>
        <Route path='/edit/:id' element={<UpdateData/>}/>
        <Route path='/test' element={<Test/>}/>
      </Routes>
    </Router>
  );
}

export default App;
