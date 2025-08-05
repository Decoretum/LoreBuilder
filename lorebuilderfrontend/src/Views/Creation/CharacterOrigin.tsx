import { Box, Button, Card, Grid, IconButton, Textarea, Typography, Tooltip } from "@mui/joy";
import { useEffect, useState } from "react";
import { Character } from '../../Controllers/Character'
import { Link } from "react-router-dom";
import store from '../../Redux/store.tsx'
import Hint from '../../Components/Hint.tsx'
import StoreCharText from '../../Controllers/StoreCharText.tsx'

export function CharacterOrigin () {
    const [present, setPresent] = useState('');
    const [physical, setPhysical] = useState('');


    useEffect(() => {
        // If Store has value
        let storePresent = store.getState().char.origins.present;
        let storePhysical = store.getState().char.attributes.physicalInfo;
        if (storePresent !== '')
        setPresent(storePresent);

        if (storePhysical !== '')
        setPhysical(storePhysical);
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
                    value={present}
                    onChange={(event) => {
                        setPresent(event.target.value);
                        StoreCharText('/origins/present', event.target.value);
                       
                    }}
                    minRows={2}
                    maxRows={4}
                    startDecorator = {
                        <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
                            <Hint props = 'present' />
                        </Box>
                    }
                    endDecorator = {
                        <Typography level="body-xs" sx={{ ml: 'auto' }}>
                        {present.length} character(s)
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
                    value={physical}
                    onChange={(event) => {
                        setPhysical(event.target.value);
                        StoreCharText('/attributes/physicalInfo', event.target.value);
                        
                    }}
                    minRows={2}
                    maxRows={4}
                    startDecorator= 
                    {
                        <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
                            <Hint props = 'physical' />
                        </Box>
                    }
                endDecorator={
                    <Typography level="body-xs" sx={{ ml: 'auto' }}>
                    {physical.length} character(s)
                    </Typography>
                }
                sx={{ minWidth: 300, minHeight: 400 }}
                />
                </Box>
            </div>
        </>
    )
}