import {createContext, useContext, useEffect, useState} from 'react';
import {mockedResponse} from "@/constants";
import Cookies from "js-cookie";

const AppContext = createContext({});

export function AppWrapper({children}: any) {
    // https://nextjs.org/docs/messages/react-hydration-error
    const [tests, setTests] = useState({})

    const testKeys = Object.keys(mockedResponse);
    const activeTests = testKeys.reduce(
        (accumulator, currentValue) => {
            const testValue = Cookies.get(currentValue);

            if (testValue) {
                return {[currentValue]: testValue, ...accumulator};
            }

            return accumulator;
        },
        {}
    );

    useEffect(() => setTests(activeTests), [])

    return (
        // @ts-ignore
        <AppContext.Provider value={tests}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
