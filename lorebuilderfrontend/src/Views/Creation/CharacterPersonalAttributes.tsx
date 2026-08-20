import { Alert, Box, Button, FormControl, FormLabel, IconButton, Input, Modal, Sheet, Textarea, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import{ equipmentObject } from "../../Controllers/StoreCharText.tsx"
import { MainhandWeaponContainer } from "../../Components/Widgets/MainhandWeaponContainer.tsx";
import { AccessoryContainer } from "../../Components/Widgets/AccessoryContainer.tsx";
import store from '../../Redux/store.tsx'
import Hint from '../../Components/Hint.tsx'
import StoreCharText from '../../Controllers/StoreCharText.tsx'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import NavigationValidator from "../../Components/NavigationValidator.tsx";
import GoBack from "../../Controllers/GoBack.tsx";
import StateValidator from "../../Controllers/StateValidator.tsx";
import EquipmentDictionary from "../../Services/EquipmentDictionary.tsx"
import AccessoryTest from "../../Test/AccessoryTest.tsx"
import WeaponTest from "../../Test/WeaponTest.tsx";

type comp  = {
    class: 'attributes' | 'origins',
    field: string
}
type stateArr = Array<comp>;

export default function CharacterPersonalAttributes () 
{
    const invText : string = "Click on Any of the Gear";
    const [binary, setBinary] = useState(0);
    const [pointer, setPointer] = useState('general');
    const [inventoryText, setInventoryText] = useState(invText);
    const [alertText, setAlertText] = useState("");
    const [alert, setAlert] = useState("hidden flex width-full ml-[3vw] mt-[4vh]");
    const [rightPaneHidden, setRightPaneHidden] = useState(true);
    const [toggled, setToggled] = useState(false);
    const [equipmentType, setEquipmentType] = useState("");
    const [equipmentValue, setEquipmentValue] = useState<Array<string>>(["", ""]);

    // Accessory-related Components
    // For selected accessory: id, name, description, imgPath
    const [accessory, setAccessory] = useState<Map<string, Array<string>>>(new Map<"", ["","", ""]>);
    const [accessorySelected, setAccessorySelected] = useState<Array<string>>([]);

    // Weapon-related Components
    // For selected Weapon: id, name, description, imgPath
    const [mainHandweapon, setMainhandWeapon] = useState<Map<string, Array<string>>>(new Map<"", ["", "", ""]>);
    const [mainHandWeaponSelected, setMainhandWeaponSelected] = useState<Array<string>>([]);

    // Used by both accessory and weapon components
    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState("");
    const [saveButton, setSaveButton] = useState("hidden");

    const [img, setImg] = useState("");
    const nav = useNavigate();
    const storeFields : stateArr  = [
        {'class' : 'attributes', 'field' : 'skills'}, 
        {'class' : 'attributes', 'field' : 'strength'}, 
        {'class': 'attributes', 'field' : 'magic'}
]

    function openAlert(alertText: string) {
        setAlert("flex width-full ml-[3vw] mt-[4vh]");
        setAlertText(alertText);
    }

    function handleEquipmentChange(equipmentType: string, equipmentValue: Array<string>, uuid?: string) : equipmentObject {
        return {
            equipmentType: EquipmentDictionary().get(equipmentType)!,
            equipmentValue: uuid != null || uuid != undefined 
            ? [uuid, equipmentValue[0], equipmentValue[1]] 
            : [equipmentValue[0], equipmentValue[1]]
        }
    }

    function validateItem() : boolean {
        // Validate accessory data
        if (equipmentValue[0] == undefined || equipmentValue[1] == undefined) {
            return false;
        }
        var regexNoWordChar = /([a-zA-Z])+/;
        var isEmptyString = equipmentValue[0].trim() == "" || equipmentValue[1].trim() == "";
        var onlyNumbersAndSpecialCharacters = regexNoWordChar.test(equipmentValue[0].trim()) == false
        || regexNoWordChar.test(equipmentValue[1].trim()) == false;

        if (isEmptyString || onlyNumbersAndSpecialCharacters) {
            return false;
        }
        return true;
    }

    function trackAccessoryWeaponChange() : void {
        // Identify presence of change
        console.log(pointer)
        var item = pointer.split("/")[1] == "accessory" ? accessory.get(accessorySelected[0]) : (pointer.split("/")[1] == "mainhand" ? mainHandweapon.get(mainHandWeaponSelected[0]) : null)
        var itemOfInterestName = item![0];
        var itemOfInterestDescription = item![1];
        var hasChanged = equipmentValue[0] !== itemOfInterestName
            || equipmentValue[1] !== itemOfInterestDescription;
        if (hasChanged) {
            setSaveButton("w-[10vw]");
        } else {
            setSaveButton("hidden");
        }
    }

    function deleteAccessory() : void {
        StoreCharText("/attributes/equipment", "delete", handleEquipmentChange(inventoryText, [equipmentValue[0], equipmentValue[1]], accessorySelected[0]));        
        setAccessory(prevMap => {
            prevMap.delete(accessorySelected[0]);
            return prevMap;
        });
        setEquipmentValue(["", ""]);
    }

    function saveAccessory(edit?: boolean) : boolean {
        // Validate accessory data
        var validationResult = validateItem();
        if (!validationResult) return false;
        StoreCharText("/attributes/equipment", edit ? "edit" : "", handleEquipmentChange(inventoryText, [equipmentValue[0], equipmentValue[1]], edit ? accessorySelected[0] : "none"));        
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
        setEquipmentValue(["", ""]);
        return true;
    }

    function saveNewWeapon(category: string, edit? : boolean) : boolean {
        // Validate weapon data
        var validationResult = validateItem();
        if (!validationResult) return false;

        StoreCharText("/attributes/equipment", edit ? "edit" : "", handleEquipmentChange(inventoryText, [equipmentValue[0], equipmentValue[1]], "none"));        
        setAccessory(prevMap => {
            const newMap = new Map(prevMap);

            // Fetch UUID
            const reduxMap : Map<string, string> = store.getState().char.attributes.equipment.weaponMainhand;
            let uuid = "";
            for (const key of reduxMap.keys()) {
                if (reduxMap.get(key)![0] == equipmentValue[0]) {
                    uuid = key;
                }
            } 
            newMap.set(uuid, [equipmentValue[0], equipmentValue[1], equipmentValue[2]]);
            return newMap;
        })
        setEquipmentValue(["", ""]);
        return true;
    }

    function handlePointerChange(accessoryPointer: string) : void {
        setPointer(accessoryPointer);
    }

    function clickImage (img: string) : void {
        console.log(img)
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
                setImg(`/attributes/boots/37.png`);
                var storeData = store.getState().char.attributes.equipment.footGear;
                setEquipmentType("footGear");
                setEquipmentValue([storeData[0], storeData[1]]);
                break;
            case "armor/ring":
                // Special Case
                // Left Pane: Show Container full of accessories
                // Retrieve images from FileSystem and store it within repo FS
                // var storeData = store.getState().char.attributes.equipment.accessories;
                setEquipmentValue(["", ""]);
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
            case "weapon/mainhand":
                setEquipmentValue(["", ""]);
                var testing = true;
                console.log("ano")
                if (testing) {
                    var storeData : any = WeaponTest();
                    var existingData = store.getState().char.attributes.equipment.weaponMainHand;
                    var merged: Map<string, string[]> = new Map([...storeData, ...existingData]);
                    setPointer("weapon/mainhand");
                    setInventoryText("Mainhand Weapon");
                    setEquipmentType("weaponMainHand");
                    setMainhandWeapon(merged);
    
                    // Right Pane: 
                    setImg(`/attributes/${img.substring(6)}.png`);
                    console.log(merged);
                    console.log(storeData)
                }
                break;
        }

    }

    function goBack() {
        if (pointer == "armor") {
            setInventoryText(invText);
            setPointer("general");
        }
        else if (pointer.indexOf("armor/") == 0) {
            console.log(pointer)
            console.log(toggled)
            if (pointer == "armor/accessory/new" && toggled) {
                setModalOpen(true);
                setModalText("You still have an accessory in-progress. Go back to Armor overview?");
            } else {
                setInventoryText(invText);
                setPointer("armor");    
            }
        }
        else {
            setPointer("general");
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
        // console.log(equipmentValue)
        if (pointer.indexOf("armor/") != -1 || pointer.indexOf("weapon/") != -1) {
            if (pointer.split("/")[2] == "new") {
                setEquipmentValue(["", ""]);
            }
            setRightPaneHidden(false);
        } else {
            setRightPaneHidden(true);
        }
        // console.log(rightPaneHidden)
        
    }, [pointer])
    
    // Track current accessory selected
    useEffect(() => {
        console.log(accessorySelected);  
        console.log(accessory)
        if (accessory.size > 0) {
            var acc : string[] = accessory.get(accessorySelected[0])!;
            setEquipmentValue([acc[0], acc[1]]);
            console.log(acc)
            }
    }, [accessorySelected])

    // Track current weapon (mainhand/offhand) selected
    useEffect(() => {
        if (mainHandweapon.size > 0) {
            var weapon : string[] = mainHandweapon.get(mainHandWeaponSelected[0])!;
            setEquipmentValue([weapon[0], weapon[1]]);
            console.log(weapon)
        }
    }, [mainHandWeaponSelected])

    // Track changes when editing selected weapon or accessory
    useEffect(() => {
        if (pointer.split("/")[2] == "edit") {
            trackAccessoryWeaponChange();
        }
    }, [equipmentValue])

    return (
        <>
            <div className='container-div-personalattributes'>
                <Box className={`flex flex-row ${rightPaneHidden ? "justify-center items-center" : ""}`}>
                
                    {/* Left Pane */}
                    <Box className='h-[100%] relative' hidden = {false}>
                        
                        {/* For Armor */}
                        { pointer.indexOf('armor') != -1 ? 
                        (
                        <>
                            <Box className='flex flex-col items-center'>
                                <Box className='flex flex-row w-[40vw] h-[30vh] ml-[14vw] items-center'>
                                    <Button variant='soft' color='warning' onClick = {goBack} sx= {{outline: 'none !important'}}>
                                        <ArrowBackIcon />
                                    </Button>
                                    <img src='/attributes/backpack2.png' width = {90} className='ml-[1vw]' />
                                    <Typography variant="plain" level='h2' 
                                    sx= {{ 
                                        fontFamily: 'PixelFont',
                                        marginLeft: '1vw', 
                                        color: 'brown', 
                                        backdropFilter: 'blur(2px)' 
                                        }}> 
                                        Inventory 
                                    </Typography>
                                </Box>
                                <Typography variant="plain" level='h2' className='rounded-b-lg'
                                sx= {{ 
                                    fontFamily: 'PixelFont',
                                    marginTop: '-7vh', backdropFilter: 'blur(2px)', 
                                    minWidth: '18vw', padding: '5px', 
                                    marginLeft: '2vw', color: pointer == "armor" ? "#F8E16C" : '#E1AD01'
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
                                ) : pointer.indexOf("armor/accessory") != -1 ? 
                                (

                                    // If Accessory is selected 
                                    <AccessoryContainer 
                                        modalOpen={modalOpen} 
                                        modalText={modalText} 
                                        setModalOpen={setModalOpen} 
                                        setModalText={setModalText}  
                                        toggled={toggled} 
                                        setToggled={setToggled} 
                                        setAccessorySelected={setAccessorySelected} 
                                        openAlert={openAlert} 
                                        map={accessory} 
                                        saveAccessory={saveAccessory} 
                                        deleteAccessory={deleteAccessory}
                                        setMap={setAccessory} 
                                        pointer={pointer} 
                                        pointerFunction={handlePointerChange} 
                                    />
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
                                    <Box className='flex flex-col ml-[1vw]'>
                                        <img src='/attributes/helm.png' width = {100} className='z-10 cursor-pointer' onClick={() => {clickImage("armor/helm")}} />
                                        <img src='/attributes/chest.png' width = {100} className='z-10 cursor-pointer' onClick={() => {clickImage("armor/chest")}} />
                                        <img src='/attributes/leggings.png' width = {100} className='z-10 cursor-pointer' onClick={() => {clickImage("armor/leggings")}} />
                                        <img src='/attributes/boots/37.png' width = {70} className='z-10 ml-[2vw] mt-[1vh] cursor-pointer' onClick={() => {clickImage("armor/foot")}} />
                                    </Box>

                                    {/* right gauntlet, accessories */}
                                    <Box className='flex flex-col mt-[15vh] ml-[1vw]'>
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
                        : pointer.indexOf("weapon") != -1 ? (
                        <>
                        {/* For weapon */}
                            {pointer.indexOf("weapon/mainhand") != -1 && 
                                (
                                <>
                                    <Box className='flex flex-col items-center'>
                                        <Box className='flex flex-row w-[40vw] h-[30vh] ml-[14vw] items-center'>
                                            <Button variant='soft' color='warning' onClick = {goBack} sx= {{outline: 'none !important'}}>
                                                <ArrowBackIcon />
                                            </Button>
                                            <img src='/attributes/backpack2.png' width = {90} className='ml-[1vw]' />
                                            <Typography variant="plain" level='h2' 
                                            sx= {{ 
                                                fontFamily: 'PixelFont',
                                                marginLeft: '1vw', 
                                                color: 'brown', 
                                                backdropFilter: 'blur(2px)' 
                                                }}> 
                                                Inventory 
                                            </Typography>
                                        </Box>
                                        <Typography variant="plain" level='h2' className='rounded-b-lg'
                                        sx= {{ 
                                            fontFamily: 'PixelFont',
                                            marginTop: '-7vh', backdropFilter: 'blur(2px)', 
                                            minWidth: '18vw', padding: '5px', 
                                            marginLeft: '2vw', color: pointer == "armor" ? "#F8E16C" : '#E1AD01'
                                        }}> 
                                            { inventoryText }
                                        </Typography>
                                    </Box>
    
                                    <MainhandWeaponContainer
                                        modalOpen={modalOpen}
                                        modalText={modalText}
                                        setModalOpen={setModalOpen}
                                        setModalText={setModalText}
                                        toggled={toggled}
                                        setToggled={setToggled}
                                        setWeaponSelected={setMainhandWeaponSelected}
                                        openAlert={openAlert}
                                        map={mainHandweapon}
                                        saveNewWeapon={saveNewWeapon}
                                        setMap={setMainhandWeapon}
                                        pointer={pointer}
                                        pointerFunction={handlePointerChange} 
                                    />                                        
                                </>
                                )}
                            {pointer == "weapon" && (
                                <Box className='flex flex-col items-center'>
                                    <Box className='flex flex-row w-[40vw] h-[30vh] ml-[14vw] items-center'>
                                        <Button variant='soft' color='warning' onClick = {goBack} sx= {{outline: 'none !important'}}>
                                            <ArrowBackIcon />
                                        </Button>
                                        <img src='/attributes/weapons/celestialsword.png' width = {60} className='ml-[2vw] rounded-lg' />
                                        <Typography variant="plain" level='h2' 
                                        sx= {{ 
                                            fontFamily: 'PixelFont',
                                            marginLeft: '1vw', 
                                            color: 'brown', 
                                            backdropFilter: 'blur(2px)' 
                                            }}> 
                                            Weapons 
                                        </Typography>
                                    </Box>
                                    <Typography variant="plain" level='h2' className='rounded-b-lg'
                                        sx= {{ 
                                            fontFamily: 'PixelFont',
                                            marginTop: '-7vh', backdropFilter: 'blur(4px)', 
                                            width: '14vw', padding: '5px', 
                                            marginLeft: '2vw', color: '#E1AD01'
                                        }}> 
                                            Select a Weapon Type
                                    </Typography>
                                    <Box className='flex flex-row gap-12 mt-[13vh] items-center'>
                                        <Box className='flex flex-col gap-2 items-center cursor-pointer'
                                            onClick={() => clickImage("weapon/mainhand")}
                                        >
                                        <img src='/attributes/weapons/scepter.jpg' width = {90} className='rounded-lg bg-[#F5DD90]' />
                                            <Typography variant='plain' level='h4'
                                                sx= {{
                                                    fontFamily: 'PixelFont',
                                                    backdropFilter: 'blur(4px)',
                                                    color: '#FAF4D3'
                                                }}>
                                                    Mainhand
                                            </Typography>
                                        </Box>
                                        <Box className='flex flex-col gap-2 items-center'>
                                            <img src='/attributes/weapons/shield.png' width = {90} className='rounded-lg' />
                                            <Typography variant='plain' level='h4'
                                                sx= {{
                                                    fontFamily: 'PixelFont',
                                                    backdropFilter: 'blur(4px)',
                                                    color: '#FAF4D3'
                                                }}>
                                                    Off-hand
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            )}

                        </>
                        )
                        : (
                            <>
                                <Typography variant="plain" level='h3' sx= {{ fontFamily: 'PixelFont', marginLeft: '10vw',  marginTop: '30vh', backdropFilter: 'blur(5px)', borderRadius: '14px', width: '22vw', padding: '5px', color: 'lightsalmon' }}> 
                                        Choose an equipment category
                                </Typography>

                                <Box className='flex flex-row w-[40vw] h-[30vh] ml-[5vw] items-center'>
                                    <Box className='flex flex-col'>
                                        <Typography variant="plain" level='h4' sx= {{ fontFamily: 'PixelFont', backdropFilter: 'blur(2px)', borderRadius: '12px', width: '14vw', padding: '5px', marginLeft: '2vw', color: 'black' }}> 
                                            Armor
                                        </Typography>
                                        <img src='/attributes/armor.png' onClick = {() => setPointer('armor')} width = {100} className='ml-[5.3vw] cursor-pointer' />
                                    </Box>

                                    <Box className='flex flex-col -mt-[5vh]'>
                                        <Typography variant="plain" level='h4' sx= {{ fontFamily: 'PixelFont', backdropFilter: 'blur(2px)', borderRadius: '12px', width: '14vw', padding: '5px', marginLeft: '2vw', color: 'black' }}> 
                                            Weapons
                                        </Typography>
                                        <img src='/attributes/weapons/weapon1.png' onClick = {() => setPointer("weapon")} width = {100} className='ml-[5.3vw] mt-[5vh] -rotate-90 cursor-pointer' />
                                    </Box>
                                </Box>
                            </>
                        )}


                        
                        
                    </Box>

                    {/* Right Pane  */}
                    <div className={`${rightPaneHidden  || pointer == "armor/accessory" ? "hidden" : "container-div flex-col rounded-lg backdrop-blur-sm mt-[2vh] mr-[2vw]"}`}>
                            { (pointer.split("/")[2] == "new" || pointer.split("/")[2] == "edit" ) && (
                                <>
                                    <FormControl>
                                        <Box className="flex flex-col gap-1">
                                        <FormLabel sx= {{ fontWeight: 'bold', color: 'antiquewhite' }}>{inventoryText}'s Name</FormLabel>
                                            <Input
                                                value={equipmentValue[0]}
                                                size="lg"
                                                sx={{ outline: 'none !important', '&.MuiSelected': { outline: 'none !important' }, minWidth: 350, backgroundColor: 'transparent', color: "black" }}
                                                onChange={(event) => {
                                                    setEquipmentValue([event.target.value, equipmentValue[1]]);
                                                    trackAccessoryWeaponChange();
                                                    }}
                                            />
                                        </Box>
                                    </FormControl>
                                </>
                            ) }

                            { pointer != "armor/accessory" && pointer != "weapon/mainhand" && pointer != "weapon/offhand" && (
                            <Box className='flex flex-col gap-2 items-center'>
                            <FormControl>
                                <FormLabel sx= {{ 
                                    fontWeight: 'bold', 
                                    color: 'antiquewhite',
                                    marginTop: 
                                        pointer.indexOf("armor/accessory") != -1 
                                        || pointer.indexOf("weapon/") != -1 
                                        ? "2vh" : "" 
                                }}>
                                            {inventoryText}'s Description
                                </FormLabel>
                                <Textarea
                                    variant='outlined'
                                    color='primary'
                                    placeholder="Type in here…"
                                    value={equipmentValue[1]}
                                    onChange={(event) => {
                                        setEquipmentValue([equipmentValue[0], event.target.value]);
                                        if (pointer.split("/")[2] != "new" && pointer.split("/")[2] != "edit") {
                                            StoreCharText("/attributes/equipment", event.target.value, handleEquipmentChange(inventoryText, [equipmentValue[0], event.target.value]));
                                        } else if (pointer.split("/")[2] == "edit") {
                                            // console.log("just editing")
                                            trackAccessoryWeaponChange();
                                        }
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

                            { pointer.split("/")[2] == "edit" && (
                                <Box className='flex flex-row gap-8'>
                                <IconButton 
                                    variant='soft' 
                                    color='danger'
                                    onClick={() => { 
                                        setModalOpen(true);
                                        setModalText("Are you sure you want to delete this accessory?");
                                    }
                                }>
                                    <DeleteIcon />
                                </IconButton>

                                { saveButton != "hidden" && (
                                    <Button 
                                        variant='soft' 
                                        color='success' 
                                        className={saveButton}  
                                        onClick={() => {
                                            setModalOpen(true);
                                            setModalText("Are you sure you want to save these changes?")
                                        }
                                    }>
                                        <Typography sx={{ fontFamily: 'PixelFont', fontSize: 13}}>
                                            Save Changes
                                        </Typography>
                                    </Button>
                            )}
                                </Box>
                            )}             
                            </Box>
                        ) }
                    </div>

                { NavigationValidator(binary, resetBinary) }
                </Box>
                
                {/* Alert */}
                <Box className={alert}>
                    <Alert 
                    startDecorator={<WarningIcon />}
                    variant='soft' 
                    color='danger'
                    endDecorator={
                        <IconButton onClick={() => setAlert("hidden flex width-full ml-[3vw] mt-[4vh]")}>
                            <CloseIcon />
                        </IconButton>
                    }
                    >
                        {alertText}
                </Alert>
                </Box> 

                {/* Modal */}
                <Modal 
                    open={modalOpen} 
                    onClose={() => setModalOpen(false)}
                    className='flex flex-col justify-center items-center'
                >
                    <Sheet variant='soft' className='flex flex-col items-center min-w-[20vw] max-w-[20vw] p-5 rounded-lg'>
                        <Sheet variant='soft' className='m-auto p-3 text-center'>
                            <Typography> {modalText} </Typography>
                        </Sheet>
                        <Sheet className='flex flex-row gap-9 justify-center mt-[1vh]' variant='soft'>
                            <IconButton variant='soft' onClick={() => {
                                if (modalText == `Are you sure you want to set your ${inventoryText}?`) {
                                    var bool : boolean = saveAccessory();
                                    if (bool) {
                                        setToggled(false);
                                        handlePointerChange("armor/accessory");
                                    } else {
                                        openAlert("One more of the fields have invalid input");
                                    }
                                } 
                                else if (modalText == "You still have an accessory in-progress. Go back to Armor overview?") {
                                    setToggled(false);
                                    handlePointerChange("armor");
                                } 
                                else if (modalText == `Are you sure you want to discard your ${inventoryText}?`) {
                                    setToggled(false);
                                    handlePointerChange("armor/accessory");
                                } else if  (modalText == `Are you sure you want to delete this ${inventoryText}?`) {
                                    handlePointerChange("armor/accessory");
                                    setToggled(false);
                                    deleteAccessory();
                                }
                                else {
                                    // Saving changes
                                    console.log("Saving changes")
                                    var savingAccessory = pointer.split("/")[0] == "armor";
                                    var bool : boolean = savingAccessory 
                                        ? saveAccessory(true) 
                                        : saveNewWeapon(pointer.split("/")[1] == "mainhand" ? "mainhand" : "offhand", true);
                                    if (bool) {
                                        if (savingAccessory) handlePointerChange("armor/accessory");
                                        else {
                                            if (pointer.split("/")[1] == "mainhand") handlePointerChange("weapon/mainhand");
                                            else handlePointerChange("weapon/offhand");
                                        }
                                    } else {
                                        openAlert("One more of the fields have invalid input");
                                    }
                                }
                                setModalOpen(false);
                            }}>
                                <CheckCircleIcon />
                            </IconButton>
                            <IconButton variant='soft' onClick={() => setModalOpen(false)}>
                                <CancelIcon />
                            </IconButton>
                        </Sheet>
                    </Sheet>
                </Modal>


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