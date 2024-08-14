import LandingPage  from "./pages/landing";
import { Route, Routes} from "react-router-dom"
import RoomPage from "./pages/room";

function App() {
  return (
    <Routes>
      <Route path= "/" element = { <LandingPage/>} /> 
      <Route path= "/room" element = { <RoomPage/>} />
    </Routes>
  );
}

export default App;
