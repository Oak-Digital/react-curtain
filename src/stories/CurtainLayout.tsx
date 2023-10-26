import { useState } from 'react';

import { Curtain, CurtainProps } from '../components/Curtain';

export const Layout = (props: CurtainProps) => {
    const [counter, setCounter] = useState(0);
    const [visible, setVisible] = useState(false);
    const updateCounter = async () => {
        setCounter((c) => c + 1);
        setVisible(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setVisible(false);
    };

    return (
        <div>
            <header>
                This is a header that will not be overlapped by absolute curtain
            </header>
            <div style={{
                position: 'relative',
            }}>

                <Curtain {...props} visible={visible}>
                    This is the page contents: {counter}
                    <br />
                    <button onClick={updateCounter}>
                        Click me to increment the counter
                    </button>
                </Curtain>
            </div>
        </div>
    );
};
