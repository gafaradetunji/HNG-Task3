import * as yup from 'yup'


export const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid Email')
              .required('Email is required'),
    password: yup.string().required('Password is required')
                 .min(8,'must be at least 8 characters'),
})
