import * as React from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {DayReview, Task} from "../types";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchStats} from "../store/reducers/ActionCreators";

function createData(
    name: string,
    online: boolean,
    start: string | Date,
    end: Date | string,
    currentTask: string,
    tasksCount: number,
    tasks: Array<Task>
) {
    return {
        name,
        online,
        start,
        end,
        currentTask,
        tasksCount,
        tasks,
    };
}

function Row(props: { row: DayReview }) {
    const { row } = props
    const [open, setOpen] = React.useState(false)

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset'} }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.online ? 'Да' : 'Нет'}</TableCell>
                <TableCell align="right">{row.start ? row.start : 'Не на смене'}</TableCell>
                <TableCell align="right">{row.end ? row.end : row.start ? 'Смена не окончена' : 'Не на смене'}</TableCell>
                <TableCell align="right">{row.currentTask ? row.currentTask : 'Нет активных задач'}</TableCell>
                <TableCell align="right" sx={{pr: 5}}>{row.tasksCount}</TableCell>
            </TableRow>
            <TableRow sx = {{backgroundColor: '#918e8ed3'}}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit >
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                История
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Задача</TableCell>
                                        <TableCell align="right">Время начала</TableCell>
                                        <TableCell align="right">Время окончания</TableCell>
                                        <TableCell align="right">Затраченнное время</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.tasks.map((historyRow:Task, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.name}
                                            </TableCell>
                                            <TableCell align="right">{historyRow.start}</TableCell>
                                            <TableCell align="right">{historyRow.end} </TableCell>
                                            <TableCell align="right">{historyRow.time} </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

// const rows = [
//     createData('Работник 1', false, '2020-01-05 14:13', 'null', 'null', 0),
//     createData('Работник 2', true, '2020-01-05 14:13', '2020-01-05 17:13', 'Задача 56', 3),
//     createData('Работник 3', false, 'null', 'null', 'Задача 5', 1),
//     createData('Работник 4', false, '2020-01-05 14:13', '2020-01-05 17:13', 'null', 0),
//     createData('Работник 5', true, '2020-01-05 14:13', 'null', 'Задача 23', 2),
// ];

export default function StatTable() {
    const dispatch = useAppDispatch()
    const {stats} = useAppSelector(state => state.statsReducer)
    React.useEffect(()=> {
        dispatch(fetchStats())
    }, [])

    return (
        <TableContainer component={Paper} sx={{marginTop: '70px'}}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Имя</TableCell>
                        <TableCell align="right">На смене</TableCell>
                        <TableCell align="right">Время начала смены</TableCell>
                        <TableCell align="right">Время окончания смены</TableCell>
                        <TableCell align="right">Текущая задача</TableCell>
                        <TableCell align="right" sx={{pr: 5}}>Количество задач</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stats && stats.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}