import { Box, Card, IconButton, Modal, Sheet, Typography } from "@mui/joy";
import { accessoryType } from "../../Redux/character/charReducer";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from "react";

type propsType = {
    map : accessoryType,
    setMap: Function,
    pointer: string,
    modalText: string,
    openAlert: Function,
    pointerFunction: Function,
    saveAccessory: Function,
    deleteAccessory: Function,
    setAccessorySelected: Function,
    setToggled: Function,
    setModalOpen: Function,
    setModalText: Function,
    toggled: boolean,
    modalOpen: boolean
}

type AdditionalBoxPropsType = {
    setModalText: Function,
    toggleArray: Array<boolean | Function>,
    setModalOpen: Function,
    map: Map<number, boolean>,
    pointer: string,
    id: number,
    pointerFunction: Function,
    saveNewAccessory: Function
}

type AccessoryContainerPropsType = {
    clicked: string,
    setClicked: Function,
    id: string,
    name: string,
    imgPath: string,
    pointer: string,
    pointerFunction: Function,
    setAccessorySelected: Function,
    setModalOpen: Function,
    setToggled: Function,
    modalOpen: boolean,
    toggled: boolean
}

function handleClick (
    id: string | Number | undefined, 
    pointerFunction: Function, 
    pointer: string, 
    setClicked?: Function,
    clicked?: string,
    setAccessorySelected?: Function,
    toggled?: boolean,
    ) {

    console.log(pointer)
    console.log(id)
    console.log(toggled)
    console.log(clicked)
    
    if (setClicked != undefined) setClicked(id!);

    if (id == 0) {
        if (pointer == "armor/accessory/new") pointerFunction("armor/accessory");
        else pointerFunction("armor/accessory/new");
    } else {
        if (toggled) {
            console.log("Check your shit")
            return;
        } else {
            if ((pointer.split("/")[2] == "new" || pointer.split("/")[2] == "edit") && clicked == id) {
                console.log("unselect accessory")
                pointerFunction("armor/accessory");
                return;
            }
        }
        setAccessorySelected!([id]);
        pointerFunction("armor/accessory/edit");
    }
}

function Container(props: AccessoryContainerPropsType){
    return (
        <Box data-id={props.id}>
            <Card variant='soft' color='success'>
                <Box className='flex flex-col gap-2 rounded-lg w-full h-full'>
                    <Box>
                        <Box 
                        className='bg-[#ADCAD6] rounded-lg p-2 cursor-pointer'
                        onClick={() => {
                                // props.setAccessorySelected(props.id); 
                                handleClick(props.id, props.pointerFunction, props.pointer, props.setClicked, props.clicked, props.setAccessorySelected, props.toggled); 
                            }}>
                        
                            <Typography 
                            className=''
                            variant='plain' 
                            sx ={{ 
                                fontFamily: 'PixelFont', 
                                fontSize: 13.5,
                                overflowWrap: 'break-word'
                                }}>
                                {props.name} </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography>{props.imgPath}</Typography>
                    </Box>
                </Box>
            </Card>
        </Box>
)

}

function AdditionalBox(props: AdditionalBoxPropsType) {
    let toggled : boolean = props.toggleArray[0];
    let setToggled : Function = props.toggleArray[1];
    let setModalText : Function = props.setModalText;
    // useEffect(() => {

    // }, [props.map, toggled])
        return (
            <Box className='min-w-[8vw]' data-id={props.id}>
                <Card variant='soft' color='success' sx={{ }}>
                    { !toggled ? (
                        <Box className='font-PixelFont'>
                            Add One
                            <IconButton  
                            variant="soft"
                            color='success'                             
                            onClick={(event) => {
                            handleClick (
                                event.currentTarget.parentElement?.parentElement?.parentElement!.dataset.id, 
                                props.pointerFunction,
                                props.pointer
                            );
                                    setToggled(true);
                                }}>
                            <ControlPointIcon 
                                className='cursor-pointer' 
                            />
                            </IconButton>
                        </Box>
                    ) : (
                        <Box className='flex flex-col gap-2'>
                            <Box className='font-PixelFont'>
                                In Progress
                            </Box>
                            <Box className='flex flex-row gap-2 justify-center'>
                                <IconButton
                                    color='success'
                                    onClick={() => {
                                        setModalText("Are you sure you want to set your accessory?");
                                        props.setModalOpen(true);
                                    }}
                                    >
                                    <CheckCircleIcon color="primary" />
                                </IconButton>
                                <IconButton 
                                color='danger'
                                onClick={(event) => {
                                    setModalText("Are you sure you want to discard your accessory?");
                                    props.setModalOpen(true);
                                    }
                                }> 
                                    <CancelIcon color='action' />
                                </IconButton>
                            </Box>
                        </Box>
                    ) }
                </Card>
        </Box>
    )
}

export function AccessoryContainer(props : propsType) {
    var hm= props.map;
    var openAlert : Function = props.openAlert;
    const [clicked, setClicked] = useState("");
    const prompt = "The Accessory name and/or description may be invalid";
    const toggled = props.toggled;
    const setToggled = props.setToggled;
    const modalOpen = props.modalOpen;
    const setModalOpen = props.setModalOpen;
    const modalText = props.modalText;
    const setModalText = props.setModalText;
    useEffect(() => {

    });
    return (
        <Box className="grid grid-cols-4 gap-4 items-center rounded-lg p-10 overflow-y-auto backdrop-blur-sm w-[50vw] min-h-[40vh] max-h-[40vh]"> 
            { 
               [...props.map].map(([key, value], id) => (
                    <Container 
                        modalOpen={modalOpen} 
                        clicked={clicked} 
                        setClicked={setClicked} 
                        setModalOpen={setModalOpen} 
                        toggled={toggled} 
                        setToggled={setToggled} 
                        setAccessorySelected={props.setAccessorySelected} 
                        id={key} 
                        key={id} 
                        name={value[0]} 
                        imgPath={value[1]} 
                        pointer={props.pointer} 
                        pointerFunction={props.pointerFunction} 
                    />
                ))
            }                
            
            <AdditionalBox setModalText={setModalText} toggleArray={[toggled, setToggled]} setModalOpen={setModalOpen} saveNewAccessory={props.saveAccessory} map={hm} id={0} pointer={props.pointer} pointerFunction={props.pointerFunction} />
        </Box>
    )
}