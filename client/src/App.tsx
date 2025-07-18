import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { MainPage } from "./pages/main";
import { SignIn } from "./pages/sign-in";
import { Room } from "./pages/room";
import { StreamCall } from "@stream-io/video-react-sdk";
import { useUser } from "./user-context";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const { call } = useUser();
  return (
    <div className="min-h-screen font-space-grotesk bg-dark text-white antialiased">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route
            path="/room"
            element={
              call ? (
                <StreamCall call={call}>
                  <Room />
                </StreamCall>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Router>
      <Analytics />
    </div>
  );
}

export default App;
