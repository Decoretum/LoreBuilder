import store from '../Redux/store'

export default function StoreCharText (textType : string, text : string) {
    let state = store.getState();
    // First Page
    if (textType === '/origins/present') {
        store.dispatch({
            type: 'char/editOrigins',
            payload: {
                origins : {
                    ...state.char.origins,
                    present: text,
                }
            }
        })
    } else if (textType === '/attributes/physicalInfo') {
        store.dispatch({
            type: 'char/editAttributes',
            payload: {
                attributes : {
                    ...state.char.attributes,
                    physicalInfo : text,
                }
            }
        }) // 2nd Page
    } else if (textType === '/attributes/personality') {
        store.dispatch( {
            type: 'char/editAttributes',
            payload: {
                attributes: {
                    ...state.char.attributes,
                    personality : text
                }
            }
        })
    } else if (textType === '/origins/past') {
        store.dispatch( {
            type: 'char/editOrigins',
            payload: {
                origins: {
                    ...state.char.origins,
                    past : text
                }
            }
        }) // Third Page
    } 

    
    
}