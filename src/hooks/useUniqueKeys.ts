import {useMemo} from "react";
import stringHash from '@sindresorhus/string-hash';

function useUniqueKeys(uniqueKey: string, count: number) {
    return useMemo(() => {
        const array = new Array<string>(count);
        for (let i = 0; i < array.length; ++i) {
            array[i] = stringHash(`${uniqueKey}${i}`).toString();
        }
        return array;
    }, [uniqueKey, count]);
}

export default useUniqueKeys;