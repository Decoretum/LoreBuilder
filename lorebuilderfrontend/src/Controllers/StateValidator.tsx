import { NavigateFunction } from "react-router-dom";
import store from '../Redux/store'

type comp  = {
    class: 'attributes' | 'origins',
    field: string
}
type stateArr = Array<comp>

export default function StateValidator(nav : NavigateFunction, arrFunctions : Array<Function>, arr : stateArr, nextPath : string) {
    let bad = ' ' || null || '';
    let state = store.getState();
    console.log(arr)
    console.log(arrFunctions);

    // Iterate through the states
    for (let i = 0; i <= Object.keys(arr).length - 1; i++) {
        let val = state['char'][arr[i].class][arr[i].field].trim();
        if (val === bad || val.length === 0) {
            arrFunctions[1]();
            return;
        }
    }
    arrFunctions[0]();
    nav(nextPath);
    
}