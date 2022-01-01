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
import {getData} from "../firebase/firebase"
import {User} from "../types"
import Box from '@mui/material/Box'



const SettingTable:React.FC = () => {

    React.useEffect(() => {
        const call =  () => {
            const data =  getData.then((data)=> {
                const users = data as Array<User>
                setTasks( [...users])
            }).catch((error)=>{
               setTasks( [{name: 'Здесь пока никого нет'}])
            })

        }
        call()
    }, [])
    const [tasks, setTasks] = React.useState([{} as User])
    const [open, setOpen] = React.useState([false, false, false])

    const handleClick = (index:number) => {
        const arr = open
        open[index] = !open[index]
        setOpen([...arr])
    };

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

            {tasks[0].name !== 'Здесь пока никого нет' ? tasks.map((employee, index) => {
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
                                   <ListItem sx={{ pl: 4 }} key = {index}>
                                       <ListItemIcon>
                                           <StarBorder />
                                       </ListItemIcon>
                                       <ListItemText primary={task} />
                                       <Button color='error'>Удалить</Button>
                                   </ListItem>
                               )
                           })}
                               <ListItem button sx={{ pl: 4 }} key = 'add'>
                                   <ListItemIcon>
                                       <AddIcon />
                                   </ListItemIcon>
                                   <ListItemText primary='Добавить задачу' />
                               </ListItem>
                           </List>
                       </Collapse>

                   </div>
               )
            }) : (<Box component="span" sx={{ p: 2 }}>
                    <Typography variant='h5'>{tasks[0].name}</Typography>
                </Box>)}
        </List>
    )
}

export default SettingTable