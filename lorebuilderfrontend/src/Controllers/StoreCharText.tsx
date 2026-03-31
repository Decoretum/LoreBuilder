import store from '../Redux/store'

type equipmentObject = {
    equipmentType: string,
    equipmentValue: string
};

export default function StoreCharText (textType : string, text : string, equipmentObject?: equipmentObject) {
    let state = store.getState();
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
                var eVal : string = equipmentObject["equipmentValue"];
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