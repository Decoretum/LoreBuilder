import { Box, Button, Card, Grid, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { Character } from '../../Controllers/Character'
import { Link, useNavigate } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";
import GoBack from "../../Controllers/GoBack";

export function Characters () {
    const { getCharacters } = Character();
    const [characters, setCharacters] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        getCharacters();
        setCharacters([]);
    }, [])


    return (
        <>
            <div className='container-div-background'>
                {/* <img src='/cozybackground_upscaled.png' width = {1000} height = {800} className='z-1 fixed' /> */}

                <Box sx={{
                    width: '100%',
                    maxWidth: 500,
                    display: 'flex',
                    flexDirection: 'column',
                }}>

                    { characters.length === 0 ? (
                        <>
                            <Box className='flex flex-col'>
                                <Box className='w-[50%] ml-[9.5vw] p-5' sx = {{ backdropFilter: 'blur(2px)' }}>
                                    <Link to='/characters/creation/origins'>
                                        <Box className='p-2 bg-white w-[8vw] rounded-lg m-auto p-6'>
                                            <img src='/book.gif' width={50} height={50} className='m-auto' />
                                        </Box>
                                        <Box className='mt-[5vh]'>
                                            <Typography level='body-lg' variant='plain' sx = {{ color: 'black', fontFamily: 'PixelFont' }}> No Characters present. Build your first character! </Typography>
                                        </Box>
                                    </Link>
                                </Box>  

                                <Box className='mt-[3vh]'>
                                    <Button color='warning' variant='soft' className='w-[13%]' onClick={() => GoBack('/', nav)}>
                                        <ArrowBack />
                                    </Button> 
                                </Box>
                            </Box>                   
                        </>
                    ) : (
                        <>
                            Haha
                        </>
                    ) }

                </Box>
            </div>
        </>
    )
}