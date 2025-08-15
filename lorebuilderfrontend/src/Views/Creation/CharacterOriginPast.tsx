import { Box, Button, Textarea, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import store from '../../Redux/store.tsx'
import Hint from '../../Components/Hint.tsx'
import StoreCharText from '../../Controllers/StoreCharText.tsx'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigationValidator from "../../Components/NavigationValidator.tsx";
import GoBack from "../../Controllers/GoBack.tsx";
import StateValidator from "../../Controllers/StateValidator.tsx";

type comp  = {
    class: 'attributes' | 'origins',
    field: string
}
type stateArr = Array<comp>;

export default function CharacterOriginPast () {
    const [past, setPast] = useState('');
    const [personality, setPersonality] = useState('');
    const [binary, setBinary] = useState(0);
    const nav = useNavigate();
    const storeFields : stateArr  = [{'class' : 'attributes', 'field' : 'personality'}, {'class' : 'origins', 'field' : 'past'}]

    function resetBinary() {
        setBinary(0);
    }

    function setBinaryChild(){
        setBinary(1);
    }


    useEffect(() => {
        // If Store has value
        let storePast = store.getState().char.origins.past;
        let storePersonality = store.getState().char.attributes.personality;
        if (storePast !== '' || null)
        setPast(storePast);

        if (storePersonality !== '' || null)
        setPersonality(storePersonality);
    }, [])



    return (
        <>
            <div className='container-div-past'>
                <Box className='flex flex-col'>
                    {/* The images and textareas */}
                    <Box className='flex flex-row mt-40'>
                        <img src='/past2gif.gif' width={400} height={200} className='m-auto mr-8 grid rounded-md' />                
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
                            <Typography level='h3' className=''> What is your story? </Typography>

                            <Textarea
                            placeholder="Type in here…"
                            value={past}
                            onChange={(event) => {
                                setPast(event.target.value);
                                StoreCharText('/origins/past', event.target.value);
                            
                            }}
                            minRows={2}
                            maxRows={4}
                            startDecorator = {
                                <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
                                    <Hint props = 'past' />
                                </Box>
                            }
                            endDecorator = {
                                <Typography level="body-xs" sx={{ ml: 'auto' }}>
                                {past.length} character(s)
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
                            <Typography level='h3' className=''> What makes you, You? </Typography>

                            <Textarea
                            placeholder="Type in here…"
                            value={personality}
                            onChange={(event) => {
                                setPersonality(event.target.value);
                                StoreCharText('/attributes/personality', event.target.value);
                                
                            }}
                            minRows={2}
                            maxRows={4}
                            startDecorator =  
                            {
                                <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
                                    <Hint props = 'personality' />
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
                    </Box>
                    
                    <Box className='mt-28'>
                        <div className='arrow-container'>
                            <Button onClick = {() => GoBack('/characters/creation/origins', nav)} className='' sx={{ outline: 'none !important'}} variant='soft'>
                                <ArrowBackIcon />
                            </Button>
                            <Button onClick={() => StateValidator(nav, [resetBinary, setBinaryChild], storeFields, '/characters/creation/origins/features')} className='' sx={{ outline: 'none !important'}} variant='soft'>
                                <ArrowForwardIcon />
                            </Button>
                        </div>
                    </Box>
                </Box>
                    

                { NavigationValidator(binary, resetBinary) }
            </div>            
        </>
    )
}