import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import HomePage from './Pages/Homepages'
import Genrespages from './Pages/genrespage'
import NavBar from './Components.jsx/NavBar';
import MovieDetailsPage from './Pages/MovieDetailsPage';
import GenresDetailsPage from './Pages/GenresDetailsPage';
import PeoplePage from './Pages/PeoplePage';
import PeopleDetails from './Pages/PeopleDetails';


function App() {

  return <>
  <BrowserRouter>
  <NavBar></NavBar>
  <Routes>
    <Route path='/' element={<HomePage></HomePage>} ></Route>
    <Route path='/genres' element={<Genrespages></Genrespages>} ></Route>
    <Route path='/movie/:id' element={<MovieDetailsPage></MovieDetailsPage>} ></Route>
    <Route path='/genre/:id' element={<GenresDetailsPage></GenresDetailsPage>} ></Route>
    <Route path='/PeoplePage' element={<PeoplePage></PeoplePage>} ></Route>
    <Route path='/PeoplePage/:id' element={<PeopleDetails></PeopleDetails>} ></Route>
  </Routes>
  </BrowserRouter>
</>
}

export default App
