import {useEffect, useRef, useState} from "react";

export interface TimerOption {
    minutes?: number;
    seconds?: number;
}

export function useTimer({minutes = 0, seconds = 0}: TimerOption): [number, number, () => void, () => void, () => void, (callback: () => void) => void] {
    const [currentTime, setCurrentTime] = useState<number>(minutes * 60 + seconds);
    const onExpire = useRef<() => void>();
    const timer = useRef<NodeJS.Timer>();

    const start = () => {
        timer.current = setInterval(() => {
            setCurrentTime(prev => {
                if (prev === 0){
                    clearInterval(timer.current);
                    onExpire.current?.()
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const pause = () => {
        clearInterval(timer.current);
    }

    const restart = () => {
        setCurrentTime(minutes * 60 + seconds);
        start();
    }

    const setExpireCallback = (callback: () => void) => {
        onExpire.current = callback;
    };

    useEffect(() => {
        return () => clearInterval(timer.current);
    }, []);

    return [Math.floor(currentTime / 60), currentTime % 60, start, pause, restart, setExpireCallback];
}