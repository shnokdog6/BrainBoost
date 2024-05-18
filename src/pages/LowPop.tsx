import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import background from "../images/background.jpg";
import OctagonButton from "../components/OctagonButton";
import PauseButton from "../components/PauseButton";
import Score from "../components/Score";
import useFailMessage from "../hooks/useFailMessage";
import usePauseMenu from "../hooks/usePauseMenu";
import useUniqueKeys from "../hooks/useUniqueKeys";
import usePassMessage from "../hooks/usePassMessage";

const StyledWrapper = styled.div`
    width: 100%;
    height: 100%;
    background: url(${background}) no-repeat;
    background-size: cover;
    position: relative;
`;

const StyledGrid = styled.div`
    display: grid;
    height: 100%;
    padding: 40px 10px 10px 10px;
    gap: 10px;
    align-items: center;
    grid-template-columns: repeat(auto-fill, 100px);
    grid-template-rows: repeat(auto-fill, 100px);
    justify-content: center;
`;


function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const LowPop = () => {
    const [pauseMenuPlaceholder, showPauseMenu, pauseMenuIsVisible] = usePauseMenu();
    const keys = useUniqueKeys(LowPop.name, 21);
    const [buttons, setButtons] = useState<Array<number | null>>([]);
    const [cellCount, setCellCount] = useState(0);
    const [numbers, setNumbers] = useState<number[]>([]);
    const [score, setScore] = useState(0);
    const grid = useRef<HTMLDivElement>(null);
    const [failMessagePlaceholder, showFailMessage, onFailMessageHide] = useFailMessage(1);
    const [passMessagePlaceholder, showPassMessage, onPassMessageHide] = usePassMessage(1);

    function onButtonClick(id: number, content: number) {


        const newButtons = [...buttons];
        newButtons[id] = null;
        setButtons(newButtons);

        if (numbers[0] !== content) {
            showFailMessage();
            return;
        }

        setScore(prev => prev + 10);
        if (numbers.length === 1) {
            showPassMessage();
            return;
        }

        setNumbers(numbers.slice(1, numbers.length));


    }

    function generateSubsequence() {
        const count = getRandomInt(5, 16);
        console.log(cellCount);
        const array: Array<number | null> = new Array<number | null>(cellCount).fill(null);
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
    }

    function generateLevel() {
        const subsequence = generateSubsequence();
        console.log(subsequence);
        setNumbers((subsequence
            .filter(item => item != null) as number[])
            .sort((a, b) => a - b)
        );
        setButtons(subsequence);
    }


    useEffect(() => {
        const layout = grid.current;
        if (layout == null) return;
        const columnCount =  window.getComputedStyle(layout).gridTemplateColumns.split(" ").length;
        const rowsCount = window.getComputedStyle(layout).gridTemplateRows.split(" ").length;

        setCellCount(columnCount * rowsCount);

        onFailMessageHide(() => {
            setScore(0);
            generateLevel();
        });
        onPassMessageHide(() => {
            generateLevel();
        })
    }, [grid.current]);

    useEffect(() => {
        if (!cellCount) return;
        generateLevel();
    }, [cellCount]);

    return (
        <StyledWrapper>
            {failMessagePlaceholder}
            {passMessagePlaceholder}
            {pauseMenuPlaceholder}
            <PauseButton onClick={showPauseMenu} aria-disabled={pauseMenuIsVisible}/>
            <Score count={score}/>
            <StyledGrid ref={grid}>
                {buttons.map((item, index) => {
                        if (item) {
                            return <OctagonButton key={keys[index]} onClick={() => onButtonClick(index, item)}>
                                {item}
                            </OctagonButton>
                        }
                        return <OctagonButton key={keys[index]} disabled/>
                    }
                )}
            </StyledGrid>
        </StyledWrapper>
    );
};

export default LowPop;