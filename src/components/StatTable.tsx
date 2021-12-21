import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(
    name: string,
    currentTime: string,
    start: string,
    end: string,
    currentTask: string,
    tasksAmount: number,
) {
    return {
        name,
        currentTime,
        start,
        end,
        currentTask,
        tasksAmount,
        history: [
            {
                taskName: 'Комментарии',
                date: '2020-01-05 14:13',
                dateEnd: '2020-01-05 15:48',
                time: '1:00:19',
            },
            {
                taskName: 'Накрутка',
                date: '2020-01-05 14:59',
                dateEnd: '2020-01-05 16:11',
                time: '1:00:19',
            },
        ],
    };
}

function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

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
                <TableCell align="right">{row.currentTime}</TableCell>
                <TableCell align="right">{row.start}</TableCell>
                <TableCell align="right">{row.end}</TableCell>
                <TableCell align="right">{row.currentTask}</TableCell>
                <TableCell align="right" sx={{pr: 5}}>{row.tasksAmount}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
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
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.taskName}
                                            </TableCell>
                                            <TableCell align="right">{historyRow.date}</TableCell>
                                            <TableCell align="right">{historyRow.dateEnd} </TableCell>
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

const rows = [
    createData('Работник 1', '159', '6.0', '24', '4.0', 2),
    createData('Работник 2', '237', '9.0', '37', '4.3', 3),
    createData('Работник 3', '262', '16.0', '24', '6.0', 1),
    createData('Работник 4', '305', '3.7', '67', '4.3', 1),
    createData('Работник 5', '356', '16.0', '49', '3.9', 2),
];

export default function StatTable() {
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
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}