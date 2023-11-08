import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({redirectPage = "/login",  authority = 'USER'}) => {
  if(localStorage.getItem('registrationToken') === null){
    console.log("no hay token");
    return <Navigate to={redirectPage} replace/>
  }
  let decodeToken;
  try {
    decodeToken = jwtDecode(localStorage.getItem('registrationToken'));
    if(decodeToken.rol != authority && decodeToken.rol != 'ADMIN'){
      return <Navigate to={redirectPage} replace />
    }
    return <Outlet />
  } catch (error) {
    return <Navigate to={redirectPage} replace />
  }
}

export default ProtectedRoute