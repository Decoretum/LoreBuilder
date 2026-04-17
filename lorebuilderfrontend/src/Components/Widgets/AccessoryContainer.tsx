import { Box, Card } from "@mui/joy";
import { accessoryType } from "../../Redux/character/charReducer";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useEffect, useState } from "react";

type propsType = {
    map : accessoryType,
    pointer: string,
    pointerFunction: Function
}

type AdditionalBoxPropsType = {
    map: Map<number, boolean>,
    setClicked: Function,
    id: number,
    pointerFunction: Function
}

function handleClick (id: number, pointerFunction: Function, map: Map<number, boolean>, setClicked: Function) {
    console.log(map)
    if (id == 0) {
        pointerFunction("armor/accessory/new");
        map.forEach((kvp) => {
            console.log(kvp)
        })
        
    }
}

function AdditionalBox(props: AdditionalBoxPropsType) {
    useEffect(() => {

    }, [props.map])
    console.log(props.map)
    return (
        <Box className='cursor-pointer' data-id={props.id} 
        onClick={
            (event) => handleClick(
                Number(event.currentTarget.dataset.id), 
                props.pointerFunction,
                props.map,
                props.setClicked
            )
        }>
        <Card variant='soft' color='success' sx={{ }}>
            Add One
            <Box>
                <ControlPointIcon />
            </Box>
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
                { props.map.size == 0 ? (
                    <AdditionalBox map={hm} clicked={clicked} setClicked={setClicked} id={0} pointerFunction={props.pointerFunction} />
            ) : (
                    <></>
                ) }
            
        </Box>
    )
}