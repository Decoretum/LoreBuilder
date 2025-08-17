import { Box, Card, Grid, Typography } from "@mui/joy";
import { Link } from 'react-router-dom'
import { Sidebar } from "../../Components/Sidebar";
import store from '../../Redux/store'

export function Home () {
    // From DB, if user is not "logout", then login this user

    return (
        <>
            <div className='container-div-background'>
                <Box className='flex flex-col z-2'>
                    <Box className='mb-[15vh] ml-[6vw]'>
                        <Typography level='h1' sx = {{ backdropFilter: 'blur(3px)', width: '16vw' }}> LoreBuilder </Typography>
                    </Box>
                    <Box className='flex flex-row'>
                        <Link to='/characters' className='font-normal'>
                            <Card variant='soft'>
                                <img src='/priest.png' width={50} height={50} className='m-auto l-50% r-%50' />
                                <Typography level='body-md'> Build your Character </Typography>
                            </Card>
                        </Link>
                        
                        
                        <Card variant='outlined' className='ml-10'>
                            <img src='/feather.png' width={50} height={50} className='m-auto l-50% r-%50' />
                            <Typography level='body-md'> Personal Notes </Typography>
                        </Card>
                    </Box>

                </Box>
            </div>
        </>
    )
}