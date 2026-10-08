import { Alert, Box, Button, FormControl, FormLabel, IconButton, Input, Modal, Sheet, Textarea, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import{ equipmentObject } from "../../Controllers/StoreCharText.tsx"
import { WeaponContainer } from "../../Components/Widgets/WeaponContainer.tsx";
import { AccessoryContainer } from "../../Components/Widgets/AccessoryContainer.tsx";
import fs from 'fs';
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
import WeaponTestMainhand from "../../Test/WeaponTestMainhand.tsx";
import WeaponTestOffhand from "../../Test/WeaponTestOffhand.tsx";
import { instance } from "../../Services/AxiosInstance.tsx";
import { CircularProgress } from "@mui/material";

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
    
    // Image Files
    // TODO: Populate these when loading the database and state
    // Flow: Fetch Image Path from Redux -> Create a Blob URL from image path -> display in frontend
    const [img, setImg] = useState("");
    const [previewImg, setPreviewImg] = useState("");
    const [imageLoading ,setImageLoading] = useState(false);

    // General 
    // uuid, name, description, imagePath
    const [equipmentValue, setEquipmentValue] = useState<Array<string>>(["", "", ""]);

    // Armor-related States
    const [viewingAccessory, setViewingAccessory] = useState(false);

    // Accessory-related States
    // For selected accessory: id, name, description, imgPath
    const [accessory, setAccessory] = useState<Map<string, Array<string>>>(new Map<"", ["","", ""]>);
    const [accessorySelected, setAccessorySelected] = useState<Array<string>>([]);

    // Weapon-related States
    // For selected Weapon: id, name, description, imgPath
    const [weapon, setWeapon] = useState<Map<string, Array<string>>>(new Map<"", ["", "", ""]>);
    const [weaponSelected, setWeaponSelected] = useState<Array<string>>([]);
    const [viewingWeapon, setViewingWeapon] = useState(false);

    // Used by both accessory and weapon States
    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState("");
    const [saveButton, setSaveButton] = useState("hidden");

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
            ? [uuid, equipmentValue[0], equipmentValue[1], equipmentValue[2]] 
            : [equipmentValue[0], equipmentValue[1], equipmentValue[2]]
        }
    }

    async function previewImage({fileName, equipmentType} : {fileName: string, equipmentType: string}, file?: File) {
        if (fileName == "" || fileName == undefined) return;

        // Upload and Save File
        if (file !== undefined) {
            setImageLoading(true);
            var reader = new FileReader();
            reader.readAsArrayBuffer(file);
            var byteArray : Uint8Array | undefined;;
            reader.onloadend = async (event: ProgressEvent<FileReader>) => {
                byteArray = new Uint8Array(event.target?.result as ArrayBuffer);
                var blob = new Blob(
                    [byteArray],
                    { type: "image/png" }
                )

                // Convert byte array to base 64 string
                var b64encode = window.btoa(
                    Array.from(byteArray, (n: number) => {return String.fromCharCode(n)}).join('')
                );
                
                // Save file to Directory
                // TODO: Add UI reactive elements to this request
                var request = await instance.post(
                    'api/ImageController/GetByteArray',
                    {
                        fileName: file?.name,
                        fileData: b64encode,
                        imageCategory: equipmentType,
                        transactionType: "upload"
                    }
                )
                if (request.status == 200) {
                    setImageLoading(false);
                    setPreviewImg(window.URL.createObjectURL(blob));            }
                }
        }

        // Retrieve File From File System
        else {
            console.log(fileName)
            console.log(equipmentType)
            // Set a loading UI
            setImageLoading(true);
            var fileName = fileName;
            if (fileName !== "") {
                var request = await instance.post(
                    'api/ImageController/GetByteArray',
                    {
                        fileName: fileName,
                        fileData: "",
                        imageCategory: equipmentType,
                        transactionType: "retrieve"
                    }
                )  
                var byteCharacterString = window.atob(request.data as string);
                var uInt8ByteArray = new Uint8Array(byteCharacterString.length);
                for (let i = 0; i <= uInt8ByteArray.length - 1; i++) {
                    uInt8ByteArray[i] = byteCharacterString.charCodeAt(i);
                }

                var blob = new Blob(
                    [uInt8ByteArray],
                    { type: "image/png" }
                )

                if (request.status == 200) {
                    var objectURL = window.URL.createObjectURL(blob);
                    setImageLoading(false);
                    setPreviewImg(objectURL);
                }
            }
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
        var item = pointer.split("/")[1] == "accessory" ? accessory.get(accessorySelected[0]) : weapon.get(weaponSelected[0])
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
        setEquipmentValue(["", "", ""]);
    }

    function saveAccessory(edit?: boolean) : boolean {
        // Validate accessory data
        var validationResult = validateItem();
        if (!validationResult) return false;
        StoreCharText("/attributes/equipment", edit ? "edit" : "", handleEquipmentChange(inventoryText, [equipmentValue[0], equipmentValue[1], equipmentValue[2]], edit ? accessorySelected[0] : "none"));        
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
        setEquipmentValue(["", "", ""]);
        return true;
    }

    function saveNewWeapon(category: string, edit? : boolean) : boolean {
        // Validate weapon data
        var validationResult = validateItem();
        if (!validationResult) return false;
        StoreCharText("/attributes/equipment", edit ? "edit" : "", handleEquipmentChange(inventoryText, [equipmentValue[0], equipmentValue[1]], edit ? weaponSelected[0] : "none"));        
        setWeapon(prevMap => {
            const newMap = new Map(prevMap);

            // Fetch UUID
            const reduxMap : Map<string, string> = category == "mainhand"
                ? store.getState().char.attributes.equipment.weaponMainHand
                : store.getState().char.attributes.equipment.weaponOffHand;
            let uuid = "";
            for (const key of reduxMap.keys()) {
                if (reduxMap.get(key)![0] == equipmentValue[0]) {
                    uuid = key;
                }
            } 
            newMap.set(uuid, [equipmentValue[0], equipmentValue[1], equipmentValue[2]]);
            return newMap;
        })
        setEquipmentValue(["", "", ""]);
        return true;
    }

    function handlePointerChange(accessoryPointer: string) : void {
        setPointer(accessoryPointer);
    }

    function clickImage (img: string) : void {
        switch(img){
            case "armor/helm":
                setPointer(img); 
                setInventoryText("Helmet");
                setImg(`/attributes/${img.substring(6)}.png`);
                var storeData = store.getState().char.attributes.equipment.headGear;
                setEquipmentType("headGear");
                setEquipmentValue([storeData[0], storeData[1], storeData[2]]);
                previewImage({fileName : storeData[2], equipmentType : "headGear"});
                break;
            case "armor/leftarm":
                setPointer(img);
                setInventoryText("Left Armwear");
                setImg(`/attributes/glove.png`);
                var storeData = store.getState().char.attributes.equipment.leftArmGear;
                setEquipmentType("leftArmGear");
                previewImage({fileName: storeData[2], equipmentType : "leftArmGear"});                
                break;
            case "armor/rightarm":
                setPointer(img);
                setInventoryText("Right Armwear");
                setImg(`/attributes/glove.png`);
                var storeData = store.getState().char.attributes.equipment.rightArmGear;
                setEquipmentType("rightArmGear");
                setEquipmentValue([storeData[0], storeData[1], storeData[2]]);
                previewImage({fileName : storeData[2], equipmentType : "rightArmGear"});
                break;
            case "armor/backwear":
                setPointer("armor/backwear");
                setInventoryText("Backwear");
                setImg(`/attributes/${img.substring(6)}.png`);
                var storeData = store.getState().char.attributes.equipment.backGear;
                setEquipmentType("backGear");
                setEquipmentValue([storeData[0], storeData[1], storeData[2]]);
                previewImage({fileName : storeData[2], equipmentType : "backGear"});
                break;
            case "armor/chest":
                setPointer("armor/chest");
                setInventoryText("Chestwear");
                setImg(`/attributes/${img.substring(6)}.png`);
                var storeData = store.getState().char.attributes.equipment.chestGear;
                setEquipmentType("chestGear");
                setEquipmentValue([storeData[0], storeData[1], storeData[2]]);
                previewImage({fileName : storeData[2], equipmentType : "chestGear"});
                break;
            case "armor/leggings":
                setPointer("armor/leggings");
                setInventoryText("Legwear");
                setImg(`/attributes/${img.substring(6)}.png`);
                var storeData = store.getState().char.attributes.equipment.leggingGear;
                setEquipmentType("leggingGear");
                setEquipmentValue([storeData[0], storeData[1], storeData[2]]);
                previewImage({fileName : storeData[2], equipmentType : "leggingGear"});
                break;
            case "armor/foot":
                setPointer("armor/foot");
                setInventoryText("Footwear");
                setImg(`/attributes/boots/37.png`);
                var storeData = store.getState().char.attributes.equipment.footGear;
                setEquipmentType("footGear");
                setEquipmentValue([storeData[0], storeData[1], storeData[2]]);
                previewImage({fileName : storeData[2], equipmentType : "footGear"});
                break;
            case "armor/ring":
                // Special Case
                // Left Pane: Show Container full of accessories
                // Retrieve images from FileSystem and store it within repo FS
                // var storeData = store.getState().char.attributes.equipment.accessories;
                setEquipmentValue(["", "", ""]);
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

                    previewImage(storeData[2]);
                }
                break;
            case "weapon/offhand":
            case "weapon/mainhand":
                setEquipmentValue(["", "", ""]);
                var testing = true;
                if (testing) {
                    var storeData : any = null;
                    var existingData = null;
                    if (img == "weapon/mainhand") {
                        storeData = WeaponTestMainhand();
                        existingData = store.getState().char.attributes.equipment.weaponMainHand;
                        setPointer("weapon/mainhand");
                        setInventoryText("Mainhand Weapon");      
                        setEquipmentType("weaponMainHand");                                     } 
                    else {
                        storeData = WeaponTestOffhand();
                        existingData = store.getState().char.attributes.equipment.weaponOffHand;
                        setPointer("weapon/offhand");
                        setInventoryText("Offhand Weapon") 
                        setEquipmentType("weaponOffHand");
                    }
                    var merged: Map<string, string[]> = new Map([...storeData, ...existingData]);
                    setWeapon(merged);
    
                    // Right Pane: 
                    setImg(`/attributes/${img.substring(6)}.png`);
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
            if ((pointer == "armor/accessory/new" && toggled) || (pointer == "armor/accessory/edit")) {
                setModalOpen(true);
                setModalText("You still have an accessory in-progress. Go back to Armor overview?");
            } else if (pointer == "armor/accessory") {
                setViewingAccessory(false);
                setPointer("armor");
            }
            else {
                setViewingAccessory(false);
                setInventoryText(invText);
                setPointer("armor");    
            }
        }
        else if (pointer.indexOf("weapon") != -1) {
            if (pointer.split("/").length >= 2) {
                if ((pointer.split("/")[2] == "new" && toggled) || (pointer.split("/")[2] == "edit")) {
                    setModalOpen(true);
                    setModalText("You still have a weapon in-progress. Go back to Weapon overview?");
                }
                setViewingWeapon(false);
                setPointer("weapon");
            }
            else if (pointer == "weapon/mainhand" || pointer == "weapon/offhand") {
                setViewingWeapon(false);
                setPointer("weapon");
            }
            else if (pointer == "weapon") setPointer("general");
        }
        else {
            setPointer("general");
        }
        setPreviewImg("");
        setImageLoading(false);
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
        // console.log("Current Pointer: " + pointer)
        // console.log("Current Equipment Data: " + equipmentValue);
        if (pointer.indexOf("armor/") != -1 || pointer.indexOf("weapon/") != -1) {
            if (pointer.split("/").length >= 2 && pointer.split("/")[1] == "accessory") {
                setViewingAccessory(true);
            }

            else if (pointer.split("/").length >= 2 && pointer.split("/")[0] == "weapon") {
                setViewingWeapon(true);
            }
            
            if (pointer.split("/")[2] == "new") {
                setEquipmentValue(["", "", ""]);
            }
            setRightPaneHidden(false);
        } else {
            setRightPaneHidden(true);
        }
    }, [pointer])
    
    // Track current accessory selected
    useEffect(() => {
        if (accessory.size > 0) {
            var acc : string[] = accessory.get(accessorySelected[0])!;
            setEquipmentValue([acc[0], acc[1], acc[2]]);
            }
    }, [accessorySelected])

    // Track current weapon (mainhand/offhand) selected
    useEffect(() => {
        if (weapon.size > 0) {
            var currentWeapon : string[] = weapon.get(weaponSelected[0])!;
            setEquipmentValue([currentWeapon[0], currentWeapon[1], currentWeapon[2]]);
        }
    }, [weaponSelected])

    // Track changes when editing selected weapon or accessory
    useEffect(() => {
        if (pointer.split("/")[2] == "edit") {
            trackAccessoryWeaponChange();
        }
    }, [equipmentValue])

    // Track Current Preview Image
    useEffect(() => {
        return () => {
            window.URL.revokeObjectURL(previewImg);
        }
    }, [previewImg])

    return (
        <>
            <div className='container-div-personalattributes'>
                <Box className={`relative flex flex-row h-[100%] ${viewingAccessory || viewingWeapon ? "" : "justify-center items-center gap-[5%]"}`}>
                
                    {/* Left Pane */}
                    <Box className='h-[70%] relative' hidden = {false}>
                        
                        {/* For Armor */}
                        { pointer.indexOf('armor') != -1 ? 
                        (
                        <>
                            <Box className='flex flex-col items-center justify-center h-[30vh] gap-[62px]'>
                                <Box className='flex flex-row w-[100%] h-[100%] justify-center items-center'>
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
                                <Box className='longer-frame mt-[-7vh]'>
                                    <Typography variant="plain" level='h2' className='rounded-b-lg'
                                        sx= {{ 
                                        fontFamily: 'PixelFont',
                                        minWidth: '18vw',
                                        color: pointer == "armor" ? "#3B200B" : '#6A3F36'
                                    }}> 
                                        { inventoryText }
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Rest of the Inventory */}

                            <Box className='relative mt-5 flex flex-row justify-center'>
                                
                                {/* If a gear is selected */}
                                { pointer.indexOf("armor/") != -1 && pointer.indexOf("armor/accessory") == -1 ?
                                ( 
                                <>
                                    <img src='/attributes/cf2.png' width = {400} className='rounded-md absolute z-0' />
                                    <Box className='flex flex-col items-center gap-5'>
                                        <img src={img} width = {100} className='z-10' />
                                        <Input size='lg' variant='plain' 
                                        placeholder={`${pointer.substring(6, 7).toUpperCase()}${pointer.substring(7)} Name`} 
                                        value={equipmentValue[0]}
                                        onChange={(event) => {
                                            setEquipmentValue([event.target.value, equipmentValue[1], equipmentValue[2]]);
                                            StoreCharText("/attributes/equipment", event.target.value, handleEquipmentChange(inventoryText, [event.target.value, equipmentValue[1], equipmentValue[2]]));
                                        }}
                                        sx={{ backgroundColor: "floralwhite", fontFamily: "PixelFont", '--Input-focusedThickness': '0px' }}
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
                                        <img src='/attributes/boots/37.png' width = {70} className='z-10 ml-[1vw] mt-[1vh] cursor-pointer' onClick={() => {clickImage("armor/foot")}} />
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
                            {pointer.split("/").length >= 2 && pointer.split("/")[1].indexOf("hand") != -1 && 
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
    
                                    <WeaponContainer
                                        modalOpen={modalOpen}
                                        modalText={modalText}
                                        setModalOpen={setModalOpen}
                                        setModalText={setModalText}
                                        toggled={toggled}
                                        setToggled={setToggled}
                                        setWeaponSelected={setWeaponSelected}
                                        openAlert={openAlert}
                                        map={weapon}
                                        saveNewWeapon={saveNewWeapon}
                                        setMap={setWeapon}
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
                                    <Box className='longer-frame mt-[-7vh]'>
                                        <Typography variant="plain" level='h2' className='rounded-b-lg'
                                            sx= {{ 
                                                fontFamily: 'PixelFont',
                                                width: '14vw', padding: '5px', 
                                                color: '#6b2a24'
                                            }}> 
                                                Select a Weapon Type
                                        </Typography>
                                    </Box>
                                    <Box className='flex flex-row gap-[6vw] mt-[13vh] items-center'>
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
                                        <Box className='flex flex-col gap-2 items-center cursor-pointer'
                                            onClick={() => clickImage("weapon/offhand")}
                                        >
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
                            <Box className='flex flex-col items-center'>
                                <Box className='longer-frame bg-size-[10px] mt-[30vh]'>
                                    <Typography variant="plain" level='h3' sx= {{ fontFamily: 'PixelFont',  width: '20vw', color: '#7b0801' }}> 
                                            Choose an equipment category
                                    </Typography>
                                </Box>

                                <Box className='flex flex-row w-[40vw] h-[30vh] justify-center'>
                                    <Box className='flex flex-col w-[50%] h-full'>
                                        <Box className='h-[50%] flex items-end justify-center'>
                                            <Box className='frame'>
                                                <Typography variant="plain" level='h4' sx= {{ fontFamily: 'PixelFont', borderRadius: '12px', width: '14vw', color: 'black', textAlign: 'center' }}> 
                                                    Armor
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box className='m-auto'>
                                            <img src='/attributes/armor.png' onClick = {() => setPointer('armor')}  className='cursor-pointer h-[100px]' />
                                        </Box>
                                    </Box>

                                    <Box className='flex flex-col w-[50%] h-full'>
                                        <Box className='h-[50%] flex items-end justify-center'>
                                            <Box className='frame'>
                                                <Typography variant="plain" level='h4' sx= {{ fontFamily: 'PixelFont', borderRadius: '12px', width: '14vw', color: 'black', textAlign: 'center' }}> 
                                                    Weapons
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box className='m-auto'>
                                            <img src='/attributes/weapons/weapon1.png' onClick = {() => setPointer("weapon")}  className='-rotate-90 cursor-pointer h-[40px]' />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                    </Box>

                    {/* Right Pane  */}
                    <div className={`${rightPaneHidden  
                        ||  pointer == "armor/accessory" 
                        || pointer ==  "weapon/mainhand" 
                        || pointer == "weapon/offhand"  
                        ? "hidden" : "container-div flex-col rounded-lg backdrop-blur-sm mt-[6vh] mr-[2vw]"}`}
                    >
                            { (pointer.split("/")[2] == "new" || pointer.split("/")[2] == "edit" ) && (
                                <Box className="flex flex-col gap-1">
                                    <FormControl>
                                        <FormLabel sx= {{ fontWeight: 'bold', color: 'antiquewhite' }}>{inventoryText}'s Name</FormLabel>
                                            <Input
                                                value={equipmentValue[0]}
                                                size="lg"
                                                sx={{ outline: 'none !important', '&.MuiSelected': { outline: 'none !important' }, minWidth: 350, backgroundColor: 'transparent', color: "black" }}
                                                onChange={(event) => {
                                                    setEquipmentValue([event.target.value, equipmentValue[1], equipmentValue[2]]);
                                                    trackAccessoryWeaponChange();
                                                    }}
                                            />
                                    </FormControl>
                                </Box>
                            ) }

                            { pointer != "armor/accessory" && pointer != "weapon/mainhand" && pointer != "weapon/offhand" && (
                            <Box className='flex flex-col gap-2 items-center justify-center'>
                                <FormControl>
                                    <FormLabel sx= {{ 
                                        fontWeight: 'bold', 
                                        color: 'antiquewhite',
                                        fontFamily: 'PixelFont',
                                        marginTop: 
                                            pointer.indexOf("armor/accessory") != -1 
                                            || pointer.indexOf("weapon/") != -1 
                                            ? "2vh" : "" 
                                    }}>
                                                {inventoryText}'s Description
                                    </FormLabel>
                                    <Textarea
                                        variant='soft'
                                        placeholder="Type in here…"
                                        value={equipmentValue[1]}
                                        onChange={(event) => {
                                            setEquipmentValue([equipmentValue[0], event.target.value, equipmentValue[2]]);
                                            if (pointer.split("/")[2] != "new" && pointer.split("/")[2] != "edit") {
                                                StoreCharText("/attributes/equipment", event.target.value, handleEquipmentChange(inventoryText, [equipmentValue[0], event.target.value, equipmentValue[2]]));
                                            } else if (pointer.split("/")[2] == "edit") {
                                                trackAccessoryWeaponChange();
                                            }
                                        }}
                                        minRows={2}
                                        maxRows={4}
                                        startDecorator = {
                                            <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
                                                <Hint props = 'gear' />
                                            </Box>
                                        }
                                        endDecorator = {
                                            <Typography level="body-xs" sx={{ ml: 'auto', color: 'black', fontFamily: 'PixelFont' }}>
                                            {equipmentValue[1]?.length} character(s)
                                            </Typography>
                                        }
                                        sx={{ 
                                            fontFamily: 'PixelFont',
                                            '--Textarea-focusedThickness': '0px',
                                            minWidth: 350, height: 280, 
                                            backgroundColor: 'antiquewhite', 
                                            color: "black",
                                            backgroundImage: 'url("/assets/pixilframe.png")',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: '800px',
                                            backgroundPosition: 'center'
                                        }}
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
                            
                                <Box
                                    className={`flex flex-row items-start justify-center translate-y-[1vh] ${previewImg === "" ? "border-2 border-dashed rounded-lg text-center max-w-[15vw] p-4" : "max-w-[15vw]"}`}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                    }}
                                    onDrop={(e) => {
                                        e.preventDefault();

                                        const file = e.dataTransfer.files[0];

                                        if (!file) return;

                                        if (!file.type.startsWith('image/')) {
                                            return;
                                        }
                                        
                                        // Update React State
                                        setEquipmentValue((oldArr) => {
                                            var newArr = Array.from(oldArr);
                                            newArr[newArr.length - 1] = file.name;

                                            // Save and Preview Image
                                            previewImage({fileName: file.name, equipmentType: equipmentType}, file);

                                            return newArr;
                                        });
                                        
                                        // Update Redux State
                                        if (equipmentType == "accessories") saveAccessory(true);
                                        else if (equipmentType == "mainhand") saveNewWeapon("mainhand");
                                        else if (equipmentType == "offhand") saveNewWeapon("offhand");
                                        else { 
                                            StoreCharText("/attributes/equipment", "", handleEquipmentChange(inventoryText, [equipmentValue[0], equipmentValue[1], file.name]))
                                        }; 
                                    }}
                                >
                                    {previewImg === "" && !imageLoading && (
                                    <Typography
                                        sx= {{ color: 'antiquewhite', fontFamily: 'PixelFont' }}
                                    >
                                        Drag and drop an image here
                                    </Typography>
                                    )}

                                    {(previewImg?.length === 63) && (
                                    <Box className='flex flex-row gap-2 items-center'>
                                        <img 
                                            src={previewImg} 
                                            className='max-w-[250px] max-h-[250px] w-auto h-auto object-contain' 

                                        />
                                        <IconButton 
                                            className="max-h-[10px]"
                                            variant="soft"
                                            color='warning'
                                            sx = {{ outline: 'none !important' }}
                                            onClick={() => { 
                                                setModalOpen(true);
                                                setModalText("Are you sure you want to remove this image?");
                                            }
                                        }

                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                    )}

                                    {imageLoading && (
                                    <CircularProgress color='info' />
                                    )}
                                </Box>                            
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
                                    var bool : boolean | null = null; 
                                    var isAccessory : boolean = pointer.split("/")[1] == "accessory"; 
                                    var isMainhand : boolean = pointer.split("/")[1] == "mainhand";
                                    
                                    if (isAccessory) bool = saveAccessory();
                                    else if (pointer.split("/")[0] == "weapon") {
                                        if (isMainhand) bool = saveNewWeapon("mainhand");
                                        else bool = saveNewWeapon("offhand");
                                    }

                                    if (bool) {
                                        setToggled(false);
                                        handlePointerChange(
                                            isAccessory ? "armor/accessory" : (isMainhand ? "weapon/mainhand" : "weapon/offhand")
                                            );
                                    } else {
                                        openAlert("One more of the fields have invalid input");
                                    }
                                } 
                                else if (modalText == "You still have an accessory in-progress. Go back to Armor overview?") {
                                    setToggled(false);
                                    setViewingAccessory(false);
                                    handlePointerChange("armor");
                                } 
                                else if (modalText == "You still have a weapon in-progress. Go back to Weapon overview?") {
                                    setToggled(false);
                                    setViewingWeapon(false);
                                    handlePointerChange("weapon");
                                }
                                else if (modalText == `Are you sure you want to discard your ${inventoryText}?`) {
                                    setToggled(false);
                                    if (inventoryText == "Mainhand Weapon") {
                                        handlePointerChange("weapon/mainhand");
                                    }
                                    else if (inventoryText == "Offhand Weapon") {
                                        handlePointerChange("weapon/offhand");
                                    }
                                    else if (pointer.split("/")[1] == "accessory") {
                                        handlePointerChange("armor/accessory");
                                    }
                                } else if (modalText == `Are you sure you want to delete this ${inventoryText}?`) {
                                    handlePointerChange("armor/accessory");
                                    setToggled(false);
                                    deleteAccessory();
                                }
                                else {
                                    // Saving changes
                                    var savingAccessory = pointer.split("/")[0] == "armor";
                                    var bool : boolean | null = savingAccessory 
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
                            <IconButton variant='soft' onClick={() => {setModalOpen(false)}}>
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