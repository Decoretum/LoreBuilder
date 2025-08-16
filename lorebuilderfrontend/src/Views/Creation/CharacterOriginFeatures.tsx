import { Box, Button, Textarea, Typography, styled } from "@mui/joy";
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

const StyledTab = styled(Tab)(({ theme, color = 'primary' }) => ({
    '&:hover': {
      color: theme.palette[color].plainColor,
      backgroundColor: 'green',
    },
  }));

export default function CharacterOriginFeatures () {
    const [skills, setSkills] = useState('');
    const [strength, setStrength] = useState('');
    const [magic, setMagic] = useState('');
    const [binary, setBinary] = useState(0);
    const [img, setImg] = useState('/skills.png')
    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(200);
    const [arrowHeight, setArrowHeight] = useState(40);
    const nav = useNavigate();
    const storeFields : stateArr  = [
        {'class' : 'attributes', 'field' : 'skills'}, 
        {'class' : 'attributes', 'field' : 'strength'}, 
        {'class': 'attributes', 'field' : 'magic'}
]


    

    function changeImage(event : SyntheticEvent) {
        let imgName = event.target.getAttribute('data-value')
        if (imgName === null)
        imgName = event.target.parentElement.getAttribute('data-value');
  
        setImg(imgName);

        if (imgName === '/skills.png') {
            setWidth(400);
            setHeight(200);
            setArrowHeight(40);
            return;
        } 
        setWidth(300);
        setHeight(450);

        if (imgName === '/strength.png') setArrowHeight(24);
        else setArrowHeight(28)
        
    }

    function resetBinary() {
        setBinary(0);
    }

    function setBinaryChild(){
        setBinary(1);
    }


    useEffect(() => {
        // If Store has value
        let storeSkills = store.getState().char.attributes.skills;
        let storeStrength = store.getState().char.attributes.strength;
        let storeMagic = store.getState().char.attributes.magic;

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
            <Box className='flex flex-col'>
                {/* The images and textareas */}
                <Box className='flex flex-row mt-40'>
                    <img src={img} width={width} height={height} className='m-auto mr-8 grid rounded-md' />                
                
                    <Tabs
                    onChange = {changeImage}
                    aria-label="Vertical tabs"
                    orientation="vertical"
                    sx={{ minWidth: 500, height: 320, borderRadius: '10px', marginRight: '6vw', backgroundColor: 'rgba(30, 40, 30, 0.85)' }}
                    >
                        <TabList>
                            <Tab variant='plain' data-value = '/skills.png' sx = {{ '--variant-plainHoverBg': '#70a35b', '&.Mui-selected': {backgroundColor: 'oklch(40.5% 0.101 131.063)', outline: 'none'} }}> <span className='text-red-50'> Skills </span> </Tab>
                            <Tab variant='plain' data-value = '/strength.png' sx = {{ '--variant-plainHoverBg': '#70a35b', '&.Mui-selected': {backgroundColor: 'oklch(40.5% 0.101 131.063)', outline: 'none'} }}> <span className='text-red-50'> Strength </span> </Tab>
                            <Tab variant='plain' data-value = '/pastgif.gif' sx = {{ '--variant-plainHoverBg': '#70a35b', '&.Mui-selected': {backgroundColor: 'oklch(40.5% 0.101 131.063)', outline: 'none'} }}> <span className='text-red-50'> Magic </span> </Tab>
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

                </Box>
                
                <Box className={`flex flex-row mt-${arrowHeight}`}>
                    <div className='arrow-container'>
                        <Button onClick = {() => GoBack('/characters/creation/origins/past', nav)} sx={{ outline: 'none !important'}} variant='soft'>
                            <ArrowBackIcon />
                        </Button>

                        { NavigationValidator(binary, resetBinary) }

                        <Button onClick={() => StateValidator(nav, [resetBinary, setBinaryChild], storeFields, '/characters/creation/personal-attributes')} sx={{ outline: 'none !important'}} variant='soft'>
                            <ArrowForwardIcon />
                        </Button>
                    </div>
                </Box>
            </Box>
            </div>            
        </>
    )
}