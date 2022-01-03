import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Fab from '@mui/material/Fab'
import { SxProps } from '@mui/system'
import AddIcon from '@mui/icons-material/Add'
import TextField, {TextFieldProps} from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import {useAppDispatch, useAppSelector} from "../hooks/redux"
import {addEmployee, deleteEmployee, fetchEmployee} from "../store/reducers/ActionCreators"
import {useFormik} from "formik"
import * as Yup from "yup"
import AdapterDateFns from '@mui/lab/AdapterDateFns'

import { DatePicker, LocalizationProvider  } from '@mui/lab'

function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substring(`00${value.toString(16)}`.length - 2);
    }

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: name[0],
    };
}

const EmployeeTable:React.FC = () => {

    const formik = useFormik({
        initialValues: {
            id: '',
            name: ''
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .max(255)
                .required(
                    'Поле не должно быть пустым'),
            id: Yup
                .string()
                .max(255)
                .required(
                    'Поле не должно быть пустым'),

        }),
        onSubmit: (values) => {
            dispatch(addEmployee(values))
            handleClose()
        }
    })

    const dispatch = useAppDispatch()
    const {employee} = useAppSelector(state => state.employeeReducer)
    React.useEffect(()=> {
        dispatch(fetchEmployee())
    }, [])

    //const [data, setData] = React.useState<IUser[] | undefined>(undefined)
    const [open, setOpen] = React.useState(false)
    const [deleteOpen, setDeleteOpen] = React.useState<boolean[]>([false])
    const [hover, setHover] = React.useState([false])


    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

    const handleDeleteClose = (index: number) => {
        deleteOpen[index] = false
        setDeleteOpen([...deleteOpen])
    }

    const handleDeleteOpen = (index: number) => {
        deleteOpen[index] = true
        setDeleteOpen([...deleteOpen])
    }


    const fabStyle = {
        position: 'absolute',
        bottom: 16,
        right: 16,
    }

    const fab = {
            color: 'primary' as 'primary',
            sx: fabStyle as SxProps,
            icon: <AddIcon />,
            label: 'Add',
        }



    const onHover = (index:number, state: boolean) => {
        hover[index] = state
        setHover([...hover])
    }

    return (
        <Box sx={{width: '100%', paddingTop: '70px'}}>
            <List>
                {employee && employee.map((employee, index)=>{
                    return (
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick = {()=>{handleDeleteOpen(index)}}>
                                    <DeleteIcon />
                                </IconButton>

                            }
                            onMouseEnter = { () => {onHover(index, true)} }
                            onMouseLeave = { () => {onHover(index, false)}}
                            sx = {{backgroundColor: hover[index] ? 'rgba(25, 118, 210, 0.04)' : '#fff'}}
                            key = {index}
                        >
                            <ListItemAvatar>
                                <Avatar{...stringAvatar(employee.name)} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={employee.name}
                                secondary={employee.id}
                            />
                            <Dialog
                                open={deleteOpen[index]}
                                onClose={() => {handleDeleteClose(index)}}
                                aria-labelledby='alert-dialog-title'
                                aria-describedby='alert-dialog-description'
                            >
                                <DialogTitle id='alert-dialog-title'>
                                    {'Вы уверены?'}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id='alert-dialog-description'>
                                        {`Это действие удалит пользователя ${employee.name}.`}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => {handleDeleteClose(index)}}>Отмена</Button>
                                    <Button onClick={()=> {
                                        dispatch(deleteEmployee({name: employee.name, id: employee.id}))
                                        handleDeleteClose(index)
                                    }}>
                                        Удалить
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </ListItem>
                    )
                })}
            </List>
            <Fab sx={fab.sx} aria-label={fab.label} color={fab.color} onClick={handleClickOpen}>
                {fab.icon}
            </Fab>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle>Новый работник</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Введите имя и Telegram ID Работника
                        </DialogContentText>
                        <TextField
                            error={Boolean(formik.touched.name && formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            autoFocus
                            margin='dense'
                            id='name'
                            label='Имя'
                            type='text'
                            fullWidth
                            variant='standard'
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            onBlur={formik.handleBlur}
                            required
                        />
                        <TextField
                            error={Boolean(formik.touched.id && formik.errors.id)}
                            helperText={formik.touched.id && formik.errors.id}
                            margin='dense'
                            id='id'
                            label='Telegram ID'
                            type='text'
                            fullWidth
                            variant='standard'
                            onChange={formik.handleChange}
                            value={formik.values.id}
                            onBlur={formik.handleBlur}
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Отмена</Button>
                        <Button type='submit'>Добавить</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    )
}

export default EmployeeTable