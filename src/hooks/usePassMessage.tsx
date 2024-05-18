import React, {ReactElement, useState} from "react";
import PassMessage from "../components/PassMessage";

function usePassMessage(seconds: number): [ReactElement, () => void, (callback: () => void) => void] {
    const [isVisible, setIsVisible] = useState(false);
    const [afterHideCallback, setAfterHideCallback] = useState<() => void>();

    function show() {
        setIsVisible(true);
        let timer = setTimeout(() => {
            setIsVisible(false);
            afterHideCallback?.();
            clearTimeout(timer);
        }, seconds * 1000);
    }

    function setHideCallback(callback: () => void) {
        setAfterHideCallback(() => callback);
    }

    return [<PassMessage isVisible={isVisible}/>, show, setHideCallback];
}

export default usePassMessage;