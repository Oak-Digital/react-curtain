import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

export interface CurtainContextValue {
    counter: number;
    incrementCounter: () => void;
}

export const CurtainContext = createContext<CurtainContextValue>({} as CurtainContextValue);

export const useCurtainContext = () => {
    const context = useContext(CurtainContext);
    return context;
};

export const CurtainContextProvider = ({ children }: { children: ReactNode }) => {
    const [counter, setCounter] = useState(0);
    const incrementCounter = useCallback(() => {
        setCounter((prev) => prev + 1);
    }, []);

    const value: CurtainContextValue = {
        counter,
        incrementCounter,
    };

    return <CurtainContext.Provider value={value}>{children}</CurtainContext.Provider>;
};
