import { Box, Button, Card, Grid, IconButton, Textarea, Typography, Tooltip } from "@mui/joy";
import { useEffect, useState } from "react";
import { Character } from '../../Controllers/Character.tsx'
import { Link, useNavigate } from "react-router-dom";
import store from '../../Redux/store.tsx'
import Hint from '../../Components/Hint.tsx'
import StoreCharText from '../../Controllers/StoreCharText.tsx'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigationValidator from "../../Components/NavigationValidator.tsx";
import GoBack from "../../Controllers/GoBack.tsx";

import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';


export default function CharacterOriginFeatures () {
    const [skills, setSkills] = useState('');
    const [strength, setStrength] = useState('');
    const [magic, setMagic] = useState('');
    const [binary, setBinary] = useState(0);
    const nav = useNavigate();

    function stateValidator() {
        let bad = ' ' || null || '';
        let storeSkills = store.getState().char.attributes.skills.trim();
        let storeStrength = store.getState().char.attributes.strength.trim();
        let storeMagic = store.getState().char.attributes.magic.trim();
        if ((storeSkills === bad || storeSkills.length === 0) 
        || (storeStrength === bad || storeStrength.length === 0)
        || (storeMagic === bad || storeMagic.length === 0)) {
            setBinary(1);
        }
        else {
            setBinary(0);
            // nav('/characters/creation/origins/past');
            nav('/')
        }  
    }

    function resetBinary() {
        setBinary(0);
    }


    useEffect(() => {
        // If Store has value
        let storeSkills = store.getState().char.attributes.skills;
        let storeStrength = store.getState().char.attributes.strength;
        let storeMagic = store.getState().char.attributes.magic;

        console.log(storeSkills)

        if (storeSkills !== '' || null)
        setSkills(storeSkills);

        if (storeStrength !== '' || null)
        setStrength(storeStrength);

        if (storeMagic !== '' || null)
        setMagic(storeMagic);
    }, [])



    return (
        <>
            <div className='container-div-features'>
                <Button onClick = {() => GoBack('/characters/creation/origins/past', nav)} className='absolute -bottom-80 right-60' sx={{ outline: 'none !important'}} variant='soft'>
                    <ArrowBackIcon />
                </Button>

                <Tabs
                defaultValue = {0}
                aria-label="Vertical tabs"
                orientation="vertical"
                sx={{ minWidth: 500, height: 320, borderRadius: '10px', backgroundColor: 'rgba(30, 40, 30, 0.85)' }}
                >
                <TabList>
                    <Tab sx = {{ '&.Mui-selected': {backgroundColor: 'oklch(40.5% 0.101 131.063)', outline: 'none'} }}> <span className='text-red-50'> Skills </span> </Tab>
                    <Tab sx = {{ '&.Mui-selected': {backgroundColor: 'oklch(40.5% 0.101 131.063)', outline: 'none'} }}> <span className='text-red-50'> Strength </span> </Tab>
                    <Tab sx = {{ '&.Mui-selected': {backgroundColor: 'oklch(40.5% 0.101 131.063)', outline: 'none'} }}> <span className='text-red-50'> Magic </span> </Tab>
                </TabList>

                <TabPanel value={0}>
                <Textarea
                    placeholder="Type in here…"
                    value={skills}
                    onChange={(event) => {
                        setSkills(event.target.value);
                        StoreCharText('/attributes/skills', event.target.value);
                       
                    }}
                    minRows={2}
                    maxRows={4}
                    startDecorator = {
                        <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
                            <Hint props = 'skills' />
                        </Box>
                    }
                    endDecorator = {
                        <Typography level="body-xs" sx={{ ml: 'auto', color: 'green' }}>
                        {skills.length} character(s)
                        </Typography>
                    }
                    sx={{ '&.MuiSelected': { outline: 'none !important' }, minWidth: 200, minHeight: 280, backgroundColor: 'transparent', color: 'white' }}
                    />
                </TabPanel>
                
                <TabPanel value={1}>
                <Textarea
                    placeholder="Type in here…"
                    value={strength}
                    onChange={(event) => {
                        setStrength(event.target.value);
                        StoreCharText('/attributes/strength', event.target.value);
                       
                    }}
                    minRows={2}
                    maxRows={4}
                    startDecorator = {
                        <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
                            <Hint props = 'strength' />
                        </Box>
                    }
                    endDecorator = {
                        <Typography level="body-xs" sx={{ ml: 'auto', color: 'green' }}>
                        {strength.length} character(s)
                        </Typography>
                    }
                    sx={{ minWidth: 200, minHeight: 280, backgroundColor: 'transparent', color: 'white' }}
                    />
                </TabPanel>

                <TabPanel value={2}>
                    <Textarea
                    placeholder="Type in here…"
                    value={magic}
                    onChange={(event) => {
                        setMagic(event.target.value);
                        StoreCharText('/attributes/magic', event.target.value);
                       
                    }}
                    minRows={2}
                    maxRows={4}
                    startDecorator = {
                        <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
                            <Hint props = 'magic' />
                        </Box>
                    }
                    endDecorator = {
                        <Typography level="body-xs" sx={{ ml: 'auto', color: 'green' }}>
                        {magic.length} character(s)
                        </Typography>
                    }
                    sx={{ minWidth: 200, minHeight: 280, backgroundColor: 'transparent', color: 'white' }}
                    />
                </TabPanel>
                </Tabs>


               
                <Button onClick={() => stateValidator()} className='absolute -bottom-80 left-60' sx={{ outline: 'none !important'}} variant='soft'>
                    <ArrowForwardIcon />
                </Button>

                { NavigationValidator(binary, resetBinary) }
            </div>            
        </>
    )
}