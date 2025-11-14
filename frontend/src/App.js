import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages.js/LoginPage";
import UserList from "./components/UserList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/usuarios" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  );
}
