import { Box, Card, Grid, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { Character } from '../../Controllers/Character'
import { Link } from "react-router-dom";

export function Characters () {
    const { getCharacters } = Character();
    const [characters, setCharacters] = useState([]);

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
                    display: 'grid',
                    gap: 2
                }}>

                    { characters.length === 0 ? (

                        <Link to='/characters/creation/origins' className='font-normal'>
                            <Card variant='soft'>
                                <img src='/book.gif' width={50} height={50} className='m-auto l-50% r-%50' />
                                <Typography level='body-md'> No Characters present. Build your character now! </Typography>
                            </Card>
                        </Link>
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