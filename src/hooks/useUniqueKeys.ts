import {useState} from "react";
import stringHash from '@sindresorhus/string-hash';

function useUniqueKeys(uniqueKey: string, count: number) {
    const [keys, setKeys] = useState<string[]>();

    if (!keys) {
        const array = new Array<string>(count);
        for (let i = 0; i < array.length; ++i) {
            array[i] = stringHash(`${uniqueKey}${i}`).toString();
        }
        setKeys(array);
    }

    return keys as string[];
}

export default useUniqueKeys;