import { Box, Button, Divider, Dropdown, Menu, MenuButton, MenuItem, Stack, ToggleButtonGroup, Typography } from "@mui/joy";
import { ClickAwayListener } from "@mui/material";
import React, { useCallback } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

export function Home () {
	const [elRef, setElRef] = useState<React.ReactHTMLElement<HTMLElement> | null>(null);
	const [buttonText, setButtonText] = useState("");

	const [open, setOpen] = useState(false);

	const handleOpenChange = useCallback(
    (event: React.SyntheticEvent | null, isOpen: boolean) => {
		type target = {
			currentSrc : string | undefined,
			dataset : { id: string }
		}
		const target : target = event?.target;
		let img = undefined;
		if (target.currentSrc !== undefined)
		img = (target.currentSrc as string).split("/")[(target.currentSrc as string).split("/").length - 1];

		if (img === undefined) setButtonText(target.dataset.id);
		else setButtonText(img);

		setOpen(isOpen);
		setElRef(target);
		console.log(isOpen)
	},[]);

// 	const handleListKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
//     if (event.key === 'Tab') {
//       setOpen(false);
//     } else if (event.key === 'Escape') {
//       buttonRef.current!.focus();
//       setOpen(false);
//     }
//   };

    // From DB, if user is not "logout", then login this user
    function MenuBlock(props) : JSX.Element {
		console.log(props)
        return (
            <>
				<Stack	
					direction={"row"}	
					className='justify-center items-start'
				>
					<ToggleButtonGroup>
						<Stack direction={'row'}>
							<Button
								data-id="home"
								variant="soft"
								sx={{ 
									borderRadius: '1px',
									outline: 'none !important',
									width: 'fit-content',
									borderRight: '1px solid',
									height: '6vh',
									fontFamily: 'PixelFont'
								}}
							>
								Home
								<img 
									onClick={() => {}}
									src='../assets/gaelmade/pixil-house.png'
									className='max-h-[100%] max-w-[100%]'
								/>								
							</Button>
							<Stack className='dropdown'>
								<Button
									aria-controls={'composition-menu'}
									data-id="news"
									variant="soft"
									sx={{ 
										borderRadius: '1px',
										outline: 'none !important',
										width: 'fit-content',
										borderRight: '1px solid',
										height: '6vh',
										fontFamily: 'PixelFont'
									}}
								>
									News
									<img 
										onClick={() => handleOpenChange}
										src='../assets/gaelmade/pixil-envelope_small.png'
										className='max-h-[60%] max-w-[80%] ml-[12%]'
									/>								
								</Button>	
								<div className='dropdown-content bg-[#FFF6DA]'
									id="composition-menu"
									>
									<Link to={'/'}>New</Link>
									<Link to={'/'}>Account</Link>
									<Link to={'/'}>Logout</Link>
								</div>
							</Stack>
							<Stack className='dropdown'>
								<Button
									aria-controls={'composition-menu'}
									data-id="news"
									variant="soft"
									sx={{ 
										borderRadius: '1px',
										outline: 'none !important',
										width: 'fit-content',
										borderRight: '1px solid',
										height: '6vh',
										fontFamily: 'PixelFont',
									}}
								>
									<Typography sx={{fontFamily: 'PixelFont', marginLeft: '8%'}} level="inherit">Characters</Typography>
									<img 
										onClick={() => handleOpenChange}
										src='../assets/gaelmade/pixil-firstman.png'
										className='max-h-[70%] max-w-[90%] ml-[2%]'
									/>								
								</Button>	
								<div className='dropdown-content bg-[#FFF6DA]'
									id="character-menu"
									>
									<Link to={'/'}>New</Link>
									<Link to={'/'}>Browse</Link>
								</div>
							</Stack>
							<Stack className='dropdown'>
								<Button
									aria-controls={'composition-menu'}
									data-id="news"
									variant="soft"
									sx={{ 
										borderRadius: '1px',
										outline: 'none !important',
										width: 'fit-content',
										height: '6vh',
										fontFamily: 'PixelFont'
									}}
								>
									Account
									<img 
										onClick={() => handleOpenChange}
										src='../assets/gaelmade/pixil-firstman.png'
										className='max-h-[70%] max-w-[90%] ml-[8%]'
									/>								
								</Button>	
								<div className='dropdown-content bg-[#FFF6DA]'
									id="character-menu"
									>
									<Link to={'/'}>Settings & Information</Link>
									<Link to={'/'}>Logout</Link>
								</div>
							</Stack>
						</Stack>
					</ToggleButtonGroup> 
				</Stack>
            </>
        )
    }

	function BodyBlock() : JSX.Element {
		return (
			<Box className='flex flex-col overflow-y-auto border mt-[5%] p-8'>
				<Typography level="body-lg" sx={{ fontFamily: 'PixelFont' }}>Hi! This is GaelHi! This is GaelHi! This is GaelHi! This is GaelHi! This is GaelHi! This is GaelHi! This is GaelHi! This is GaelHi! This is GaelHi! This is Gael</Typography>
			</Box>
		)
	}

    return (
        <>
            <div className='container-div-background'>
                <Box className='flex flex-col z-2 max-w-[30%]'>
                    <Box className='flex mb-[10vh] w-full items-center justify-center'>
                        <Box>
                            <Typography level='h1' sx = {{ backdropFilter: 'blur(3px)', width: '16vw', fontFamily: 'PixelFont' }}> LoreBuilder </Typography>
                        </Box>
                    </Box>
                    <MenuBlock props={{A: 1, B: "test"}} />
					<BodyBlock />
                </Box>
            </div>
        </>
    )
}