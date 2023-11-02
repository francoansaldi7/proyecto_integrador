/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContex } from '../contexts/AuthContex';
import Swal from "sweetalert2";

function Login() {
  //Contexto Global de Auth
  const { loginFunction, isLogged } = useContext(AuthContex);
  const navigator = useNavigate();

  //Desde el login
  const { state } = useLocation();
  const prevPath = state && state?.previousPath;
  let isInBooking = prevPath ? true : false;
  console.log(prevPath);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Formato del email inválido")
      .required("Requerido"),
    password: Yup.string()
      .required("Requerido")
      .min(6, "La contraseña tiene que ser mayor a 6 caracteres"),
  });

  const onSubmitLogin = (values) => {
    loginFunction(values.email, values.password, isInBooking, prevPath);
  };

  const MySwal = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Necesitas estar logueado",
    });
  };

  useEffect(() => {
    prevPath ? MySwal() : "";
  }, []);

  return (
    
    <main>
        <div>hola</div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ email: "", password: "" }}
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
              <label className="" htmlFor="email">
                Correo electrónico
              </label>

              <input
                className=""
                type="email"
                placeholder="Ingrese su email"
                id="email"
                name="email"
                required
                onChange={handleChange}
                onBlur={() => setFieldTouched("email")}
                value={values.email}
              />
              <p className="">
                {errors.email && touched.email && errors.email}
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
