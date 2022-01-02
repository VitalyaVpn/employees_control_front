import * as React from 'react'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'
import {Button, Typography} from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {addTask, deleteEmployee, deleteTask, fetchTasks, login} from "../store/reducers/ActionCreators";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import {useFormik} from "formik";
import * as Yup from "yup";



const SettingTable:React.FC = () => {

    const formik = useFormik({
        initialValues: {
            task: '',
        },
        validationSchema: Yup.object({
            task: Yup
                .string()
                .max(255)
                .required(
                    'Поле не должно быть пустым'),

        }),
        onSubmit: (values) => {
            //dispatch(addTask(values))
            // console.log(values)
            // handleClose()
        }
    });

    const dispatch = useAppDispatch()
    const {tasks} = useAppSelector(state => state.tasksReducer)
    React.useEffect(() => {
        dispatch(fetchTasks())
    }, [])

    const [open, setOpen] = React.useState([false, false, false])

    const handleClick = (index:number) => {
        const arr = open
        open[index] = !open[index]
        setOpen([...arr])
    }

    const [openDialog, setOpenDialog] = React.useState(false)
    const handleClose = () => {
        setOpenDialog(false)
    }
    const handleOpen = () => {
        setOpenDialog(true)
    }



    const [deleteOpen, setDeleteOpen] = React.useState<boolean[]>([false])
    const handleDeleteClose = (index: number) => {
        deleteOpen[index] = false
        setDeleteOpen([...deleteOpen])
    }

    const handleDeleteOpen = (index: number) => {
        deleteOpen[index] = true
        setDeleteOpen([...deleteOpen])
    }

    return (
        <List
            sx={{ width: '100%', bgcolor: 'background.paper', marginTop: '70px', pl: 2, pr: 2}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Список работников
                </ListSubheader>
            }
        >

            {tasks[0] ? tasks.map((employee, index) => {
               return (
                   <div key = {employee.name}>
                       <ListItemButton onClick={() => {handleClick(index)}} key = {employee.name}>
                           <ListItemIcon>
                               <InboxIcon />
                           </ListItemIcon>
                           <ListItemText primary={employee.name} />
                           {open[index] ? <ExpandLess /> : <ExpandMore />}
                       </ListItemButton>
                       <Collapse in={open[index]} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                           {employee.tasks?.map((task, index) => {
                               return (
                                   <ListItem sx={{ pl: 4 }} key = {index} button>
                                       <ListItemIcon>
                                           <StarBorder />
                                       </ListItemIcon>
                                       <ListItemText primary={task} />
                                       <Button color='error' onClick={()=>{handleDeleteOpen(index)}}>Удалить</Button>

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
                                                   {`Это действие удалит задачу ${task}.`}
                                               </DialogContentText>
                                           </DialogContent>
                                           <DialogActions>
                                               <Button onClick={() => {handleDeleteClose(index)}}>Отмена</Button>
                                               <Button onClick={()=> {
                                                   dispatch(deleteTask({task, id: employee.id}))
                                                   handleDeleteClose(index)
                                               }}>
                                                   Удалить
                                               </Button>
                                           </DialogActions>
                                       </Dialog>

                                   </ListItem>
                               )
                           })}
                               <ListItem button sx={{ pl: 4 }} key = 'add' onClick={handleOpen}>
                                   <ListItemIcon>
                                       <AddIcon />
                                   </ListItemIcon>
                                   <ListItemText primary='Добавить задачу' />
                               </ListItem>
                               <Dialog
                                   open={openDialog}
                                   onClose={handleClose}
                                   aria-labelledby='alert-dialog-title'
                                   aria-describedby='alert-dialog-description'

                               >
                                   <form onSubmit={(event) => {
                                       event.preventDefault()
                                       dispatch(addTask({task: formik.values.task, id: employee.id}))
                                       handleClose()
                                   }}>
                                       <DialogTitle id='alert-dialog-title'>
                                           Новая задача
                                       </DialogTitle>
                                       <DialogContent>
                                           <DialogContentText id='alert-dialog-description'>
                                               {`Введите название задачи для ${employee.name}`}
                                           </DialogContentText>

                                           <TextField
                                               error={Boolean(formik.touched.task && formik.errors.task)}
                                               helperText={formik.touched.task && formik.errors.task}
                                               autoFocus
                                               margin='dense'
                                               id='task'
                                               label='Задача'
                                               type='text'
                                               fullWidth
                                               variant='standard'
                                               required
                                               onChange={formik.handleChange}
                                               value={formik.values.task}
                                               onBlur={formik.handleBlur}
                                           />
                                       </DialogContent>

                                       <DialogActions>
                                           <Button onClick={handleClose}>Отмена</Button>
                                           <Button
                                               type = 'submit'
                                           >
                                               Добавить
                                           </Button>
                                       </DialogActions>
                                   </form>
                               </Dialog>
                           </List>
                       </Collapse>

                   </div>
               )
            }) : (<Box component="span" sx={{ p: 2 }}>
                    <Typography variant='h5'>{'Здесь пока ничего нет '}</Typography>
                </Box>)}
        </List>
    )
}

export default SettingTable