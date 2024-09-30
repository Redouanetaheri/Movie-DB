import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import HomePage from './Pages/Homepages'
import Genrespages from './Pages/genrespage'
import NavBar from './Components.jsx/NavBar';


function App() {

  return <>
  <BrowserRouter>
  <NavBar></NavBar>
  <Routes>
    <Route path='/' element={<HomePage></HomePage>} ></Route>
    <Route path='/genres' element={<Genrespages></Genrespages>} ></Route>
  </Routes>
  </BrowserRouter>
</>
}

export default App
