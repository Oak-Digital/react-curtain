import { Context, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';

type Props<T> = PropsWithChildren<{
    context: Context<T>;
    locked?: boolean;
}>;

export function FakeContext<T>({ context, locked = false, children }: Props<T>) {
    const contextData = useContext(context);
    const [currentContextData, setCurrentContextData] = useState({ ...contextData });

    useEffect(() => {
        if (locked) {
            return;
        }

        setCurrentContextData({ ...contextData });
    }, [locked, contextData]);

    return (
        <context.Provider value={locked ? currentContextData : contextData}>{children}</context.Provider>
    );
}
