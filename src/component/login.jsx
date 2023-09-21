import { useState } from 'react'
import { Formik, ErrorMessage } from 'formik'
import { loginSchema } from '../validation/validate'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebaseconfig'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState('')
    const initialValues = {
        email: '',
        password: '',
    }

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;
            localStorage.setItem('user', JSON.stringify(user.accessToken))
            setLoading(false)
            navigate('/')
        } catch (error) {
            setError(error.code)
            setLoading(false)
        }
    }
    
    const handlePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }


  return (
    <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
            <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            </div>
            <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={handleSubmit}>
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                                <ErrorMessage name="email" component="span" className='text-[#df0000] text-[.85rem]'/>
                            </label>
                            <input type="email"
                                id='email'
                                name='email'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}  
                              placeholder="email" className={`input ${touched.email && errors.email ? 'border-red-500' : ''}`} />
                            </div>
                            <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                                <ErrorMessage name="password" component="span" className='text-[#df0000] text-[.85rem]'/>
                            </label>
                            <input type={passwordVisible ? 'text' : 'password'}
                                id='password'
                                name='password'
                                value={values.password}
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                              placeholder="password" className={`input ${touched.password && errors.password ? 'border border-red-500' : ''}`} />
                              <span className="material-symbols-outlined cursor-pointer absolute right-5 top-[3rem]" onClick={handlePasswordVisibility}>
                                {passwordVisible? 'visibility' : "visibility_off" }
                              </span>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                            </div>
                            <div className="form-control mt-6">
                            { error && <span className='text-[#df0000] text-[.85rem]'>{error}</span>}
                            <button className="btn btn-primary" disabled={loading}>{ loading ? <span className="loading loading-spinner md:loading-md loading-sm lg:loading-lg"></span> : 'Login' }</button>
                            </div>
                        </div>
                    </div>
                </form>
                )}
            </Formik>
        </div>
    </div>
  )
}

export default Login
