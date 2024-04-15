import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CityTable from "./components/CityTable";
import Weather from "./components/Weather";
import Favorite from "./components/Favorite";
// import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CityTable />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/weather/:city?" element={<Weather />} />
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
