import { Box, Button, Card, CardContent, Input, Modal, ModalClose, ModalDialog, Textarea, Typography, styled } from "@mui/joy";
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
    const invText : string = "Click on Any of the Gear";
    const [binary, setBinary] = useState(0);
    const [pointer, setPointer] = useState('general');
    const [inventoryText, setInventoryText] = useState(invText);
    const [img, setImg] = useState("");
    const nav = useNavigate();
    const storeFields : stateArr  = [
        {'class' : 'attributes', 'field' : 'skills'}, 
        {'class' : 'attributes', 'field' : 'strength'}, 
        {'class': 'attributes', 'field' : 'magic'}
]

    function clickImage (img: string) {
        switch(img){
            case "armor/helm":
                 setPointer(img); 
                 setInventoryText("Helmet");
                 setImg(`/attributes/${img.substring(6)}.png`);
                 break;
            case "armor/leftarm":
                setPointer(img);
                setInventoryText("Left Armwear");
                setImg(`/attributes/glove.png`);
                break;
            case "armor/rightarm":
                setPointer(img);
                setInventoryText("Right Armwear");
                setImg(`/attributes/glove.png`);
                break;
            case "armor/backwear":
                setPointer("armor/backwear");
                setInventoryText("Backwear");
                setImg(`/attributes/${img.substring(6)}.png`);
                break;
            case "armor/chest":
                setPointer("armor/chest");
                setInventoryText("Chestwear");
                setImg(`/attributes/${img.substring(6)}.png`);
                break;
            case "armor/leggings":
                setPointer("armor/leggings");
                setInventoryText("Legwear");
                setImg(`/attributes/${img.substring(6)}.png`);
                break;
            case "armor/foot":
                setPointer("armor/foor");
                setInventoryText("Footwear");
                setImg(`/attributes/${img.substring(6)}.png`);
                break;
            case "armor/ring":
                setPointer("armor/ring");
                setInventoryText("Ring");
                setImg(`/attributes/${img.substring(6)}.png`);
                break;
        }

    }
    function setLeftPane () {
        if (pointer === 'general') {
            return (

                <></>
            )
        }
    }

    function goBack() {
        if (pointer == "armor") {
            setInventoryText(invText);
            setPointer("general");
        }
        else if (pointer.indexOf("armor/") == 0) {
            setInventoryText(invText);
            setPointer("armor");
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
                        { pointer.indexOf('armor') != -1 ? 
                        (
                        <>
                            <Box className='flex flex-col items-center'>
                                <Box className='flex flex-row w-[40vw] h-[30vh] ml-[14vw] items-center'>
                                    <Button variant='soft' color='warning' onClick = {goBack}>
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
                                <Typography variant="plain" level='h2' className='rounded-b-lg'
                                sx= {{ 
                                    marginTop: '-7vh', backdropFilter: 'blur(2px)', 
                                    width: '14vw', padding: '5px', 
                                    marginLeft: '2vw', color: 'black' 
                                }}> 
                                    { inventoryText }
                                </Typography>
                            </Box>

                            {/* Rest of the Inventory */}

                            <Box className='relative mt-5 ml-[13vw] flex flex-row border'>
                                <img src='/attributes/cf2.png' width = {400} className='rounded-md absolute z-0' />
                                
                                {/* If a gear is selected */}
                                { pointer.indexOf("armor/") != -1 ?
                                ( 
                                <Box className='flex flex-col items-center border ml-[7vw] gap-5'>
                                    <img src={img} width = {100} className='z-10' />
                                    <Input size='lg' variant='plain' 
                                    placeholder={`${pointer.substring(6, 7).toUpperCase()}${pointer.substring(7)} Name`} 
                                    sx={{ backgroundColor: "floralwhite" }}
                                    />
                                </Box> 
                                ) : pointer == "armor" ? 
                                (
                                <>
                                    {/* Overview of Gears */}
                                    {/* left gauntlet, cape */}
                                    <Box className='flex flex-col ml-[1vw] mt-[15vh]'>
                                        <img src='/attributes/glove.png' width = {100} className='z-10 cursor-pointer' onClick={() => {clickImage("armor/leftarm")}} />
                                        <img src='/attributes/backwear.png' width = {80} className='cursor-pointer rounded-md z-10 ml-[0.5vw]' onClick={() => {clickImage("armor/backwear")}} />
                                    </Box>

                                    {/* helmet, armor, leggings, boots */}
                                    <Box className='flex flex-col ml-[3vw]'>
                                        <img src='/attributes/helm.png' width = {100} className='z-10 cursor-pointer' onClick={() => {clickImage("armor/helm")}} />
                                        <img src='/attributes/chest.png' width = {100} className='z-10 cursor-pointer' onClick={() => {clickImage("armor/chest")}} />
                                        <img src='/attributes/leggings.png' width = {100} className='z-10 cursor-pointer' onClick={() => {clickImage("armor/leggings")}} />
                                        <img src='/attributes/boots/41.png' width = {70} className='z-10 ml-[1.5vw] cursor-pointer' onClick={() => {clickImage("armor/foot")}} />
                                    </Box>

                                    {/* right gauntlet, accessories */}
                                    <Box className='flex flex-col mt-[15vh] ml-[3vw]'>
                                        <img src='/attributes/glove.png' width = {100} className='z-10 cursor-pointer' onClick={() => {clickImage("armor/rightarm")}} />
                                        <img src='/attributes/ring.png' width = {100} className='z-10 cursor-pointer' onClick={() => {clickImage("armor/ring")}} />
                                    </Box>
                                </>
                                ) : 
                                (
                                    <>
                                    </>
                                )}
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
                    <div className='container-div border backdrop-blur-sm'>
                    <Textarea
                        variant='outlined'
                        color='primary'
                        placeholder="Type in here…"
                        value={"Gael"}
                        sx = {{ color: 'red' }}
                        // onChange={(event) => {

                        // }}
                        minRows={2}
                        maxRows={4}
                        startDecorator = {
                            <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
                                <Hint props = 'skills' />
                            </Box>
                        }
                        endDecorator = {""
                            // <Typography level="body-xs" sx={{ ml: 'auto', color: 'green' }}>
                            // {skills.length} character(s)
                            // </Typography>
                        }
                        sx={{ '&.MuiSelected': { outline: 'none !important' }, minWidth: 350, height: 280, backgroundColor: 'transparent', color: 'white' }}
                    />

                    </div>

                { NavigationValidator(binary, resetBinary) }
                </Box>
            </div>            
        </>
    )
}