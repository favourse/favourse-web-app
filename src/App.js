import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreateEventPage, HomePage, DiscoverPage } from "./page";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
      </Routes>
    </Router>
  );
}

export default App;
