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
import CardDetails from './pages/CardDetails';
import Dashboard from './pages/Dashboard';
import ConfirmRegistration from './pages/ConfirmRegistration';
import { library } from '@fortawesome/fontawesome-svg-core'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fab, fas, far)


function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/details/*" element={<CardDetails />}/>
        </Route>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/aboutUs/" element={<AboutUs />}/>
        <Route path="/products&services" element={<ProductsAndServices />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path='/confirm' element={<ConfirmRegistration />} />   
      </Routes>

      <Footer />
    </>
  )
}

export default App
