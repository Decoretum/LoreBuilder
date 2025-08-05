import store from '../Redux/store'

export default function StoreCharText (textType : string, text : string) {
    let state = store.getState();
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
        })
    }

    
    
}