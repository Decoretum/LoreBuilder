import { Grid, Typography } from "@mui/joy";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Footer () {
    const [color, setColor] = useState('text-cyan-200')
    return (
        <div className='mt-2'>
                <Grid container spacing = {3} sx={{ flexGrow: 1 }}  className='bg-[#454E5A] rounded-md'> 
                    <Grid className='w-80'>
                        <Typography variant='plain' level="body-sm"> 
                            <p className='text-gray-50'>Lore Builder</p>
                        </Typography>
                    </Grid>

                    <Grid className='w-80'>
                        <Link to='https://github.com/Decoretum/' target='_blank' onMouseLeave={() => setColor('text-cyan-200')} onMouseOver={() => {setColor('text-sky-300')}}>
                            <Typography variant='plain' level="body-sm">
                                <p className={color}>Gael's Github</p>
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
        </div>
    )
}