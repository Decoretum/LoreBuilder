import Background from '../assets/vg.jpeg';
import { Card, Typography } from '@mui/joy';
import Input from '@mui/joy/Input';
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import { JSX, useEffect, useState } from 'react';
import { authentication } from '../../Controllers/Authentication';
import { Link } from 'react-router-dom';

function LoginBlock ({username, password, setUsername, setPassword, onSubmit} 
    : {username: string, password: string, setUsername: (text: string) => void, setPassword: (text: string) => void, onSubmit: () => void}) : JSX.Element
{
    return (
        <>
            <div className='container-div-background'>
                {/* <img src = "./vg.jpeg" width = {500} height = {300} className='fixed m-auto l-50% r-%50' /> */}
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
                                <Typography level='body-md' sx={{ fontFamily: 'PixelFont'}}> No account? &nbsp;<span className='betterlink '>Create One</span> </Typography>
                            </Box>
                        </Box>
                    </Stack>
                </Card>
            </div>
        </>
    )
}


export function Login () {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isLogin, setIsLogin ] = useState(true);
    const { login, getUserData } = authentication(username, password);
    const onSubmit = () => {
        login();
    }

    useEffect(() => {}, []);

    return (
        isLogin 
            ? <LoginBlock 
                key="loginblock" 
                user={username}
                password={password}
                setUsername={setUsername} 
                setPassword={setPassword} 
                onSubmit={onSubmit}
                /> 
            : <></>
    );
}