import { BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GlobalContextProvider } from './contexts/globalContext.jsx'
import { AuthContexProvider } from './contexts/AuthContex.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <GlobalContextProvider>
    <AuthContexProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AuthContexProvider>
  </GlobalContextProvider>
)
