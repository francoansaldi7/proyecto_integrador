export class User {
  /**
   * Represents a user in the system.
   * @param {string} name - The name of the user.
   * @param {string} username - The username of the user.
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
   * @param {number} role - The role of the user, represented by an id, 1=USER, 2=ADMIN
   */
  constructor(name, username, email, password, role) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = {
      id: role
    };
  }
  /**{
  "name": "D",
  "username": "De",
  "email": "example@gamil.com",
  "password": "12345678",
  "role": {
    "id": 2
  }
} */
}