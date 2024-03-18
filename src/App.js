import './App.css';
//import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Homepage from './pages/Homepage';
import Map from './components/map';
import Info from "./pages/info";

function App() { //every appplication runs directly from app function
  //components have to be self clsed -> />
  //switch tells routes we only wanna render one route at each time
  // / says this is the page as this is homepage
  //putting navbar above switch keeps on every page
  
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route exact path='/Info' element={<Info />} />
          <Route exact path='/Map' element={<Map />} />
        </Routes>
    </Router>
    </div>
  )
}

export default App;