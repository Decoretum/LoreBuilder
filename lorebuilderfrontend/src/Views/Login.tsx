import Background from '../assets/vg.jpeg';
import { Card, Typography } from '@mui/joy';
import Input from '@mui/joy/Input';
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import { useState } from 'react';
import { authentication } from '../Controllers/Authentication';



export function Login () {
    const [ user, setUser ] = useState('');
    const [ password, setPassword ] = useState('');
    
    const { login, getUserData } = authentication(user, password);
    const onSubmit = () => {
        login();
    }

    return (
        <>
            <div className='container-div'>
                <img src = "/vg.jpeg" width = {500} height = {300} className='fixed m-auto l-50% r-%50' />
                <Card variant={'soft'} className="relative">
                    <Typography level='title-lg'> Sign up </Typography> 
                    <Stack direction='column' spacing={2}>
                        <Typography level='body-md' className='w-20'> Username </Typography> 
                        <Input placeholder='Username' onChange={(e) => setUser(e.target.value)} />

                        <Typography level='body-md' className='w-20'> Password </Typography> 
                        <Input placeholder='Password' onChange={(e) => setPassword(e.target.value)} />

                        <Button onClick={() => onSubmit()}> Login </Button>

                        <Typography level='body-sm'> No account? </Typography>

                        <Button onClick={() => getUserData()}> Create Account </Button>
                    </Stack>
                </Card>
            </div>
        </>
    
          
      
    );
}