import { FC, useMemo, useState } from 'react';
import { Curtain } from '../../components';
import { CurtainContext, CurtainContextProvider, useCurtainContext } from './context';

export interface CurtainContextComponentProps {
    withContexts?: boolean;
}

export const CurtainContextComponent = ({ withContexts = true }: CurtainContextComponentProps) => {
    return (
        <CurtainContextProvider>
            <CurtainContextComponentInner withContexts={withContexts} />
        </CurtainContextProvider>
    );
};

export const CurtainContextComponentInner = ({ withContexts }: CurtainContextComponentProps) => {
    const [visible, setVisible] = useState(false);
    const onClick = async () => {
        setVisible(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setVisible(false);
    };

    const memoedContexts = useMemo(() => (withContexts ? [CurtainContext] : []), [withContexts]);

    return (
        <div>
            <Curtain visible={visible} contexts={memoedContexts}>
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
