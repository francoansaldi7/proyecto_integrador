import './App.css';
import { Route, Routes} from 'react-router-dom';
import Header from "./components/Header"; 
import Contact from "./routes/Contact";
import AboutUs from "./routes/AboutUs";
import ProductsAndServices from "./routes/ProductsAndServices";
import Footer from "./components/Footer";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";


function App() {

  return (
    <>
      <Header />
      <Home />

      <Routes>
        {/* <Route  path="/" element={<Header />}/> */}
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
