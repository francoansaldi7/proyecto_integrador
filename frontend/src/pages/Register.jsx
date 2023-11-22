import {useContext} from 'react'
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../contexts/AuthContext';
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Register() {
    
    //Contexto Global de Auth
    const {saveUser} =  useContext(AuthContext);

    const validationSchema = Yup.object().shape({
            name: Yup.string()
                .min(4, 'Nombre demasiado corto')
                .matches(/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/, 'Nombre inválido')
                .max(30, 'Nombre demasiado largo')
                .required('Este campo es Obligatorio'),
            username: Yup.string()
                .min(4, 'Nombre de Usuario demasiado corto')
                .matches(/^[a-zA-Z1-9]+$/, 'Nombre de Usuario inválido')
                .max(30, 'Nombre de Usuario demasiado largo')
                .required('Este campo es Obligatorio'),
            email: Yup.string()
                .email('Formato del email inválido')
                .required('Este campo es Obligatorio'),
            password: Yup.string()
                .required("Este campo es Obligatorio")
                .min(6, "La contraseña tiene que ser mayor a 6 caracteres"),
            confirmPassword: Yup.string()
                .min(6, "La contraseña tiene que ser mayor a 6 caracteres")
                .required('Este campo es Obligatorio')
                .oneOf([Yup.ref("password")], "Ambas contraseñas deben de ser iguales"),
    })
    
        const onSubmitRegistre = (values) => {
            try {
                saveUser(values.name, values.username, values.email, values.password);
                toast.success("Usuario registrado exitosamente.");
            } catch (error) {
                console.error(error);
                toast.error("Se produjo un error al registrar el usuario.");
            }
        
    }

    return (
        <main className="pt-[200px] flex flex-col justify-center items-center min-h-screen bg-gray-900 p-20" >
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
            initialValues={{name: "", username: "", email: "", password: "", confirmPassword: ""}}
            onSubmit={(values, {resetForm}               
            ) => {
                onSubmitRegistre(values);
                resetForm({values:''})
            }}>          
            {({
                values,
                errors,
                touched,
                setFieldTouched,
                handleChange,
                handleSubmit,
                isValid,                 
                
            }) => (
            
            <div className='xl:gap-2 flex flex-col rounded-md p-2 bg-gray-800 p-5 max-w-[800px] w-full'>
            <h2 className="text-white text-2xl text-center">Crear cuenta</h2>
            <form className="flex flex-col justify-center gap-1 text-primary" noValidate onSubmit={handleSubmit}>
                
                <label className="text-white" htmlFor="name">Nombre</label>
                
                <input className="rounded-md placeholder:text-slate-400 p-2 outline-none" type="text"  id="name" placeholder="Ingrese su nombre"
                name="name"
                required
                onChange={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
                value={values.name}
                />
                
                <p className="text-red-500">{errors.name && touched.name && errors.name}</p>

                <label className="text-white" htmlFor="username">Username</label>
                
                <input className="rounded-md placeholder:text-slate-400 outline-none p-2" type="text"  id="username" placeholder="Ingrese su Nombre de usuario" 
                name="username"
                required
                onChange={handleChange('username')}
                onBlur={() => setFieldTouched('username')}
                value={values.username}
                />

                <p className="text-red-500">{errors.username && touched.username && errors.username}</p>
                
                <label className="text-white" htmlFor="email">Correo electrónico</label>
                
                <input className="rounded-md placeholder:text-slate-400 outline-none p-2" type="email" placeholder="Ingrese su correo electrónico" id="email" 
                name="email" 
                required
                onChange={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                value={values.email}
                />

                <p className="text-red-500">{errors.email && touched.email && errors.email}</p>

                <label className="text-white" htmlFor="password">Contraseña</label>
                
                <input className="rounded-md placeholder:text-slate-400 outline-none p-2" type="password" placeholder="Ingrese su contraseña" id="password" 
                name="password" 
                required
                onChange={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                value={values.password}
                />

                <p className="text-red-500">{errors.password && touched.password && errors.password}</p>

                <label className="text-white" htmlFor="confirmPassword">Confirmar Contraseña</label>
                <input className="rounded-md placeholder:text-slate-400 outline-none placeholder:ml-2 p-2" type="password" placeholder="Repita su contraseña" id="confirmPassword" name="confirmPassword" required
                onChange={handleChange('confirmPassword')}
                onBlur={() => setFieldTouched('confirmPassword')}
                value={values.confirmPassword}
                />

                <p className="text-red-500">{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</p>

                <button onSubmit={()=>onSubmitRegistre()} className="mt-3 text-white  bg-primary self-center p-5 rounded-md hover:cursor-pointer" type="submit" disabled={!isValid}>Registrarse</button>
            </form>
            <p className="mt-3 ml-16 text-white">¿Ya tienes una cuenta? <Link to="/Login" className='underline'>Iniciar sesión</Link></p>
            </div> 
            )}
            </Formik>
            <br /><br />

            <hr className='mt-[300px]'/>
        </main>
    )
}

export default Register