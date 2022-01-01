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
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import {getUsers} from "../firebase/firebase";
import {UserInDb} from "../types";

const EmployeeTable:React.FC = () => {

    React.useEffect(()=> {
        const foo = async () => {
            const data = await getUsers()
            setData([...data as Array<UserInDb>])
        }
        foo()

    }, [])

    const [data, setData] = React.useState<UserInDb[] | undefined>(undefined)
    const [open, setOpen] = React.useState(false)
    const [hover, setHover] = React.useState([false, false, false])

    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

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



    const onHover = (index:number) => {
        const arr = hover
        arr[index] = !arr[index]
        setHover([...arr])
    }

    return (
        <Box sx={{width: '100%', paddingTop: '70px'}}>
            <List>
                {data && data.map((employee, index)=>{
                    return (
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            }
                            onMouseEnter = { () => {onHover(index)} }
                            onMouseLeave = { () => {onHover(index)}}
                            sx = {{backgroundColor: hover[index] ? 'rgba(25, 118, 210, 0.04)' : '#fff'}}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    H
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={employee.name}
                                secondary={employee.id}
                            />
                        </ListItem>
                    )
                })}
            </List>
            <Fab sx={fab.sx} aria-label={fab.label} color={fab.color} onClick={handleClickOpen}>
                {fab.icon}
            </Fab>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Новый работник</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Введите имя и Telegram ID Работника
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        label='Имя'
                        type='text'
                        fullWidth
                        variant='standard'
                        required
                    />
                    <TextField
                        margin='dense'
                        id='telegram'
                        label='Telegram ID'
                        type='text'
                        fullWidth
                        variant='standard'
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button onClick={handleClose}>Добавить</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default EmployeeTable