import { Box, Card, Typography } from "@mui/joy";
import { accessoryType } from "../../Redux/character/charReducer";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useEffect, useState } from "react";

type propsType = {
    map : accessoryType,
    setMap: Function,
    pointer: string,
    pointerFunction: Function,
}

type AdditionalBoxPropsType = {
    map: Map<number, boolean>,
    pointer: string,
    setClicked: Function,
    id: number,
    pointerFunction: Function
}

type AccessoryContainerPropsType = {
    id: number,
    name: string,
    imgPath: string,
    pointer: string,
    pointerFunction: Function
}

function handleClick (id: number, pointerFunction: Function, map: Map<number, boolean>, setClicked: Function, pointer: string) {
    console.log(map)
    if (id == 0) {
        if (pointer == "armor/accessory/new") pointerFunction("armor/accessory");
        else pointerFunction("armor/accessory/new");
        map.forEach((kvp) => {
            console.log(kvp) 
        })
        
    }
}

function Container(props: AccessoryContainerPropsType){
    const [toggled, setToggled] = useState(false);
    return (
        <Box className='cursor-pointer' data-id={props.id} 
        onClick={
            (event) => {
                // handleClick (
                // Number(event.currentTarget.dataset.id), 
                // props.pointerFunction,
                // props.map,
                // props.setClicked,
                // props.pointer)
                // setToggled(!toggled);
                }
        }>
            <Card variant='soft' color='success'>
                <Box className='flex flex-col gap-2 rounded-lg'>
                    <Box>
                        <Box className='bg-[#ADCAD6] rounded-lg'>
                            <Typography variant='plain'>{props.name}</Typography>
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
    const [toggled, setToggled] = useState(false);
    useEffect(() => {

    }, [props.map, toggled])
    console.log(props.map)
        return (
            <Box className='cursor-pointer min-w-[8vw]' data-id={props.id} 
            onClick={
                (event) => {
                    handleClick (
                    Number(event.currentTarget.dataset.id), 
                    props.pointerFunction,
                    props.map,
                    props.setClicked,
                    props.pointer)
                    setToggled(!toggled);
                    }
            
            }>
                <Card variant='soft' color='success' sx={{ }}>
                    { !toggled ? (
                        <Box>
                            Add One
                            <Box>
                                <ControlPointIcon />
                            </Box>
                        </Box>
                    ) : (
                        <Box>In Progress</Box>
                    ) }
                </Card>
        </Box>
    )
}

export function AccessoryContainer(props : propsType) {
    console.log(props)
    var hm= props.map;
    const [clicked, setClicked] = useState<Map<number, boolean>>(new Map<0, false>);
    return (
        <Box className="flex flex-row items-center rounded-lg p-10 overflow-x-auto gap-10 backdrop-blur-sm w-[50vw] min-h-[40vh] max-h-[40vh]"> 
            { 
               [...props.map].map(([key, value], id) => (
                    <Container id={id} name={key} imgPath={value[1]} pointer={props.pointer} pointerFunction={props.pointerFunction} />
                ))
            }                
                
            <AdditionalBox map={hm} clicked={clicked} setClicked={setClicked} id={0} pointer={props.pointer} pointerFunction={props.pointerFunction} />

        </Box>
    )
}