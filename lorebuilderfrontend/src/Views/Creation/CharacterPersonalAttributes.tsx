import { Box, Button, Card, CardContent, Modal, ModalClose, ModalDialog, Textarea, Typography, styled } from "@mui/joy";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import store from '../../Redux/store.tsx'
import Hint from '../../Components/Hint.tsx'
import StoreCharText from '../../Controllers/StoreCharText.tsx'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigationValidator from "../../Components/NavigationValidator.tsx";
import GoBack from "../../Controllers/GoBack.tsx";
import StateValidator from "../../Controllers/StateValidator.tsx";

import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

type comp  = {
    class: 'attributes' | 'origins',
    field: string
}
type stateArr = Array<comp>;

export default function CharacterPersonalAttributes () {
    const [binary, setBinary] = useState(0);
    const [pointer, setPointer] = useState('general');
    const nav = useNavigate();
    const storeFields : stateArr  = [
        {'class' : 'attributes', 'field' : 'skills'}, 
        {'class' : 'attributes', 'field' : 'strength'}, 
        {'class': 'attributes', 'field' : 'magic'}
]

    function setLeftPane () {
        if (pointer === 'general') {
            return (

                <></>
            )
        }
    }

    function resetBinary() {
        setBinary(0);
    }

    function setBinaryChild(){
        setBinary(1);
    }


    useEffect(() => {
        // If Store has value
        // let storeSkills = store.getState().char.attributes.skills;
        // let storeStrength = store.getState().char.attributes.strength;
        // let storeMagic = store.getState().char.attributes.magic;

        // if (storeSkills !== '' || null)
        // setSkills(storeSkills);

        // if (storeStrength !== '' || null)
        // setStrength(storeStrength);

        // if (storeMagic !== '' || null)
        // setMagic(storeMagic);

    }, [])



    return (
        <>
            <div className='container-div-personalattributes'>
                <Box className='flex flex-row border border-solid'>
                
                    {/* Left Pane */}
                    <Box className='h-[100%] relative' hidden = {false}>
                        { pointer === 'armor' ? (
                            <>
                            <Box className='flex flex-col items-center'>
                                <Box className='flex flex-row w-[40vw] h-[30vh] ml-[14vw] items-center'>
                                    <Button variant='soft' color='warning' onClick = {() => setPointer('general')}>
                                        <ArrowBackIcon />
                                    </Button>
                                    <img src='/attributes/backpack.png' width = {90} className='ml-[1vw]' />
                                    <Typography variant="plain" level='h2' 
                                    sx= {{ 
                                        marginLeft: '1vw', 
                                        color: 'brown', 
                                        backdropFilter: 'blur(2px)' 
                                        }}> 
                                        Inventory 
                                    </Typography>
                                </Box>
                                <Typography variant="plain" level='body-lg' 
                                sx= {{ 
                                    marginTop: '-7vh', backdropFilter: 'blur(2px)', borderRadius: '12px', 
                                    width: '14vw', padding: '5px', 
                                    marginLeft: '2vw', color: 'black' 
                                }}> 
                                    Click on Any of the Gears
                                </Typography>
                            </Box>

                            {/* Rest of the Inventory */}

                            <Box className='relative mt-5 ml-[13vw] flex flex-row border'>
                                <img src='/attributes/cf2.png' width = {400} className='rounded-md absolute z-0' />

                                {/* Gears */}

                                {/* left gauntlet, cape */}
                                <Box className='flex flex-col ml-[1vw] mt-[15vh]'>
                                    <img src='/attributes/glove.png' width = {100} className='z-10' />
                                    <img src='/attributes/cloak.png' width = {80} className='rounded-md z-10 ml-[0.5vw]' />
                                </Box>

                                {/* helmet, armor, leggings, boots */}
                                <Box className='flex flex-col ml-[3vw]'>
                                <img src='/attributes/helm.png' width = {100} className='z-10' />
                                <img src='/attributes/armor2.png' width = {100} className='z-10' />
                                <img src='/attributes/leggings.png' width = {100} className='z-10' />
                                <img src='/attributes/boots/41.png' width = {70} className='z-10 ml-[1.5vw]' />

                                    
                                </Box>

                                {/* right gauntlet, accessories */}
                                <Box className='flex flex-col mt-[15vh] ml-[3vw]'>
                                    <img src='/attributes/glove.png' width = {100} className='z-10' />
                                    <img src='/attributes/ring.png' width = {100} className='z-10' />
                                </Box>
                            </Box>
                        </>
                        ) 
                        : pointer === 'general' ? (
                            <>
                                <Typography variant="plain" level='h3' sx= {{ marginLeft: '10vw',  marginTop: '30vh', backdropFilter: 'blur(2px)', borderRadius: '12px', width: '22vw', padding: '5px', color: 'black' }}> 
                                        Choose an equipment category
                                </Typography>

                                <Box className='flex flex-row w-[40vw] h-[30vh] ml-[5vw] items-center'>
                                    <Box className='flex flex-col'>
                                        <Typography variant="plain" level='h4' sx= {{ backdropFilter: 'blur(2px)', borderRadius: '12px', width: '14vw', padding: '5px', marginLeft: '2vw', color: 'black' }}> 
                                            Armor
                                        </Typography>
                                        <img src='/attributes/armor.png' onClick = {() => setPointer('armor')} width = {100} className='ml-[5.3vw] cursor-pointer' />
                                    </Box>

                                    <Box className='flex flex-col -mt-[5vh]'>
                                        <Typography variant="plain" level='h4' sx= {{ backdropFilter: 'blur(2px)', borderRadius: '12px', width: '14vw', padding: '5px', marginLeft: '2vw', color: 'black' }}> 
                                            Weapons
                                        </Typography>
                                        <img src='/attributes/weapons/weapon1.png' onClick = {() => console.log(1)} width = {100} className='ml-[5.3vw] mt-[5vh] -rotate-90 cursor-pointer' />
                                    </Box>
                                </Box>
                            </>
                        ) 
                        : (
                            <>
                            
                            </>
                        )}
                        
                    </Box>

                    {/* Right Pane  */}
                    <Box className='border'>
                        RIGHT
                    </Box>

                { NavigationValidator(binary, resetBinary) }
                </Box>
            </div>            
        </>
    )
}