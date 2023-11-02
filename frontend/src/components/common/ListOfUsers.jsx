import React, {useState} from 'react';

const ListOfUsers = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Lucas Rivero', email: 'lucasr@mail.com', role: 'user' },
        { id: 2, name: 'Juan Polero', email: 'juanp@mail.com', role: 'admin' },
        { id: 3, name: 'Lorena Rivas', email: 'lorenar@mail.com', role: 'user' },
        { id: 4, name: 'Mauro Valerio', email: 'maurov@mail.com', role: 'user' },
        { id: 5, name: 'Fausto Castro', email: 'faustoc@mail.com', role: 'user' },
      ]);
    
      // Función para cambiar el rol de un usuario
      const handleRoleChange = (userId, newRole) => {
        // Actualiza el estado con el nuevo rol
        setUsers(prevUsers =>
          prevUsers.map(user => (user.id === userId ? { ...user, role: newRole } : user))
        );
      }

  return (
    <div className="overflow-hidden max-w-[95vw]">
        <h1 className="text-slate-50 text-3xl font-semibold mb-4">Dashboard de Usuarios</h1>
        <table className="min-w-full border bg-slate-800 text-slate-50">
            <thead>
              <tr>
                <th className="border border-slate-700 px-4 py-2">ID</th>
                <th className="border border-slate-700 px-4 py-2">Nombre</th>
                <th className="border border-slate-700 px-4 py-2">Correo Electrónico</th>
                <th className="border border-slate-700 px-4 py-2">Rol</th>
                <th className="border border-slate-700 px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td className="border border-slate-700 px-4 py-2">{user.id}</td>
                  <td className="border border-slate-700 px-4 py-2">{user.name}</td>
                  <td className="border border-slate-700 px-4 py-2">{user.email}</td>
                  <td className="border border-slate-700 px-4 py-2">{user.role}</td>
                  <td className="border border-slate-700 px-4 py-2">
                    <button
                      onClick={() =>
                        handleRoleChange(user.id, user.role === 'admin' ? 'user' : 'admin')
                      }
                      className="bg-indigo-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Cambiar Rol
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
  );
};

export default ListOfUsers;
