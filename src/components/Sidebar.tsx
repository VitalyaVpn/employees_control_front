import * as React from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import {Avatar, Stack} from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import Button from '@mui/material/Button'
import GroupIcon from '@mui/icons-material/Group'
import {Link} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from "../hooks/redux"
import {appSlice} from "../store/reducers/AppSlice"
import {logout} from "../store/reducers/ActionCreators"

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(7)} + 1px)`,
    },
})

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
    open?: boolean
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'rgb(0, 30, 60)',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
)

const Sidebar = () => {

    const dispatch = useAppDispatch()
    const {drawer, activePage} = useAppSelector(state=> state.appReducer)
    const {toggleDrawer, setActivePage} = appSlice.actions

    const theme = useTheme()

    return (
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <CssBaseline />
            <AppBar position="fixed" open={drawer}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={()=>{dispatch(toggleDrawer())}}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(drawer && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'left' }} >
                        Мониторинг сотрудников
                    </Typography>
                    <Stack direction="row" spacing={3} alignSelf='center' alignItems='center'>
                        <Button
                            color="inherit"
                            onClick = {()=>{dispatch(logout())}}
                        >Выйти</Button>
                        <Avatar alt="Profile" src="https://sun1-14.userapi.com/s/v1/if1/p4UrdLSb9aqnjc3f1oWnCcVtYHoeL4wX2f3XPFDFEVx9y23wY_GJibcwM1hKY9KCq2j0j1en.jpg?size=50x50&quality=96&crop=1377,485,573,573&ava=1" />
                    </Stack>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={drawer}>
                <DrawerHeader>
                    <IconButton onClick={()=>{dispatch(toggleDrawer())}}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <Link to='/settings'>
                        <ListItem
                            button key='Настройка задач'
                            sx = {{bgcolor: activePage === 'settings' ? 'rgba(0, 0, 0, 0.03)' : 'rgba(0, 0, 0, 0.00)'}}
                            onClick = {()=>{dispatch(setActivePage('tasks'))}}
                        >
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary='Настройка задач' />
                        </ListItem>
                    </Link>

                    <Link to='/stats'>
                        <ListItem button key='Статистика'
                                  sx = {{bgcolor: activePage === 'stats' ? 'rgba(0, 0, 0, 0.03)' : 'rgba(0, 0, 0, 0.00)'}}
                                  onClick = {()=>{dispatch(setActivePage('stats'))}}
                        >
                            <ListItemIcon>
                                <QueryStatsIcon />
                            </ListItemIcon>
                            <ListItemText primary='Статистика' />
                        </ListItem>
                    </Link>

                    <Link to='/employee'>
                        <ListItem
                            button key='Работники'
                            sx = {{bgcolor: activePage === 'employee' ? 'rgba(0, 0, 0, 0.03)' : 'rgba(0, 0, 0, 0.00)'}}
                            onClick = {()=>{dispatch(setActivePage('employee'))}}
                        >
                            <ListItemIcon>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary='Работники' />
                        </ListItem>
                    </Link>


                </List>
                <Divider />
                <List>
                    {['Мои задачи', 'Мои текущие', 'Моя статистика'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index === 0 ? <SettingsIcon /> : index  === 1 ? <TaskAltIcon /> : <QueryStatsIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    )
}

export default Sidebar