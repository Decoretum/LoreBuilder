import { Box, Button, Stack, ToggleButtonGroup, Typography } from "@mui/joy";
import { ClickAwayListener } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { instance } from "../../Services/AxiosInstance";
import { AccountHome } from "../../Types/HomeTypes";


export function Home () {
	const [user, setUser] = useState<AccountHome>();
	// const handleOpenChange = useCallback(
    // (event: React.SyntheticEvent | null, isOpen: boolean) => {
	// 	type target = {
	// 		currentSrc : string | undefined,
	// 		dataset : { id: string }
	// 	}
	// 	const target : target = event?.target;
	// 	let img = undefined;
	// 	if (target.currentSrc !== undefined)
	// 	img = (target.currentSrc as string).split("/")[(target.currentSrc as string).split("/").length - 1];

	// 	if (img === undefined) setButtonText(target.dataset.id);
	// 	else setButtonText(img);

	// 	setOpen(isOpen);
	// 	setElRef(target);
	// 	console.log(isOpen)
	// },[]);

	useEffect(() => {
		// Obtain logged-in user
		let acc : AccountHome;
		const request = instance.get(
			"/api/AccountController/RetrieveAccount"
		);
		request.then((data) => {
			acc = data.data;
			setUser(acc);
			console.log(acc)
		});
	}, []);

    // From DB, if user is not "logout", then login this user
    function MenuBlock(props : any) : JSX.Element {
		console.log("Rendering MenuBlock() with props: " + props)
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
										src='../assets/gaelmade/pixil-firstman.png'
										className='max-h-[70%] max-w-[90%] ml-[2%]'
									/>								
								</Button>	
								<div className='dropdown-content bg-[#FFF6DA]'
									id="character-menu"
									>
									<Link to={'/characters/creation/origins'}>New</Link>
									<Link to={'/characters'}>Browse</Link>
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
										src='../gear.png'
										className='max-h-[70%] max-w-[90%] ml-[8%]'
									/>								
								</Button>	
								<div className='dropdown-content bg-[#FFF6DA]'
									id="character-menu"
									>
									<Link to={'/'}>Settings & Information</Link>
									<Link to={'/login'}>{ user?.username == null ? "Register / Login" : "Profile" }</Link>
								</div>
							</Stack>
						</Stack>
					</ToggleButtonGroup> 
				</Stack>
            </>
	)
    }

	function BodyBlock() : JSX.Element {
		console.log("Rendering BodyBlock()");
		const [color, setColor] = useState('#C2441C')
		return (
			<Stack direction={'column'} className='flex overflow-y-auto border mt-[5%] p-8 bg-[#fae5ac] max-h-80 gap-8'>
				<Box className='flex justify-start'>
					<Typography level="h2" sx={{fontFamily: 'PixelFont'}}>
						Welcome to Lorebuilder!
					</Typography>
				</Box>
				<Box className='flex justify-start'>
					<Typography level="h3" sx={{fontFamily: 'PixelFont'}}>
						Getting Started
					</Typography>
				</Box>
				<Box className='flex text-left'>
					<Typography level="body-lg" sx={{fontFamily: 'PixelFont'}}>
						Before anything else, please make sure you've read the &nbsp; 
						<a style={{ color: color }} href='https://github.com/Decoretum/Lorebuilder' target='_blank' onMouseLeave={() => setColor('#C2441C')} onMouseOver={() => {setColor('#852E47')}}>
							Github documentation 
						</a> 
						&nbsp; for the technical requirements and starting up of the application. 
					</Typography>
				</Box>
				<Box className='flex text-left'>
					<Typography level="h4" sx={{fontFamily: 'PixelFont'}}>
						Creating an Account
					</Typography>
				</Box>
				<Box className='flex text-left'>
					<Typography level="body-lg" sx={{fontFamily: 'PixelFont'}}>
						Create an account to store your data within the application's local database. Your credentials will remain exclusively <b>yours</b>, so
						it cannot be accessed by other users of this application. 
					</Typography>
				</Box>
				<Box className='flex text-left'>
					<Typography level="body-lg" sx={{fontFamily: 'PixelFont'}}>
						After creating an account, login to that account with the credentials you used. After logging in, the application will maintain your session.
						If you exit the application while logged in, the application will persist the authentication. This means that you will automatically be authenticated the next time you open the application.
					</Typography>
				</Box>
				<Box className='flex text-left'>
					<Typography level="h4" sx={{fontFamily: 'PixelFont'}}>
						Character Creation
					</Typography>
				</Box>
				<Box className='flex text-left'>
					<Typography level="body-lg" sx={{fontFamily: 'PixelFont'}}>
						After logging in, browse to the menu and hover over the <b>Characters</b> button to start creating your character
					</Typography>
				</Box>
			</Stack>
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
                    <MenuBlock props = {{A: 1, B: "test"}} />
					<BodyBlock />
                </Box>
            </div>	
        </>
    )
}