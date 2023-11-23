import { BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GlobalContextProvider } from './contexts/globalContext.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <GlobalContextProvider>
    <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AuthContextProvider>
  </GlobalContextProvider>
)
