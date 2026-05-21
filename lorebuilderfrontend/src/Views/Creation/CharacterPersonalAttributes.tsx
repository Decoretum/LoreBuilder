import { Box, Button, FormControl, FormLabel, Input, Textarea, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import store from '../../Redux/store.tsx'
import Hint from '../../Components/Hint.tsx'
import StoreCharText from '../../Controllers/StoreCharText.tsx'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigationValidator from "../../Components/NavigationValidator.tsx";
import GoBack from "../../Controllers/GoBack.tsx";
import StateValidator from "../../Controllers/StateValidator.tsx";
import EquipmentDictionary from "../../Services/EquipmentDictionary.tsx"
import{ equipmentObject } from "../../Controllers/StoreCharText.tsx"
import { AccessoryContainer } from "../../Components/Widgets/AccessoryContainer.tsx";
import AccessoryTest from "../../Test/AccessoryTest.tsx"

type comp  = {
    class: 'attributes' | 'origins',
    field: string
}
type stateArr = Array<comp>;

export default function CharacterPersonalAttributes () {
    const invText : string = "Click on Any of the Gear";
    const [binary, setBinary] = useState(0);
    const [pointer, setPointer] = useState('general');
    const [inventoryText, setInventoryText] = useState(invText);
    const [rightPaneHidden, setRightPaneHidden] = useState(true);
    const [equipmentType, setEquipmentType] = useState("");
    const [equipmentValue, setEquipmentValue] = useState<Array<string>>(["", ""]);

    // Accessory-related Components
    const [accessory, setAccessory] = useState<Map<string, Array<string>>>(new Map<"", ["","", ""]>);

    const [img, setImg] = useState("");
    const nav = useNavigate();
    const storeFields : stateArr  = [
        {'class' : 'attributes', 'field' : 'skills'}, 
        {'class' : 'attributes', 'field' : 'strength'}, 
        {'class': 'attributes', 'field' : 'magic'}
]

    function handleEquipmentChange(equipmentType: string, equipmentValue: Array<string>, uuid?: string) : equipmentObject {
        return {
            equipmentType: EquipmentDictionary().get(equipmentType)!,
            equipmentValue: uuid != null ? [uuid, equipmentValue[0], equipmentValue[1]] : 
            [equipmentValue[0], equipmentValue[1]]
        }
    }

    function saveNewAccessory() : boolean {
        console.log("Saved New Accessory");
        StoreCharText("/attributes/equipment", "", handleEquipmentChange(inventoryText, [equipmentValue[0], equipmentValue[1]], "none"));        
        setAccessory(prevMap => {
            const newMap = new Map(prevMap);

            // Fetch UUID
            const reduxMap : Map<string, string> = store.getState().char.attributes.equipment.accessories;
            let uuid = "";
            for (const key of reduxMap.keys()) {
                if (reduxMap.get(key)![0] == equipmentValue[0]) {
                    uuid = key;
                }
            } 
            newMap.set(uuid, [equipmentValue[0], equipmentValue[1], equipmentValue[2]]);
            return newMap;
        })
        setEquipmentValue([]);
        return true;
    }

    function handlePointerChange(accessoryPointer: string) {
        setPointer(accessoryPointer);
    }

    function clickImage (img: string) {
        switch(img){
            case "armor/helm":
                setPointer(img); 
                setInventoryText("Helmet");
                setImg(`/attributes/${img.substring(6)}.png`);
                var storeData = store.getState().char.attributes.equipment.headGear;
                setEquipmentType("headGear");
                setEquipmentValue([storeData[0], storeData[1]]);
                break;
            case "armor/leftarm":
                setPointer(img);
                setInventoryText("Left Armwear");
                setImg(`/attributes/glove.png`);
                var storeData = store.getState().char.attributes.equipment.leftArmGear;
                setEquipmentType("leftArmGear");
                setEquipmentValue([storeData[0], storeData[1]]);
                break;
            case "armor/rightarm":
                setPointer(img);
                setInventoryText("Right Armwear");
                setImg(`/attributes/glove.png`);
                var storeData = store.getState().char.attributes.equipment.rightArmGear;
                setEquipmentType("rightArmGear");
                setEquipmentValue([storeData[0], storeData[1]]);
                console.log(storeData)
                break;
            case "armor/backwear":
                setPointer("armor/backwear");
                setInventoryText("Backwear");
                setImg(`/attributes/${img.substring(6)}.png`);
                var storeData = store.getState().char.attributes.equipment.backGear;
                setEquipmentType("backGear");
                setEquipmentValue([storeData[0], storeData[1]]);
                break;
            case "armor/chest":
                setPointer("armor/chest");
                setInventoryText("Chestwear");
                setImg(`/attributes/${img.substring(6)}.png`);
                var storeData = store.getState().char.attributes.equipment.chestGear;
                //  setEquipment(oldEq => ({
                //     ...oldEq,
                //     headGear: ["Helmet Title", storeData]
                //  }));
                setEquipmentType("chestGear");
                setEquipmentValue([storeData[0], storeData[1]]);
                break;
            case "armor/leggings":
                setPointer("armor/leggings");
                setInventoryText("Legwear");
                setImg(`/attributes/${img.substring(6)}.png`);
                var storeData = store.getState().char.attributes.equipment.leggingGear;
                setEquipmentType("leggingGear");
                setEquipmentValue([storeData[0], storeData[1]]);
                break;
            case "armor/foot":
                setPointer("armor/foot");
                setInventoryText("Footwear");
                setImg(`/attributes/${img.substring(6)}.png`);
                var storeData = store.getState().char.attributes.equipment.footGear;
                setEquipmentType("footGear");
                setEquipmentValue([storeData[0], storeData[1]]);
                break;
            case "armor/ring":
                // Special Case
                // Left Pane: Show Container full of accessories
                // Retrieve images from FileSystem and store it within repo FS
                // var storeData = store.getState().char.attributes.equipment.accessories;
                setEquipmentValue([]);
                var testing = true;
                if (testing) {
                    var storeData : any = AccessoryTest();
                    var existingData = store.getState().char.attributes.equipment.accessories;
                    var merged: Map<string, string[]> = new Map([...storeData, ...existingData]);
                    setPointer("armor/accessory");
                    setInventoryText("Accessory");
                    setEquipmentType("accessories");
                    setAccessory(merged);
    
                    // Right Pane: 
                    setImg(`/attributes/${img.substring(6)}.png`);
                    console.log(merged);
                }
                break;
        }

    }
    function setLeftPane () {
        if (pointer === 'general') {
            return (

                <></>
            )
        }
    }

    function goBack() {
        if (pointer == "armor") {
            setInventoryText(invText);
            setPointer("general");
        }
        else if (pointer.indexOf("armor/") == 0) {
            setInventoryText(invText);
            setPointer("armor");
        }
    }

    function resetBinary() {
        setBinary(0);
    }

    function setBinaryChild(){
        setBinary(1);
    }


    useEffect(() => {
        // If Store has value
        // let storeSkills = store.getState().char.attributes.skills;
        // let storeStrength = store.getState().char.attributes.strength;
        // let storeMagic = store.getState().char.attributes.magic;

        // if (storeSkills !== '' || null)
        // setSkills(storeSkills);

        // if (storeStrength !== '' || null)
        // setStrength(storeStrength);

        // if (storeMagic !== '' || null)
        // setMagic(storeMagic);
    }, [])

    useEffect(() => {
        console.log(pointer)
        if (pointer.indexOf("armor/") != -1) {
            setRightPaneHidden(false);
        } else {
            setRightPaneHidden(true);
        }
        
    }, [pointer])



    return (
        <>
            <div className='container-div-personalattributes'>
                <Box className={`flex flex-row border border-solid ${rightPaneHidden ? "justify-center items-center" : ""}`}>
                
                    {/* Left Pane */}
                    <Box className='h-[100%] relative' hidden = {false}>
                        { pointer.indexOf('armor') != -1 ? 
                        (
                        <>
                            <Box className='flex flex-col items-center'>
                                <Box className='flex flex-row w-[40vw] h-[30vh] ml-[14vw] items-center'>
                                    <Button variant='soft' color='warning' onClick = {goBack} sx= {{outline: 'none !important'}}>
                                        <ArrowBackIcon />
                                    </Button>
                                    <img src='/attributes/backpack.png' width = {90} className='ml-[1vw]' />
                                    <Typography variant="plain" level='h2' 
                                    sx= {{ 
                                        marginLeft: '1vw', 
                                        color: 'brown', 
                                        backdropFilter: 'blur(2px)' 
                                        }}> 
                                        Inventory 
                                    </Typography>
                                </Box>
                                <Typography variant="plain" level='h2' className='rounded-b-lg'
                                sx= {{ 
                                    marginTop: '-7vh', backdropFilter: 'blur(4px)', 
                                    width: '14vw', padding: '5px', 
                                    marginLeft: '2vw', color: '#E1AD01'
                                }}> 
                                    { inventoryText }
                                </Typography>
                            </Box>

                            {/* Rest of the Inventory */}

                            <Box className='relative mt-5 flex flex-row justify-center'>
                                
                                {/* If a gear is selected */}
                                { pointer.indexOf("armor/") != -1 && pointer.indexOf("armor/accessory") == -1 ?
                                ( 
                                <>
                                    <img src='/attributes/cf2.png' width = {400} className='rounded-md absolute z-0' />
                                    <Box className='flex flex-col items-center border gap-5'>
                                        <img src={img} width = {100} className='z-10' />
                                        <Input size='lg' variant='plain' 
                                        placeholder={`${pointer.substring(6, 7).toUpperCase()}${pointer.substring(7)} Name`} 
                                        value={equipmentValue[0]}
                                        onChange={(event) => {
                                            setEquipmentValue([event.target.value, equipmentValue[1]]);
                                            StoreCharText("/attributes/equipment", event.target.value, handleEquipmentChange(inventoryText, [event.target.value, equipmentValue[1]]));
                                        }}
                                        sx={{ backgroundColor: "floralwhite" }}
                                        />
                                    </Box> 
                                </>
                                ) : pointer.indexOf("armor/accessory") != -1 ? (

                                    // If Accessory is selected 
                                    <AccessoryContainer map={accessory} saveNewAccessory={saveNewAccessory} setMap={setAccessory} pointer={pointer} pointerFunction={handlePointerChange} />
                                ) : pointer == "armor" ? 
                                (
                                <>
                                    {/* Overview of Gears */}
                                    {/* left gauntlet, cape */}
                                    <Box className='flex flex-col ml-[1vw] mt-[15vh]'>
                                        <img src='/attributes/glove.png' width = {100} className='z-10 cursor-pointer' onClick={() => {clickImage("armor/leftarm")}} />
                                        <img src='/attributes/backwear.png' width = {80} className='cursor-pointer rounded-md z-10 ml-[0.5vw]' onClick={() => {clickImage("armor/backwear")}} />
                                    </Box>

                                    {/* helmet, armor, leggings, boots */}
                                    <Box className='flex flex-col ml-[3vw]'>
                                        <img src='/attributes/helm.png' width = {100} className='z-10 cursor-pointer' onClick={() => {clickImage("armor/helm")}} />
                                        <img src='/attributes/chest.png' width = {100} className='z-10 cursor-pointer' onClick={() => {clickImage("armor/chest")}} />
                                        <img src='/attributes/leggings.png' width = {100} className='z-10 cursor-pointer' onClick={() => {clickImage("armor/leggings")}} />
                                        <img src='/attributes/boots/41.png' width = {70} className='z-10 ml-[1.5vw] cursor-pointer' onClick={() => {clickImage("armor/foot")}} />
                                    </Box>

                                    {/* right gauntlet, accessories */}
                                    <Box className='flex flex-col mt-[15vh] ml-[3vw]'>
                                        <img src='/attributes/glove.png' width = {100} className='z-10 cursor-pointer' onClick={() => {clickImage("armor/rightarm")}} />
                                        <img src='/attributes/ring.png' width = {100} className='z-10 cursor-pointer' onClick={() => {clickImage("armor/ring")}} />
                                    </Box>
                                </>
                                ) : 
                                (
                                    <>
                                    </>
                                )}
                            </Box>
                        </>
                        )
                        : pointer === 'general' ? (
                            <>
                                <Typography variant="plain" level='h3' sx= {{ marginLeft: '10vw',  marginTop: '30vh', backdropFilter: 'blur(5px)', borderRadius: '14px', width: '22vw', padding: '5px', color: 'lightsalmon' }}> 
                                        Choose an equipment category
                                </Typography>

                                <Box className='flex flex-row w-[40vw] h-[30vh] ml-[5vw] items-center'>
                                    <Box className='flex flex-col'>
                                        <Typography variant="plain" level='h4' sx= {{ backdropFilter: 'blur(2px)', borderRadius: '12px', width: '14vw', padding: '5px', marginLeft: '2vw', color: 'black' }}> 
                                            Armor
                                        </Typography>
                                        <img src='/attributes/armor.png' onClick = {() => setPointer('armor')} width = {100} className='ml-[5.3vw] cursor-pointer' />
                                    </Box>

                                    <Box className='flex flex-col -mt-[5vh]'>
                                        <Typography variant="plain" level='h4' sx= {{ backdropFilter: 'blur(2px)', borderRadius: '12px', width: '14vw', padding: '5px', marginLeft: '2vw', color: 'black' }}> 
                                            Weapons
                                        </Typography>
                                        <img src='/attributes/weapons/weapon1.png' onClick = {() => console.log(1)} width = {100} className='ml-[5.3vw] mt-[5vh] -rotate-90 cursor-pointer' />
                                    </Box>
                                </Box>
                            </>
                        ) 
                        : (
                            <>
                            
                            </>
                        )}
                        
                    </Box>

                    {/* Right Pane  */}
                    <div className={`${rightPaneHidden  || pointer == "armor/accessory" ? "hidden" : "container-div flex-col border backdrop-blur-sm"}`}>
                            { pointer == "armor/accessory/new" && (
                                <>
                                    <FormControl>
                                        <Box className="flex flex-col gap-1">
                                        <FormLabel sx= {{ fontWeight: 'bold' }}>Accessory's Name</FormLabel>
                                            <Input
                                                size="lg"
                                                sx={{ outline: 'none !important', '&.MuiSelected': { outline: 'none !important' }, minWidth: 350, backgroundColor: 'transparent', color: "black" }}
                                                onChange={(event) => {
                                                    setEquipmentValue([event.target.value, equipmentValue[1]]);
                                                    }}
                                            />
                                        </Box>
                                    </FormControl>
                                </>
                            ) }

                            { pointer != "armor/accessory" && (
                            <FormControl>
                            <FormLabel sx= {{ fontWeight: 'bold', marginTop: pointer.indexOf("armor/accessory") != -1 && pointer != "armor/accessory" ? "2vh" : "" }}>{inventoryText}'s Description</FormLabel>
                            <Textarea
                                variant='outlined'
                                color='primary'
                                placeholder="Type in here…"
                                value={equipmentValue[1]}
                                onChange={(event) => {
                                    setEquipmentValue([equipmentValue[0], event.target.value]);
                                    if (pointer !== "armor/accessory/new") StoreCharText("/attributes/equipment", event.target.value, handleEquipmentChange(inventoryText, [equipmentValue[0], event.target.value]));
                                }}
                                minRows={2}
                                maxRows={4}
                                startDecorator = {
                                    <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
                                        <Hint props = 'skills' />
                                    </Box>
                                }
                                endDecorator = {""
                                    // <Typography level="body-xs" sx={{ ml: 'auto', color: 'green' }}>
                                    // {skills.length} character(s)
                                    // </Typography>
                                }
                                sx={{ outline: 'none !important', '&.MuiSelected': { outline: 'none !important' }, minWidth: 350, height: 280, backgroundColor: 'transparent', color: "black" }}
                            />
                        </FormControl>
                        ) }
                    </div>

                { NavigationValidator(binary, resetBinary) }
                </Box>
                
                <div className='absolute w-[100%] bottom-5'>
                    <div className='arrow-container-multibox'>
                        <Button onClick = {() => GoBack('/characters/creation/origins/features', nav)} className='' sx={{ outline: 'none !important'}} variant='soft'>
                            <ArrowBackIcon />
                        </Button>

                        { NavigationValidator(binary, resetBinary) }

                        <Button onClick={() => StateValidator(nav, [resetBinary, setBinaryChild], storeFields, '/characters/creation/origins/features')} className='' sx={{ outline: 'none !important'}} variant='soft'>
                            <ArrowForwardIcon />
                        </Button>
                    </div>
                </div>

            </div>            
        </>
    )
}