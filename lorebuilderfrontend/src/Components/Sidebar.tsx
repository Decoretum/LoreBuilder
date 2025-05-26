import Drawer from '@mui/joy/Drawer';
import Button from '@mui/joy/Button';
import { Box, Divider, Grid, List, ListItem, ListItemButton, Typography } from '@mui/joy';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Sidebar () {
    const [open, setOpen] = useState(false);
    const [key, setKey] = useState('')

    const hoverBgColor = '#F0F0F0';

    
    return (
        <>
            <div className='absolute ml-10 mt-10 font-normal text-blue'>
                <Button variant='soft' onMouseOver={() => setOpen(true)}>
                     Menu 
                </Button>
            </div>

        <Drawer open={open} 
        size='sm'
        variant='soft' 
        anchor='left' 
        onMouseLeave={() => setOpen(false)}
        onClose={() => setOpen(false)}
        >
            <Box role="presentation" className='p-5' sx = {{ flexGrow: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#4A5C4D' }}>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
                    <Link to='/' className='font-normal'>
                    <ListItem key={text} 
                    onMouseOver={() => setKey(text)}
                    onMouseLeave={() => setKey('')}
                    sx = {{backgroundColor: key === text ? '#5C6C60' : '#4A5C4D'}}>
                        <Typography variant='plain' level='body-md'>
                            <p className='text-gray-50'>
                            {text}
                            </p>
                        </Typography>
                    </ListItem>
                    </Link>
                    ))}
                </List>

            <Divider />

                <List>
                    {['All mail', 'Trash', 'Spam'].map((text) => (
                    <ListItem key={text}>
                        <ListItemButton>{text}</ListItemButton>
                    </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>

        </>
    )
}