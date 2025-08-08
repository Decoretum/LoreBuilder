import { NavigateFunction } from "react-router-dom";

export default function GoBack(path: string, nav: NavigateFunction) {
    nav(path);
}