/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Login() {
  //Contexto Global de Auth
  const { authenticateUser } = useContext(AuthContext);
  const location = useLocation();
  const isFromReservation = new URLSearchParams(location.search).get("fromReservation");

  //Desde el login
  const  { state }  = useLocation();
  console.log(state);
  const prevPath = state && state?.previousPath;
  let isInBooking = prevPath ? true : false;
  console.log(prevPath);

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(4, "Nombre de Usuario demasiado corto")
      .matches(/^[a-zA-Z1-9]+$/, "Nombre de Usuario inválido")
      .max(30, "Nombre de Usuario demasiado largo")
      .required("Este campo es Obligatorio"),
    password: Yup.string()
      .required("Requerido")
      .min(6, "La contraseña tiene que ser mayor a 6 caracteres"),
  });

  const onSubmitLogin = async (values) => {
    try {
      const loginInfo = await authenticateUser(values.username, values.password);
      localStorage.setItem("registrationToken", loginInfo);
      toast.success("Sesión iniciada exitosamente");
      window.location.href = '/'
    } catch (error) {
      console.error(error);
      toast.error("Se produjo un error al iniciar la sesión");
    }
  };

  return (
    <main className="pt-[200px] flex flex-col min-h-screen bg-gray-900 p-5 md:p-10 md:pt-[200px] xl:p-20 xl:pt-[200px] justify-center items-center">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Formik
        validationSchema={validationSchema}
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, { resetForm }) => {
          onSubmitLogin(values);
          resetForm({
            values: {
              username: "",
              password: "",
            },
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldTouched,
          handleSubmit,
          isValid,
        }) => (
          <div className="rounded-md p-2 bg-gray-800 p-5 max-w-[800px] w-full">
            {isFromReservation && (
              <div className="bg-yellow-200 text-yellow-800 p-4 mb-4">
                <p>
                  El inicio de sesión es obligatorio para realizar la reserva.
                  Si aún no estás registrado, por favor, <a href="/Register">Registrate aqui</a>.
                </p>
            </div>)}
            <h2 className="text-white text-center font-bold text-2xl">
              Iniciar sesión
            </h2>
            <form
              className="flex flex-col justify-center gap-1 text-primary"
              noValidate
              onSubmit={handleSubmit}
            >
              <label className="text-white" htmlFor="username">
                Nombre de Usuario
              </label>

              <input
                className="rounded-md placeholder:text-slate-400 p-2"
                type="username"
                placeholder="Ingrese su nombre de usuario"
                id="username"
                name="username"
                required
                onChange={handleChange}
                onBlur={() => setFieldTouched("username")}
                value={values.username}
              />
              <p className="text-red-500">
                {errors.username && touched.username && errors.username}
              </p>

              <label className="text-white" htmlFor="password">
                Contraseña
              </label>
              <input
                className="rounded-md placeholder:text-slate-400 p-2"
                type="password"
                placeholder="********"
                id="password"
                name="password"
                required
                onChange={handleChange}
                onBlur={() => setFieldTouched("password")}
                value={values.password}
              />
              <p className="text-red-500">
                {errors.password && touched.password && errors.password}
              </p>

              <button
                onSubmit={() => onSubmitLogin()}
                type="submit"
                className="mt-3 text-white  bg-primary self-center p-3 rounded-md hover:cursor-pointer"
                disabled={!isValid}
              >
                Ingresar
              </button>
            </form>
            <p className="text-center text-white 2xl:mt-4 lg:mt-4 md:mt-4 sm:mt-4 min-[375px]:mt-4 min-[414px]:mt-4 min-[390px]:mt-4 min-[430px]:mt-4 min-[360px]:mt-4 min-[280px]:mt-4">
              ¿Aún no tienes cuenta?<Link to="/Register"><span className="underline ml-1">Registrate</span></Link>
            </p>
          </div>
        )}
      </Formik>
    </main>
  );
}

export default Login;
