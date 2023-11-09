import { useEffect, useState } from "react";
const ConfirmRegistration = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      // Guarda el token en la sesión del navegador
      localStorage.setItem('registrationToken', token);
      setToken(token);
    }
  }, []);

  return (
    <div className="min-h-screen bg-purple-200 flex justify-center items-center">
      {token ? (
        <div>
          <h1 className="text-8xl text-center font-extrabold text-green-500">Te has registrado correctamente</h1>
        </div>
      ) : (
        <h1 className="text-8xl text-center font-extrabold text-red-900">Error al confirmar el registro</h1>
      )}

    </div>
  )
}

export default ConfirmRegistration