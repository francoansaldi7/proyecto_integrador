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
        <div>hola</div>
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
          <div className="">
            <h2 className="">Iniciar sesión</h2>
            <form className="" noValidate onSubmit={handleSubmit}>
              <label className="" htmlFor="username">
                Correo electrónico
              </label>

              <input
                className=""
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

              <label className="" htmlFor="password">
                Contraseña
              </label>
              <input
                className=""
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
                className=""
                disabled={!isValid}
              >
                Ingresar
              </button>
            </form>
            <p className="">
              ¿Aún no tienes cuenta?<Link to="/Register"> Registrate</Link>
            </p>
          </div>
        )}
      </Formik>
    </main>
  );
}

export default Login;
