
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {login} from "../store/reducers/ActionCreators";
import {Navigate} from 'react-router-dom'

const Login = () => {

    const {user} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email(
                    'E-mail должен быть валидным')
                .max(255)
                .required(
                    'Поле не должно быть пустым'),
            password: Yup
                .string()
                .max(255)
                .required(
                    'Поле не должно быть пустымd')
        }),
        onSubmit: (values) => {
           dispatch(login(values))
        }
    })
    if (user.uid) {
        return <Navigate to='/employee'/>
    }
    return (
        <>
            <Box
                component='main'
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%'
                }}
            >
                <Container maxWidth='sm'>
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ my: 3, textAlign: 'left' }}>
                            <Typography
                                color='textPrimary'
                                variant='h4'
                                gutterBottom
                            >
                                Вход
                            </Typography>
                            <Typography
                                color='textSecondary'
                                variant='body2'
                            >
                                Вход с использованием E-mail и пароля
                            </Typography>
                        </Box>
                        <TextField
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            fullWidth
                            helperText={formik.touched.email && formik.errors.email}
                            label='Email'
                            margin='normal'
                            name='email'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type='email'
                            value={formik.values.email}
                            variant='outlined'
                        />
                        <TextField
                            error={Boolean(formik.touched.password && formik.errors.password)}
                            fullWidth
                            helperText={formik.touched.password && formik.errors.password}
                            label='Пароль'
                            margin='normal'
                            name='password'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type='password'
                            value={formik.values.password}
                            variant='outlined'
                        />
                        <Box sx={{ py: 2 }}>
                            <Button
                                color='primary'
                                disabled={formik.isSubmitting}
                                fullWidth
                                size='large'
                                type='submit'
                                variant='contained'
                            >
                                Войти
                            </Button>
                        </Box>
                    </form>
                </Container>
            </Box>
        </>
    )
}

export default Login