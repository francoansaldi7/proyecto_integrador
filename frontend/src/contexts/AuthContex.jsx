import { createContext} from "react";
import PropTypes from "prop-types";
import { User } from "../components/User";
import { jwtDecode } from "jwt-decode";

const AuthContex = createContext()

const AuthContexProvider = ({children}) => {
/**
 * Saves user data to a server using a POST request.
 * 
 * @param {string} name - The name of the user.
 * @param {string} username - The username of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @param {number} [role=1] - The role of the user. Defaults to 1. 1 = USER, 2 = ADMIN
 * @throws {Error} If an error occurs during the fetch request.
 */
const saveUser = async (name, username, email, password, role = 1) => {
  const user = new User(name, username, email, password, role);
  try {
    const userSaved = await fetch('http://localhost:8080/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if(!userSaved.ok) throw new Error(userSaved.statusText);
    localStorage.setItem('userName', user.name);
    return userSaved.json();
  } catch (error) {
    throw new Error(error);
  }
}

const authenticateUser = async (username, password) => {
  try {
    const token = await fetch('http://localhost:8080/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username, password: password})
    });
    if(!token.ok) throw new Error("No se pudo iniciar sesión");
 
    return token.text();
  } catch (error) {
    throw new Error(error);
  }
}

const isLoggedIn = () => {
  try {
    const data = jwtDecode(localStorage.getItem('registrationToken'));
    
    if(data.rol === 'ADMIN'){
      return {
        isLoggedIn: true,
        isUser: false,
        isAdmin: true,
        name: data.name
      }
    } else if(data.rol === 'USER'){
      return {
        isLoggedIn: true,
        isUser: true,
        isAdmin: false,
        name: data.name
      }
    }
    return {
      isLoggedIn: false,
      isUser: false,
      isAdmin: false,
      name: ''
    };
  } catch (error) {
    return {
      isLoggedIn: false,
      isUser: false,
      isAdmin: false,
      name: ''
    };
  }
}

const data = {
  saveUser,
  authenticateUser,
  isLoggedIn
}

return (
  <AuthContex.Provider value={data}>
        {children}
      </AuthContex.Provider>
  )
}
AuthContexProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export  {AuthContexProvider, AuthContex}
