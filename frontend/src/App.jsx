import './App.css';
import { Route, Routes} from 'react-router-dom';
import Header from "./components/common/Header"; 
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import ProductsAndServices from "./pages/ProductsAndServices";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {

  return (
    <>
      <Header />
      <Home />

      <Routes>
        <Route  path="/contact" element={<Contact />}/>
        <Route  path="/aboutUs" element={<AboutUs />}/>
        <Route  path="/products&services" element={<ProductsAndServices />}/>
        <Route  path="/login" element={<Login />}/>
        <Route  path="/register" element={<Register />}/>
      </Routes>

      <Footer />
    </>
  )
}

export default App
