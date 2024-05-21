import React, {useCallback, useEffect, useRef, useState} from 'react';
import PageWrapper from "../components/PageWrapper";
import PauseButton from "../components/PauseButton";
import usePauseMenu from "../hooks/usePauseMenu";
import {useTimer} from "../hooks/useTimer";
import useFailMessage from "../hooks/useFailMessage";
import usePassMessage from "../hooks/usePassMessage";
import Score from "../components/Score";
import Timer from "../components/Timer";
import {formatTime} from "../lib/TimeFormatter";
import RectButton from "../components/RectButton";
import styled from "styled-components";
import useUniqueKeys from "../hooks/useUniqueKeys";
import {getRandomInt} from "../lib/Random";
import {Simulate} from "react-dom/test-utils";
import pause = Simulate.pause;

const StyledWrapper = styled(PageWrapper)`
    background: #0c151a;
`;

const StyledGrid = styled.div`
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 90%;
    display: grid;
    padding: 10px;
    gap: 10px;
    align-items: center;
    grid-template-columns: repeat(auto-fill, 75px);
    grid-template-rows: repeat(auto-fill, 75px);
    justify-content: center;
`;

export interface ButtonData {
    selected?: boolean;
    render?: boolean;
}

const MemorySweepPage = () => {
    const [cellCount, setCellCount] = useState(0);
    const keys = useUniqueKeys(MemorySweepPage.name, cellCount);
    const [buttons, setButtons] = useState<Array<ButtonData>>([]);
    const [minutes, seconds, timerStart, timerPause, timerRestart, onExpire] = useTimer({minutes: 5});
    const [score, setScore] = useState<number>(0);
    const selectedCount = useRef(0);
    const guessedCount = useRef(0);
    const usedButtons = useRef<number[]>([]);
    const [pauseMenuPlaceholder, showPauseMenu, pauseMenuIsVisible] = usePauseMenu();
    const [failMessagePlaceholder, showFailMessage, onFailMessageHide] = useFailMessage(1);
    const [passMessagePlaceholder, showPassMessage, onPassMessageHide] = usePassMessage(1);


    function onButtonClick(index: number) {

        if (usedButtons.current.includes(index)) return;
        usedButtons.current.push(index);

        if (buttons[index].selected) {
            setScore(prev => prev + 10);
            guessedCount.current += 1;
        }

        //console.log(clickedCount.current, selectedCount.current)
        if (usedButtons.current.length >= selectedCount.current) {
            setButtons([]);
            if (guessedCount.current === selectedCount.current) {
                showPassMessage();
                return;
            }
            showFailMessage();
        }
    }

    function generateLevel() {

        let length = getRandomInt(16, cellCount);
        length -= + (length % 4);

        selectedCount.current = getRandomInt(4, length / 2);
        const array = new Array<ButtonData>(cellCount).fill({});
        const used = new Array<number>();
        let start = Math.floor((cellCount - length) * 0.5);
        start += start % 4;
        let end = start + length;
        if (end > cellCount) {
            end = cellCount;
            start = 0;
        }

        for (let i = start; i < end; ++i) {
            array[i] = {render: true};
        }

        if (end === cellCount) end -= 1;

        let generatedCount = 0;
        while (generatedCount < selectedCount.current) {
            const index = getRandomInt(start, end);
            if (used.includes(index)) continue;
            used.push(index);
            array[index].selected = true;
            ++generatedCount;
        }

        setButtons(array);
    }

    function restart() {
        guessedCount.current = 0;
        usedButtons.current = [];
        generateLevel();
        timerRestart();
    }

    const onGridInit = useCallback((layout: HTMLDivElement) => {
        if (layout == null) return;
        const columnCount = window.getComputedStyle(layout).gridTemplateColumns.split(" ").length;
        const rowsCount = window.getComputedStyle(layout).gridTemplateRows.split(" ").length;
        setCellCount(columnCount * rowsCount);
    }, []);

    useEffect(() => {
        if (!cellCount) return;

        onFailMessageHide(() => {
            setScore(0);
            restart();
        })

        onPassMessageHide(() => {
            restart();
        })

        onExpire(() => {
            showFailMessage();
        })

        generateLevel();
        timerStart();
    }, [cellCount]);

    useEffect(() => {
        if (!cellCount) return;
        if (pauseMenuIsVisible) timerPause();
        else timerStart();
    }, [pauseMenuIsVisible]);

    return (
        <StyledWrapper>
            {failMessagePlaceholder}
            {passMessagePlaceholder}
            {pauseMenuPlaceholder}
            <PauseButton onClick={showPauseMenu} aria-disabled={pauseMenuIsVisible}/>
            <Score count={score}/>
            <Timer>{formatTime(minutes, seconds)}</Timer>
            <StyledGrid ref={onGridInit}>
                {buttons.map((item, index) => item.render
                    ? <RectButton key={keys[index]} onClick={() => onButtonClick(index)} selected={item.selected}/>
                    : <div key={keys[index]} />)}
            </StyledGrid>
        </StyledWrapper>
    );
};

export default MemorySweepPage;