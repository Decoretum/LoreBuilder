import { Box, Button, Divider, Dropdown, Menu, MenuButton, MenuItem, Stack, ToggleButtonGroup, Typography } from "@mui/joy";
import { ClickAwayListener } from "@mui/material";
import React, { useCallback } from "react";
import { useState } from "react";
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
						<Stack direction={'row'} spacing={2}>
							<Button
								data-id="home"
								variant="soft"
								sx={{ 
									borderRadius: '1px',
									outline: 'none !important',
									width: 'fit-content',
									border: '1px solid',
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
						</Stack>
						<Dropdown 
							open={open && (buttonText == "news" || buttonText == "pixil-envelope_small.png")} 
							onOpenChange={handleOpenChange} 					
						>	
							<Stack direction={'row'}>
								<MenuButton
									aria-controls={'composition-menu'}
									data-id="news"
									variant="soft"
									sx={{ 
										borderRadius: '1px',
										outline: 'none !important',
										width: 'fit-content',
										border: '1px solid',
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
								</MenuButton>
								<Menu
									id="composition-menu"
									>
									<MenuItem>New</MenuItem>
									<MenuItem>My account</MenuItem>
									<MenuItem>Logout</MenuItem>
								</Menu>
							</Stack>
						</Dropdown>
					</ToggleButtonGroup>
					<ToggleButtonGroup>
						<Dropdown 
							open={open && (buttonText == "chars" || buttonText == "pixil-firstman.png")} 
							onOpenChange={handleOpenChange} 					
						>
							<Stack direction={'row'}>
								<MenuButton
									aria-controls={'character-menu'}
									data-id="chars"
									variant="soft"
									sx={{ 
										borderRadius: '1px',
										maxWidth: 'fit-content',
										outline: 'none !important',
										border: '1px solid',
										height: '6vh',
										fontFamily: 'PixelFont'
									}}
								>
										Characters
										<img onClick={() => handleOpenChange} src='../assets/gaelmade/pixil-firstman.png'/>
								</MenuButton>
								<Menu
									id="character-menu"
									>
									<MenuItem>New</MenuItem>
									<MenuItem>Browse Characters</MenuItem>
								</Menu>
							</Stack>
						</Dropdown>
					</ToggleButtonGroup>
					<ToggleButtonGroup>
						<Dropdown open={open && buttonText == "account"} onOpenChange={handleOpenChange}>
							<MenuButton
								data-id="account"
								variant="soft"
								sx={{ 
									borderRadius: '1px',
									maxWidth: 'fit-content',
									outline: 'none !important' ,
									border: '1px solid',
									height: '6vh',
									fontFamily: 'PixelFont'
								}}
								>
									Account
							</MenuButton>
							<Menu>
								<MenuItem>Profile</MenuItem>
								<MenuItem>My account</MenuItem>
								<MenuItem>Logout</MenuItem>
							</Menu>
						</Dropdown>
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