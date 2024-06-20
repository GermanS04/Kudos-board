import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BoardPage from "./pages/BoardPage";


function App() {

  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/board/:id" Component={BoardPage}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
