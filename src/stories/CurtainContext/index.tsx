import { FC, ReactNode, useCallback, useState } from 'react';
import { Curtain } from '../../components';
import { CurtainContext, CurtainContextProvider, useCurtainContext } from './context';

export interface CurtainContextComponentProps {
    withChildrenWrapper?: boolean;
}

export const CurtainContextComponent = ({ withChildrenWrapper = true }: CurtainContextComponentProps) => {
    return (
        <CurtainContextProvider>
            <CurtainContextComponentInner withChildrenWrapper={withChildrenWrapper} />
        </CurtainContextProvider>
    );
};

export const CurtainContextComponentInner = ({ withChildrenWrapper }: CurtainContextComponentProps) => {
    const { counter, incrementCounter } = useCurtainContext();
    const [visible, setVisible] = useState(false);
    const onClick = async () => {
        setVisible(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setVisible(false);
    };
    const wrapperFunction = useCallback(
        (c: ReactNode) => (
            <CurtainContext.Provider
                value={{
                    counter,
                    incrementCounter,
                }}
            >
                {c}
            </CurtainContext.Provider>
        ),
        [counter, incrementCounter]
    );
    return (
        <div>
            <Curtain visible={visible} childrenWrapper={withChildrenWrapper ? wrapperFunction : undefined}>
                <div style={{ textAlign: 'right' }}>
                    <Button onClick={onClick} />
                </div>
            </Curtain>
        </div>
    );
};

type ButtonProps = {
    onClick: () => void;
};

const Button: FC<ButtonProps> = ({ onClick }) => {
    const { counter, incrementCounter } = useCurtainContext();
    const internalOnClick = () => {
        incrementCounter();
        onClick();
    };
    return <button onClick={internalOnClick}>Clicked: {counter}</button>;
};
