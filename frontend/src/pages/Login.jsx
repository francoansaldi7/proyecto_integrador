/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContex } from '../contexts/AuthContex';
import { useContext } from "react";

function Login() {
  //Contexto Global de Auth
  const { authenticateUser } = useContext(AuthContex);

  //Desde el login
  const { state } = useLocation();
  const prevPath = state && state?.previousPath;
  let isInBooking = prevPath ? true : false;
  console.log(prevPath);

  const validationSchema = Yup.object({
    username: Yup.string()
      .email("Formato del email inválido")
      .required("Requerido"),
    password: Yup.string()
      .required("Requerido")
      .min(6, "La contraseña tiene que ser mayor a 6 caracteres"),
  });

  const onSubmitLogin = (values) => {
    authenticateUser(values.username, values.password);
  };


  return (
    
    <main className="min-h-screen pt-[200px]">
      <Formik
        validationSchema={validationSchema}
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          onSubmitLogin(values);
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
          <div className="xl:gap-2 xl:w-[400px] xl:ml-[40vw] rounded-md p-2 bg-secondary">
            <h2 className="text-white mt-2 ml-[6.5vw] mb-5 text-2xl">Iniciar sesión</h2>
            <form className="flex flex-col justify-center gap-1 text-primary" noValidate onSubmit={handleSubmit}>
              <label className="text-white" htmlFor="username">
                Correo electrónico
              </label>

              <input
                className="rounded-md placeholder:text-slate-400 placeholder:p-2 placeholder:ml-2"
                type="username"
                placeholder="Ingrese su email"
                id="username"
                name="username"
                required
                onChange={handleChange}
                onBlur={() => setFieldTouched("username")}
                value={values.username}
              />
              <p className="">
                {errors.username && touched.username && errors.username}
              </p>

              <label className="text-white" htmlFor="password">
                Contraseña
              </label>
              <input
                className="rounded-md placeholder:text-slate-400 placeholder:p-2 placeholder:ml-2"
                type="password"
                placeholder="********"
                id="password"
                name="password"
                required
                onChange={handleChange}
                onBlur={() => setFieldTouched("password")}
                value={values.password}
              />
              <p className="">
                {errors.password && touched.password && errors.password}
              </p>

              <button
                onSubmit={onSubmitLogin}
                type="submit"
                className="mt-3 text-white underline"
                disabled={!isValid}
              >
                Ingresar
              </button>
            </form>
            <p className="mt-3 ml-20 text-white underline">
              ¿Aún no tienes cuenta?<Link to="/Register"> Registrate</Link>
            </p>
          </div>
        )}
      </Formik>
    </main>
  );
}

export default Login;
