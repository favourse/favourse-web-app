import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreateEventPage, HomePage, DiscoverPage } from "./page";
import MyTicketNFT from "./page/MyTicketNFT";
import MintNFTTickets from "./component/ticket/MintNFTTicket";
import DeployCanisterForm from "./page/DeployCanisterForm";
import { EventDetailPage } from "./page/EventDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/:canisterId" element={<EventDetailPage />} />
        {/* <Route path="/detail" element={<EventDetailPage />} /> */}
        <Route path="/my-ticket" element={<MyTicketNFT />} />
        <Route path="/mint" element={<MintNFTTickets />} />
        <Route path="/deploy" element={<DeployCanisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;
