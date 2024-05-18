import {ReactElement, useState} from "react";
import PauseMenu from "../components/PauseMenu";

function usePauseMenu(): [ReactElement, () => void, boolean] {
    const [isVisible, setIsVisible] = useState(false);

    function show() {
        setIsVisible(true);
    }

    return [<PauseMenu isVisible={isVisible} setIsVisible={setIsVisible}/>, show, isVisible]
}

export default usePauseMenu;