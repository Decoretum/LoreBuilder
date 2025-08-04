import { Box, Button, Card, Grid, IconButton, Textarea, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { Character } from '../../Controllers/Character'
import { Link } from "react-router-dom";
import store from './Redux/store.tsx'

export function CharacterOrigin () {
    const [past, setPast] = useState('');
    const [personality, setPersonality] = useState('');

    useEffect(() => {
        // If Store has value


        // Else
        setPersonality('');
        setPast('');

    }, [])


    return (
        <>
            <div className='container-div-characters'>
                <img src='/characterorigin.gif' width={350} height={350} className='m-auto grid rounded-md' />                
                <Box sx={{
                    width: '50%',
                    height: '57%',
                    maxWidth: 300,
                    maxheight: 300,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    marginRight: '2vw',
                    marginTop: '-10vh'
                }}>
                    <Typography level='h3' className=''> What are you at the present? </Typography>

                    <Textarea
                    placeholder="Type in here…"
                    value={personality}
                    onChange={(event) => setPersonality(event.target.value)}
                    minRows={2}
                    maxRows={4}
                    startDecorator = {
                        <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
                            <IconButton variant="outlined" color="neutral">
                                👍
                            </IconButton>
                            <IconButton variant="outlined" color="neutral">
                                🏖
                            </IconButton>
                            <IconButton variant="outlined" color="neutral">
                                😍
                            </IconButton>
                            <Button variant="outlined" color="neutral" sx={{ ml: 'auto' }}>
                                See all
                            </Button>
                        </Box>
                    }
                    endDecorator = {
                        <Typography level="body-xs" sx={{ ml: 'auto' }}>
                        {personality.length} character(s)
                        </Typography>
                    }
                    sx={{ minWidth: 300, minHeight: 400 }}
                    />
                    </Box>

                    <Box sx={{
                        width: '50%',
                        height: '57%',
                        maxWidth: 300,
                        maxheight: 300,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        marginRight: '2vw',
                        marginTop: '-10vh'
                    }}>
                    <Typography level='h3' className=''> Describe your physical self </Typography>

                    <Textarea
                    placeholder="Type in here…"
                    value={past}
                    onChange={(event) => setPast(event.target.value)}
                    minRows={2}
                    maxRows={4}
                    startDecorator= 
                    {
                        <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
                            <IconButton variant="outlined" color="neutral">
                                👍
                            </IconButton>
                            <IconButton variant="outlined" color="neutral">
                                🏖
                            </IconButton>
                            <IconButton variant="outlined" color="neutral">
                                😍
                            </IconButton>
                            <Button variant="outlined" color="neutral" sx={{ ml: 'auto' }}>
                                See all
                            </Button>
                        </Box>
                    }
                endDecorator={
                    <Typography level="body-xs" sx={{ ml: 'auto' }}>
                    {past.length} character(s)
                    </Typography>
                }
                sx={{ minWidth: 300, minHeight: 400 }}
                />
                </Box>
            </div>
        </>
    )
}