import {useContext} from 'react'
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AuthContex } from '../contexts/AuthContex';

function Register() {
    
    //Contexto Global de Auth
    const {saveUser} =  useContext(AuthContex);

    const validationSchema = Yup.object().shape({
            name: Yup.string()
                .min(4, 'Nombre demasiado corto')
                .matches(/^[a-zA-Z]+$/, 'Nombre inválido')
                .max(30, 'Nombre demasiado largo')
                .required('Este campo es Obligatorio'),
            username: Yup.string()
                .min(4, 'Nombre de Usuario demasiado corto')
                .matches(/^[a-zA-Z]+$/, 'Nombre de Usuario inválido')
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

            saveUser(values.name, values.username, values.email, values.password);
        
    }

    return (
        <main className="pt-[200px] flex flex-col min-h-screen bg-primary" >
            <Formik 
            validationSchema={validationSchema}
            initialValues={{name: "", lastName: "", email: "", password: "", confirmPassword: ""}}
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
            
            <div className='xl:gap-2 xl:w-[400px] xl:ml-[40vw] rounded-md p-2 bg-secondary'>
            <h2 className="text-white mt-2 ml-[6.5vw] mb-5 text-2xl">Crear cuenta</h2>
            <form className="flex flex-col justify-center gap-1 text-primary" noValidate onSubmit={handleSubmit}>
                
                <label className="text-white" htmlFor="name">Nombre</label>
                
                <input className="rounded-md placeholder:text-slate-400 placeholder:p-2" type="text"  id="name" placeholder="Ingrese su nombre"
                name="name"
                required
                onChange={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
                value={values.name}
                />
                
                <p className="">{errors.name && touched.name && errors.name}</p>

                <label className="text-white" htmlFor="lastName">Apellido</label>
                
                <input className="rounded-md placeholder:text-slate-400 placeholder:p-2" type="text"  id="lastName" placeholder="Ingrese su apellido" 
                name="lastName"
                required
                onChange={handleChange('lastName')}
                onBlur={() => setFieldTouched('lastName')}
                value={values.lastName}
                />

                <p className="">{errors.lastName && touched.lastName && errors.lastName}</p>
                
                <label className="text-white" htmlFor="email">Correo electrónico</label>
                
                <input className="rounded-md placeholder:text-slate-400 placeholder:p-2" type="email" placeholder="Ingrese su correo electrónico" id="email" 
                name="email" 
                required
                onChange={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                value={values.email}
                />

                <p className="">{errors.email && touched.email && errors.email}</p>

                <label className="text-white" htmlFor="password">Contraseña</label>
                
                <input className="rounded-md placeholder:text-slate-400 placeholder:p-2" type="password" placeholder="Ingrese su contraseña" id="password" 
                name="password" 
                required
                onChange={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                value={values.password}
                />

                <p className="">{errors.password && touched.password && errors.password}</p>

                <label className="text-white" htmlFor="confirmPassword">Confirmar Contraseña</label>
                <input className="rounded-md placeholder:text-slate-400 placeholder:p-2 placeholder:ml-2" type="password" placeholder="Repita su contraseña" id="confirmPassword" name="confirmPassword" required
                onChange={handleChange('confirmPassword')}
                onBlur={() => setFieldTouched('confirmPassword')}
                value={values.confirmPassword}
                />

                <p className="">{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</p>

                <button onSubmit={onSubmitRegistre} className="mt-3 text-white underline" type="submit" disabled={!isValid}>Registrarse</button>
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