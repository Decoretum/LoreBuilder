import { Grid, Typography } from "@mui/joy";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Footer () {
    const [color, setColor] = useState('text-cyan-200')
    return (
        <div className='mt-3'>
                <Grid container spacing = {1} sx={{ flexGrow: 1 }}  className='bg-[#454E5A] p-3 rounded-md shadow-lg shadow-cyan-500/50 '> 
                    <Grid className='w-50'>
                        <Typography variant='plain' level="body-sm"> 
                            <span className='text-gray-50'>Lore Builder</span>
                        </Typography>
                    </Grid>

                    <Grid className='w-50 ml-60'>
                        <Link to='https://github.com/Decoretum/' target='_blank' onMouseLeave={() => setColor('text-cyan-200')} onMouseOver={() => {setColor('text-sky-300')}}>
                            <Typography variant='plain' level="body-sm">
                                <span className={color}>Gael's Github</span>
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
        </div>
    )
}