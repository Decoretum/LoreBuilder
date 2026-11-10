import { Box, Divider, Dropdown, Menu, MenuButton, MenuItem, Stack, ToggleButtonGroup, Typography } from "@mui/joy";
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
		let img = undefined;
		//@ts-expect-error: currentSrc is a string property of the event target
		if (event?.target.currentSrc !== undefined)
		img = (event?.target.currentSrc as string).split("/")[(event?.target.currentSrc as string).split("/").length - 1];

    	setOpen(isOpen);
		setElRef(event?.target);

		if (img === undefined) setButtonText(event?.target.dataset.id);
		else setButtonText(img);
	},
    [],
  );

// 	const handleListKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
//     if (event.key === 'Tab') {
//       setOpen(false);
//     } else if (event.key === 'Escape') {
//       buttonRef.current!.focus();
//       setOpen(false);
//     }
//   };

    // From DB, if user is not "logout", then login this user
    function MenuBlock() : JSX.Element {
        return (
            <>
				<Stack	
					direction={"row"}	
					className='justify-center items-start'
				>
					<ToggleButtonGroup>
						<Dropdown 
							open={open && (buttonText == "news" || buttonText == "pixil-envelope_small.png")} 
							onOpenChange={handleOpenChange} 					
						>	
							<Stack direction={'row'}>
								<MenuButton
									aria-controls={'composition-menu'}
									data-id="news"
									variant="soft"
									// endDecorator={
									// 	<img 
									// 		onClick={() => handleOpenChange}
									// 		src='../assets/gaelmade/pixil-envelope_small.png'
									// 		className='max-h-[10%] max-w-[30%]'
									// 	/>
									// }
									sx={{ 
										borderRadius: '1px',
										outline: 'none !important',
										width: 'fit-content',
										border: '1px solid',
										height: '6vh'
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
							open={open && buttonText == "chars"} 
							onOpenChange={handleOpenChange} 					
						>
							<MenuButton
								aria-controls={'composition-menu'}
								data-id="chars"
								variant="soft"
								endDecorator={<img onClick={() => handleOpenChange} src='../assets/gaelmade/pixil-firstman.png'/>}
								sx={{ 
									borderRadius: '1px',
									maxWidth: 'fit-content',
									outline: 'none !important',
									border: '1px solid',
									height: '6vh'
								}}
							>
									Characters
							</MenuButton>
							<Menu
								id="composition-menu"
								>
								<MenuItem>New</MenuItem>
								<MenuItem>My account</MenuItem>
								<MenuItem>Logout</MenuItem>
							</Menu>
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
									height: '6vh'
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
				{/* <Button 
					onClick={() => setOpen(true)}
					aria-controls={'composition-menu'}
					aria-haspopup={true}
					aria-expanded={open ? 'true' : undefined}
					>
						News
				</Button>
				<Popup
					id="composition-menu"
					open={open}
					role={undefined}
					anchorEl={buttonRef.current}
					disablePortal
					modifiers={[
						{
							name: 'offset',
							options: {
								offset: [0, 4],
							},
						},
					]}
					>
						<ClickAwayListener
							onClickAway={(event) => {
								if (event.target !== buttonRef.current) {
									handleClose();
								}
							}}>
								<MenuList
									variant="outlined"
									onKeyDown={handleListKeyDown}
									>
										<MenuItem>Text</MenuItem>
								</MenuList>								
						</ClickAwayListener>

				</Popup> */}
            </>
        )
    }

    return (
        <>
            <div className='container-div-background'>
                <Box className='flex flex-col z-2'>
                    <Box className='flex mb-[10vh] w-full items-center justify-center'>
                        <Box>
                            <Typography level='h1' sx = {{ backdropFilter: 'blur(3px)', width: '16vw', fontFamily: 'PixelFont' }}> LoreBuilder </Typography>
                        </Box>
                    </Box>
                    <MenuBlock />

                    {/* <Box className='flex flex-row gap-8'>
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
                    </Box> */}
                </Box>
            </div>
        </>
    )
}