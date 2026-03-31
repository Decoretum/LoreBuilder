import store from '../Redux/store'

export default function StoreCharText (textType : string, text : string, equipment? : object) {
    let state = store.getState();
    console.log(textType)
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
            store.dispatch({
                type: "char/editAttributes",
                payload: {
                    attributes: {
                        ...state.char.attributes,
                        equipment: equipment
                    }
                }
            })
            break;
    }
}