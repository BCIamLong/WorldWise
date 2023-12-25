import { BrowserRouter } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/authContext";
import AppRoute from "./routes/AppRoute";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CitiesProvider>
          <AppRoute />
        </CitiesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
