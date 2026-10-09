import { Box, Card, Grid, Typography } from "@mui/joy";
import { Link } from 'react-router-dom'

export function Home () {
    // From DB, if user is not "logout", then login this user

    return (
        <>
            <div className='container-div-background'>
                <Box className='flex flex-col z-2'>
                    <Box className='flex mb-[10vh] w-full items-center justify-center'>
                        <Box>
                            <Typography level='h1' sx = {{ backdropFilter: 'blur(3px)', width: '16vw', fontFamily: 'PixelFont' }}> LoreBuilder </Typography>
                        </Box>
                    </Box>
                    <Box className='flex flex-row gap-8'>
                        <Link to='/characters' className='font-normal'>
                            <Card variant='soft' className='w-full flex'>
                                <img src='./priest.png' width={50} height={50} className='m-auto l-50% r-%50' />
                                <Box className='w-full'>
                                    <Typography level='body-md' sx= {{fontFamily: 'PixelFont'}}> Build your Character </Typography>
                                </Box>
                            </Card>
                        </Link>
                        
                        <Card variant='outlined'>
                            <img src='./feather.png' width={50} height={50} className='m-auto l-50% r-%50' />
                            <Typography level='body-md' sx= {{fontFamily: 'PixelFont'}}> Personal Notes </Typography>
                        </Card>
                    </Box>
                </Box>
            </div>
        </>
    )
}