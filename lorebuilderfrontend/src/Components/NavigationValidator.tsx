import { Box } from '@mui/joy';
import Alert from '@mui/joy/Alert';
import { JSX, useEffect, useState } from 'react';
import IconButton from '@mui/joy/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


export default function NavigationValidator(binary : Number, resetBinary : Function) {
    const [hide, setHide] = useState(true)
    const [param, setParam] = useState(0)

    useEffect(() => {
        if (binary === 1) setParam(1);
        else setParam(0)
    }, [binary])

    return (
        hide === false || (param === 1) && (
            <Box sx={{ width: '50%', position: 'absolute' }} className = 'bottom-5'>
            <Alert 
            variant='soft'
            hidden = {hide}
            color = 'warning'
            endDecorator= {
                <IconButton variant='soft' onClick = {() => {
                    setHide(true);
                    setParam(0);
                    resetBinary();
                    }}>
                    <CloseRoundedIcon color='warning' />
                </IconButton>
            }
            > You have incomplete fields! </Alert>  
        </Box>
        ) 
    )
}