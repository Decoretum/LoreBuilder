import store from '../Redux/store'

export type equipmentObject = {
    equipmentType: string,
    equipmentValue: Array<string>
};

export default function StoreCharText (textType : string, text : string, equipmentObject?: equipmentObject) {
    let state = store.getState();
    console.log(equipmentObject)
    switch (textType) {

        // First Page
        case '/origins/present':
                store.dispatch({
                    type: 'char/editOrigins',
                    payload: {
                        origins: {
                            ...state.char.origins,
                            present: text  
                        }
                    }
                })
            break;
            
        case '/attributes/physicalInfo':
                store.dispatch({
                    type: 'char/editAttributes',
                    payload: {
                        attributes : {
                            ...state.char.attributes,
                            physicalInfo : text
                        }
                    }
                })
                
            break;

        // Second Page
        case '/attributes/personality':
            store.dispatch({
                type: 'char/editAttributes',
                payload: {
                    attributes: {
                        ...state.char.attributes,
                        personality : text
                    }
                }
            })
            break;

        case '/origins/past':
            store.dispatch({
                type: 'char/editOrigins',
                payload: {
                    origins: {
                        ...state.char.origins,
                        past : text
                    }
                }
            });
            break;

        // Third Page
        case '/attributes/skills':
            store.dispatch({
                type: 'char/editAttributes',
                payload: {
                    attributes: {
                        ...state.char.attributes,
                        skills : text
                    }
                }
            }) 
            break;

        case '/attributes/magic':
            store.dispatch({
                type: 'char/editAttributes',
                payload: {
                    attributes: {
                        ...state.char.attributes,
                        magic : text
                    }
                }
            }) 
            break;
        
        case '/attributes/strength':
            store.dispatch({
                type: 'char/editAttributes',
                payload: {
                    attributes: {
                        ...state.char.attributes,
                        strength : text
                    }
                }
            }) 
            break;
        
            // 4th Page
        case "/attributes/equipment":
            if (equipmentObject != undefined) {
                var eProp : string = equipmentObject["equipmentType"];
                var eTitle : string = equipmentObject["equipmentValue"][0];
                var eVal : string = equipmentObject["equipmentValue"][1];
                console.log(equipmentObject)
                if (equipmentObject.equipmentType == "accessories") {
                    var name = equipmentObject.equipmentValue[0];
                    var desc = equipmentObject.equipmentValue[1];
                    var imgPath = equipmentObject.equipmentValue[2] ?? null;
                    var hm : Map<string, Array<string>> = store.getState().char.attributes.equipment.accessories;
                    hm.set(name, [desc, imgPath]);

                    // Add Handler for duplicate Accessory Name
                    store.dispatch({
                        type: "char/editAttributes",
                        payload: {
                            attributes: {
                                equipment: {
                                    ...state.char.attributes.equipment,
                                    accessories: hm
                                }
                            }
                        }
                    })
                }

                else 
                store.dispatch({
                    type: "char/editAttributes",
                    payload: {
                        attributes: {
                            equipment: {
                                ...state.char.attributes.equipment,
                                equipmentObject
                            }
                        }
                    }
                })
                }
            break;
    }
}