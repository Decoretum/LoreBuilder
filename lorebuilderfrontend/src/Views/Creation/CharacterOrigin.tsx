import { Box, Button, Card, Grid, IconButton, Textarea, Typography, Tooltip } from "@mui/joy";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import store from '../../Redux/store.tsx'
import Hint from '../../Components/Hint.tsx'
import StoreCharText from '../../Controllers/StoreCharText.tsx'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigationValidator from '../../Components/NavigationValidator.tsx'
import GoBack from '../../Controllers/GoBack.tsx'
import StateValidator from "../../Controllers/StateValidator.tsx";

type comp  = {
    class: 'attributes' | 'origins',
    field: string
}
type stateArr = Array<comp>;

export default function CharacterOrigin () {
    const [present, setPresent] = useState('');
    const [physical, setPhysical] = useState('');
    const [binary, setBinary] = useState(0);
    const nav = useNavigate();
    const storeFields : stateArr = [{'class' : 'attributes', 'field' : 'physicalInfo'}, {'class' : 'origins', 'field' : 'present'}];

    function resetBinary() {
        setBinary(0);
    }

    function setBinaryChild(){
        setBinary(1);
    }

    useEffect(() => {
        // If Store has value
        let storePresent = store.getState().char.origins.present;
        let storePhysical = store.getState().char.attributes.physicalInfo;
        if (storePresent !== '' || null)
        setPresent(storePresent);

        if (storePhysical !== '' || null)
        setPhysical(storePhysical);
    }, [])

    return (
        <>
            <div className='container-div-past'>
                <Box className='flex flex-col'>
                    {/* The images and textareas */}
                    <Box className='flex flex-row mt-40'>
                        <img src='/characterorigin.gif' width={330} height={300} className='m-auto -mt-4 mr-11 grid rounded-md' />                
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
                        startDecorator =  
                        {
                            <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
                                <Hint props = 'physical' />
                            </Box>
                        }
                        endDecorator = {
                        <Typography level="body-xs" sx={{ ml: 'auto' }}>
                            {physical.length} character(s)
                        </Typography>
                        }
                        sx={{ minWidth: 300, minHeight: 400 }}
                        />
                        </Box>
                    </Box>
                </Box>
                    
                {/* Arrow buttons and prompt */}
                <Box className='flex flex-row mt-14'>
                        <div className='arrow-container'>
                            <Button onClick = {() => GoBack('/characters', nav)} className='' sx={{ outline: 'none !important'}} variant='soft'>
                                <ArrowBackIcon />
                            </Button>

                            { NavigationValidator(binary, resetBinary) }

                            <Button onClick={() => StateValidator(nav, [resetBinary, setBinaryChild], storeFields, '/characters/creation/origins/past')} className='ml-45' sx={{ outline: 'none !important'}} variant='soft'>
                                <ArrowForwardIcon />
                            </Button>
                        </div>
                </Box>               
            </div>            
        </>
    )
}