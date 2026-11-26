import Background from '../assets/vg.jpeg';
import { Alert, Card, IconButton, Typography } from '@mui/joy';
import Input from '@mui/joy/Input';
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import { JSX, useEffect, useState } from 'react';
import { authentication } from '../../Controllers/Authentication';
import { Link } from 'react-router-dom';
import Hint from '../../Components/Hint';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';
import SuccessIcon from '@mui/icons-material/CheckCircle';



function LoginBlock ({username, password, setUsername, setPassword, onSubmit, setIsLogin} 
    : {username: string, password: string, setUsername: (text: string) => void, setPassword: (text: string) => void, onSubmit: () => void, setIsLogin: (b : boolean) => void}
    ) : JSX.Element
{
    return (
            <Card variant={'soft'} sx={{backgroundColor: '#F3E7D1'}} className="relative flex flex-col justify-center">
                <Typography level='title-lg' sx={{ fontFamily: 'PixelFont'}}> Sign up </Typography> 
                <Stack direction='column' gap={1} className='flex justify-center' spacing={2}>
                    <Typography level='body-md font-[PixelFont]' className='w-20'> Username </Typography> 
                    <Input placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />

                    <Typography level='body-md font-[PixelFont]' className='w-20'> Password </Typography> 
                    <Input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                    <Box className='flex flex-col gap-4 items-center'>
                        <Button sx={{ fontFamily: 'PixelFont', maxWidth: '50%', outline: 'none !important' }} onClick={() => onSubmit()} color='success'> Login </Button>
                        <Box>
                            <Typography level='body-md' sx={{ fontFamily: 'PixelFont'}}> No account? &nbsp;<span className='betterlink' onClick={() => {setIsLogin(false)}}>Create One</span> </Typography>
                        </Box>
                    </Box>
                </Stack>
            </Card>
    )
}

function RegisterBlock({username, password, setUsername, setPassword, setDateOfBirth, setIsLogin, onSubmit} 
    : {username: string, password: string, setUsername: (text: string) => void, setPassword: (text: string) => void, setDateOfBirth: (text: string) => void, setIsLogin: (b: boolean) => void, onSubmit: () => void}
    )
{
    return (
                <Card variant={'soft'} sx={{backgroundColor: '#F3E7D1'}} className="relative flex flex-col justify-center">
                    <Typography level='title-lg' sx={{ fontFamily: 'PixelFont', marginTop: '4%'}}> Create an Account </Typography> 
                    <Stack direction='column' gap={1} className='flex justify-center mt-[3%] p-[20px]' spacing={4}>
                        <Stack direction='column' spacing={4} className='flex items-center'>
                            <Stack direction='row' className='items-center max-w-[89%]' spacing={2}>
                                <Typography level='body-md font-[PixelFont]' className='w-20'> Username </Typography> 
                                <Input placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} endDecorator={<Hint props='register'/>} />
                            </Stack>
                            <Stack direction='row' className='items-center max-w-[95%]' spacing={2}>
                                <Typography level='body-md font-[PixelFont]' className='w-20'> Password </Typography> 
                                <Input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Stack>
                        </Stack>
                        <Stack direction='column' spacing={6} className=''>
                            <Stack direction='row' spacing={2}>
                                <Typography level='body-md font-[PixelFont]' className='w-20'> Date of Birth </Typography> 
                                <Input 
                                    className='max-w-[70%] max-h-[40%]'
                                    type='datetime-local' 
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                />
                            </Stack>
                            <Stack direction='column' className='flex items-center' spacing={2}>
                                <Button sx={{ fontFamily: 'PixelFont', maxWidth: '50%', outline: 'none !important' }} onClick={() => onSubmit()} color='success'> Create Account </Button>
                                <Typography level='body-md' sx={{ fontFamily: 'PixelFont', whiteSpace: 'pre'}}>
                                    Already have an account?&#10;
                                    <span className='betterlink' onClick={() => {setIsLogin(true)}}>  
                                        Login
                                    </span> 
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Card>
    )
}

export function Login () {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isLogin, setIsLogin ] = useState(true);
    const [ dateOfBirth, setDateOfBirth ] = useState('');
    const { register, login, getUserData } = authentication(username, password, dateOfBirth);

    // Alert States
    const [alertObject, setAlertObject] = useState({alertText: "", alertIcon: <></>, alertColor: "", alertCss: "hidden flex width-full"});
    
    const onSubmit = async () => {
        if (isLogin) login();
        else {
            const result : object = await register();
            if (result.hasOwnProperty('Success'))
            {
                setAlertObject({
                    ...alertObject,
                    alertIcon: <SuccessIcon />,
                    alertColor: "success",
                    alertText: Object.keys(result)[0] as string,
                    alertCss: "flex width-full"
                })
                setIsLogin(true);
                openAlert();
            }
            else
            {
                setAlertObject({
                    ...alertObject,
                    alertIcon: <WarningIcon />,
                    alertColor: "danger",
                    alertText: Object.keys(result)[0] as string,
                    alertCss: "flex width-full"
                })
                openAlert();
            }
        }
    }

    function openAlert() {
        const alert = document.getElementById("alertfade");
        alert!.classList.toggle("fadeOutAlt");
    }

    useEffect(() => {
        setUsername("");
        setPassword("");
    }, [isLogin]);

    return (
        <div className='container-div-background'>
            { isLogin 
                ? <LoginBlock 
                    key="loginblock" 
                    user={username}
                    password={password}
                    setUsername={setUsername} 
                    setPassword={setPassword} 
                    onSubmit={onSubmit}
                    setIsLogin={setIsLogin}
                    /> 
                : <RegisterBlock
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    setDateOfBirth={setDateOfBirth}
                    setIsLogin={setIsLogin}
                    onSubmit={onSubmit}
                    />
            }
                <Box className={`absolute bottom-14 ${alert}`}>
                    <Alert 
                        id="alertfade"
                        startDecorator={alertObject.alertIcon}
                        variant='soft' 
                        color={alertObject.alertColor}
                        className='alert fadeOut'
                        onAnimationEnd={() => setAlertObject({...alertObject, alertCss: "hidden"})}
                        endDecorator={ alertObject.alertColor !== "success" ? 
                            <IconButton onClick={() => setAlertObject({...alertObject, alertCss: "hidden"})}>
                                {alertObject.alertIcon}
                            </IconButton>
                            : <></>
                        }
                    >
                        {alertObject.alertText}
                    </Alert>
                </Box> 
        </div>

            
    );
}