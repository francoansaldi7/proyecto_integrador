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
import ProtectedRoute from './components/utils/ProtectedRoute';
import FavServices from './pages/FavServices';
import ReservationHistory from './pages/ReservationHistory';
library.add(fab, fas, far)
import ReservasPage from './pages/ReservasPage';
import { AuthContextProvider } from './contexts/AuthContext';


function App() {

  return (
    <>
      <Header />
      <AuthContextProvider> 
      <Routes>
        <Route path="/" element={<Home />}>
        <Route path="/details/*" element={<CardDetails />}/>
        </Route>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/aboutUs/" element={<AboutUs />}/>
        <Route path="/products&services" element={<ProductsAndServices />}/>
        <Route path="/favServices" element={<FavServices />}/>
        <Route path="/reservationHistory" element={<ReservationHistory />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        
        <Route path="/reservas" element={<ReservasPage />} />
       
        <Route  element={<ProtectedRoute redirectPage='/login' authority='ADMIN' />}>
        <Route path="/dashboard" element={<Dashboard />}/>
        </Route>
        <Route path='/confirm' element={<ConfirmRegistration />} /> 
      </Routes>
      </AuthContextProvider>
      <Footer />
    </>
  )
}

export default App
