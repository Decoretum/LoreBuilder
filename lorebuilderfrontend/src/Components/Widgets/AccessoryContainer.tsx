import { Alert, Box, Card, Modal, ModalClose, Sheet, Typography } from "@mui/joy";
import { accessoryType } from "../../Redux/character/charReducer";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from "react";
import React from "react";

type propsType = {
    map : accessoryType,
    setMap: Function,
    pointer: string,
    openAlert: Function,
    pointerFunction: Function,
    saveNewAccessory: Function
}

type AdditionalBoxPropsType = {
    setModalText: Function,
    toggleArray: Array<boolean | Function>,
    setModalOpen: Function,
    map: Map<number, boolean>,
    pointer: string,
    setClicked: Function,
    id: number,
    pointerFunction: Function,
    saveNewAccessory: Function
}

type AccessoryContainerPropsType = {
    id: number,
    name: string,
    imgPath: string,
    pointer: string,
    pointerFunction: Function
}

function handleClick (id: number, pointerFunction: Function, map: Map<number, boolean>, setClicked: Function, pointer: string) {
    if (id == 0) {
        if (pointer == "armor/accessory/new") pointerFunction("armor/accessory");
        else pointerFunction("armor/accessory/new");
        // map.forEach((kvp) => {
        //     console.log(kvp) 
        // })
        
    }
}

function Container(props: AccessoryContainerPropsType){
    return (
        <Box className='cursor-pointer' data-id={props.id}>
            <Card variant='soft' color='success'>
                <Box className='flex flex-col gap-2 rounded-lg w-full h-full'>
                    <Box>
                        <Box className='bg-[#ADCAD6] rounded-lg p-2'>
                            <Typography 
                            className='overflow-x-auto'
                            variant='plain' 
                            sx ={{ 
                                fontFamily: 'PixelFont', 
                                fontSize: 13.5,
                                }}>
                                {props.name} the greatest knightLoverSlayer in the kingdom of astria where no failt will </Typography>
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
    console.log(props)
    useEffect(() => {

    }, [props.map, toggled])
        return (
            <Box className='min-w-[8vw]' data-id={props.id}>
                <Card variant='soft' color='success' sx={{ }}>
                    { !toggled ? (
                        <Box className='font-PixelFont'>
                            Add One
                            <Box                                
                            onClick={(event) => {
                            handleClick (
                                Number(event.currentTarget.parentElement?.parentElement?.parentElement!.dataset.id), 
                                props.pointerFunction,
                                props.map,
                                props.setClicked,
                                props.pointer 
                            );
                                    setToggled(!toggled);
                                }}>
                            <ControlPointIcon 
                                className='cursor-pointer' 
                            />
                            </Box>
                        </Box>
                    ) : (
                        <Box className='flex flex-col gap-2'>
                            <Box className='font-PixelFont'>
                                In Progress
                            </Box>
                            <Box className='flex flex-row gap-4 justify-center'>
                                <Box className='cursor-pointer'
                                    onClick={() => {
                                        setModalText("Are you sure you want to set your accessory?");
                                        props.setModalOpen(true);
                                    }}
                                    >
                                    <CheckCircleIcon color="primary" />
                                </Box>
                                <Box className='cursor-pointer' 
                                onClick={(event) => {
                                    // handleClick (
                                    //     Number(event.currentTarget.parentElement?.parentElement?.parentElement?.parentElement!.dataset.id), 
                                    //     props.pointerFunction,
                                    //     props.map,
                                    //     props.setClicked,
                                    //     props.pointer
                                    // );
                                    // setToggled(!toggled);
                                    setModalText("Are you sure you want to discard your accessory?");
                                    props.setModalOpen(true);
                                    }
                                }> 
                                    <CancelIcon color='action' />
                                </Box>
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
    const [clicked, setClicked] = useState<Map<number, boolean>>(new Map<0, false>);
    const [modalOpen, setModalOpen] = useState(false);
    const [toggled, setToggled] = useState(false);
    const [modalText, setModalText] = useState("");
    const prompt = "The Accessory name and/or description may be invalid";
    useEffect(() => {

    });
    return (
        <Box className="grid grid-cols-4 gap-4 items-center rounded-lg p-10 overflow-y-auto backdrop-blur-sm w-[50vw] min-h-[40vh] max-h-[40vh]"> 
            { 
               [...props.map].map(([key, value], id) => (
                    <Container id={id} key={key} name={value[0]} imgPath={value[1]} pointer={props.pointer} pointerFunction={props.pointerFunction} />
                ))
            }                
            
            <AdditionalBox setModalText={setModalText} toggleArray={[toggled, setToggled]} setModalOpen={setModalOpen} saveNewAccessory={props.saveNewAccessory} map={hm} clicked={clicked} setClicked={setClicked} id={0} pointer={props.pointer} pointerFunction={props.pointerFunction} />
            <Modal 
                open={modalOpen} 
                onClose={() => setModalOpen(false)}
                className='flex flex-col justify-center items-center'
            >
                <Sheet variant='soft' className='flex flex-col items-center min-w-[20vw] max-w-[20vw] p-5 rounded-lg'>
                    <Sheet variant='soft' className='m-auto p-3'>
                        <Typography> {modalText} </Typography>
                    </Sheet>
                    <Sheet className='flex flex-row gap-9 justify-center mt-[1vh]' variant='soft'>
                        <Sheet className='cursor-pointer' variant='soft' onClick={() => {
                            if (modalText == "Are you sure you want to set your accessory?") {
                                var bool : boolean = props.saveNewAccessory();
                                if (bool) {
                                    setToggled(!toggled);
                                    props.pointerFunction("armor/accessory");
                                } else {
                                    openAlert("One more of the fields have invalid input");
                                }
                            } else {
                                setToggled(!toggled);
                                props.pointerFunction("armor/accessory");
                            }
                            setModalOpen(false);
                        }}>
                            <CheckCircleIcon />
                        </Sheet>
                        <Sheet className='cursor-pointer' variant='soft' onClick={() => setModalOpen(false)}>
                            <CancelIcon />
                        </Sheet>
                    </Sheet>
                </Sheet>
            </Modal>

        </Box>
    )
}