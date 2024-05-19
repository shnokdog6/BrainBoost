import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import background from "../images/background.jpg";
import OctagonButton from "../components/OctagonButton";
import PauseButton from "../components/PauseButton";
import Score from "../components/Score";
import useFailMessage from "../hooks/useFailMessage";
import usePauseMenu from "../hooks/usePauseMenu";
import useUniqueKeys from "../hooks/useUniqueKeys";
import usePassMessage from "../hooks/usePassMessage";
import {setLowPopScore} from "../models/userSlice";
import {useAppDispatch} from "../store";

const StyledWrapper = styled.div`
    width: 100%;
    height: 100%;
    background: url(${background}) no-repeat;
    background-size: cover;
    position: relative;
`;

const StyledGrid = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: grid;
    height: 95%;
    padding: 10px;
    gap: 10px;
    align-items: center;
    grid-template-columns: repeat(auto-fill, 100px);
    grid-template-rows: repeat(auto-fill, 100px);
    justify-content: center;
`;

type ButtonState = "visible" | "hidden" | "switch";

interface ButtonData {
    value: number | null;
    state: ButtonState;
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const LowPop = () => {
    const [buttons, setButtons] = useState<ButtonData[]>([]);
    const [cellCount, setCellCount] = useState(0);
    const keys = useUniqueKeys(LowPop.name, cellCount);
    const [numbers, setNumbers] = useState<number[]>([]);
    const [score, setScore] = useState<number>(0);
    const scoreRef = useRef(score);
    const [failMessagePlaceholder, showFailMessage, onFailMessageHide] = useFailMessage(1);
    const [passMessagePlaceholder, showPassMessage, onPassMessageHide] = usePassMessage(1);
    const [pauseMenuPlaceholder, showPauseMenu, pauseMenuIsVisible] = usePauseMenu();
    const dispatch = useAppDispatch();

    function onButtonClick(id: number, content: number) {
        if (numbers[0] !== content) {
            showFailMessage();
            setButtons(new Array(cellCount).fill({value: null, state: "hidden"}));
            return;
        }

        setScore(prev => prev + 10);
        if (numbers.length === 1) {
            showPassMessage();
            setButtons(new Array(cellCount).fill({value: null, state: "hidden"}));
            return;
        }

        setNumbers(numbers.slice(1, numbers.length));
        const newButtons = [...buttons];
        newButtons[id] = {value: null, state: "switch"};
        setButtons(newButtons);

    }

    const generateSubsequence = (size: number) => {
        const count = getRandomInt(5, 10);
        const array: Array<number | null> = new Array<number | null>(size).fill(null);
        const used = new Array<number>();

        let generatedCount = 0;
        while (generatedCount < count) {
            const index = getRandomInt(0, array.length - 1);
            if (used.includes(index)) continue;
            used.push(index);
            array[index] = getRandomInt(-100, 100);
            generatedCount++;
        }
        return array;
    };

    const generateLevel = (size: number) => {
        const subsequence = generateSubsequence(size);
        setNumbers((subsequence
            .filter(item => item != null) as number[])
            .sort((a, b) => a - b)
        );
        setButtons(subsequence.map(item => ({value: item, state: item ? "visible" : "hidden"})));
    };

    useEffect(() => {
        if (!cellCount) return;

        onFailMessageHide(() => {
            setScore(0);
            generateLevel(cellCount);
        });
        onPassMessageHide(() => {
            generateLevel(cellCount);
        });

        generateLevel(cellCount);
        // eslint-disable-next-line
    }, [cellCount]);

    useEffect(() => {
        scoreRef.current = score;
    }, [score]);

    const initCellCount = useCallback((layout: HTMLDivElement) => {
        if (layout == null) return;
        const columnCount = window.getComputedStyle(layout).gridTemplateColumns.split(" ").length;
        const rowsCount = window.getComputedStyle(layout).gridTemplateRows.split(" ").length;
        setCellCount(columnCount * rowsCount);
    }, []);

    useEffect(() => {
        return () => {
            dispatch(setLowPopScore(scoreRef.current));
        }
        // eslint-disable-next-line
    }, []);

    return (
        <StyledWrapper>
            {failMessagePlaceholder}
            {passMessagePlaceholder}
            {pauseMenuPlaceholder}
            <PauseButton onClick={showPauseMenu} aria-disabled={pauseMenuIsVisible}/>
            <Score count={score}/>
            <StyledGrid ref={initCellCount}>
                {buttons.map((item, index) => {
                    switch (item.state) {
                        case "visible":
                            return (
                                <OctagonButton key={keys[index]}
                                               onClick={() => onButtonClick(index, item.value as number)}>
                                    {item.value}
                                </OctagonButton>
                            );
                        case "switch":
                            return (<OctagonButton key={keys[index]}/>);
                        default:
                            return <div key={keys[index]}/>
                    }
                })}
            </StyledGrid>
        </StyledWrapper>
    );
};

export default LowPop;