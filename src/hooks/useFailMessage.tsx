import React, {ReactElement, useState} from "react";
import FailMessage from "../components/FailMessage";

function useFailMessage(seconds: number): [ReactElement, () => void, (callback: () => void) => void] {
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

    return [<FailMessage isVisible={isVisible}/>, show, setHideCallback];
}

export default useFailMessage;