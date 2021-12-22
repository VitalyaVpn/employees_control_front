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
import {Button} from "@mui/material"
import AddIcon from '@mui/icons-material/Add'

export default function SettingTable() {
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

            {['Работник 1', 'Работник 2', 'Работник 3'].map((employee, index) => {
               return (
                   <div>
                       <ListItemButton onClick={() => {handleClick(index)}}>
                           <ListItemIcon>
                               <InboxIcon />
                           </ListItemIcon>
                           <ListItemText primary={employee} />
                           {open[index] ? <ExpandLess /> : <ExpandMore />}
                       </ListItemButton>
                       <Collapse in={open[index]} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                           {['Задача 1','Задача 2','Задача 3'].map((task, index) => {
                               return (
                                   <ListItem sx={{ pl: 4 }}>
                                       <ListItemIcon>
                                           <StarBorder />
                                       </ListItemIcon>
                                       <ListItemText primary={task} />
                                       <Button color='error'>Удалить</Button>
                                   </ListItem>
                               )
                           })}
                               <ListItem button sx={{ pl: 4 }}>
                                   <ListItemIcon>
                                       <AddIcon />
                                   </ListItemIcon>
                                   <ListItemText primary='Добавить задачу' />
                               </ListItem>
                           </List>
                       </Collapse>

                   </div>
               )
            })}
        </List>
    )
}