import { createContext} from "react";
import PropTypes from "prop-types";
import { User } from "../components/User";

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
const saveUser = (name, username, email, password, role = 1) => {
  const user = new User(name, username, email, password, role);
  try {
    fetch('http://localhost:8080/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
  } catch (error) {
    throw new Error(error);
  }
}

const authenticateUser = (username, password) => {
  try {
    const token = fetch('http://localhost:8080/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username, password: password})
    });
    return token;
  } catch (error) {
    throw new Error(error);
  }
}

const data = {
  saveUser,
  authenticateUser
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
