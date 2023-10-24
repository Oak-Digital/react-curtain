import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import useStateMachine, { t } from '@cassiozen/usestatemachine';

export interface CurtainProps {
    autoSwitch?: boolean;
    /**
     * Whether or not the curtain is visible, while visible the children will not be replaced until the curtain is overlapping everything.
     * This can for example be turned on once you start a route navigation.
     */
    visible?: boolean;
    /**
     * The element(s) that will be shown on top of the curtain
     */
    curtainChildren?: ReactNode;
    /**
     * The class name that will be applied to the curtain element
     */
    curtainClassName?: string;
    /**
     * Duration in seconds
     */
    duration?: number;
    children?: ReactNode;
};

const Curtain = ({
    children,
    autoSwitch = false,
    visible = false,
    curtainChildren,
    curtainClassName,
    duration = 0.45,
}: CurtainProps) => {
    const childrenQueue = useRef<ReactNode[]>([]);
    const [currentChildren, setCurrentChildren] = useState(children);
    const [counterId, setCounterId] = useState(0);

    const curtainVariants = useMemo(
        () =>
        ({
            enter: {
                left: 0,
                right: '100%',
            },
            center: {
                left: 0,
                right: 0,
                transition: {
                    duration,
                },
            },
            exit: {
                left: '100%',
                right: 0,
                transition: {
                    duration,
                },
            },
        } satisfies Variants),
        [duration]
    );

    const [state, send] = useStateMachine({
        initial: 'waiting',
        schema: {
            context: t<{
                externalVisible: boolean;
            }>(),
        },
        context: {
            externalVisible: visible,
        },
        states: {
            waiting: {
                on: {
                    START: 'entering',
                },
                effect() {
                    setCounterId((id) => id + 1);
                },
            },
            entering: {
                on: {
                    CENTER: 'center',
                },
            },
            center: {
                on: {
                    EXIT: {
                        target: 'waiting',
                        guard({ context }) {
                            return !context.externalVisible;
                        },
                    },
                },
                effect({ context, send }) {
                    send('EXIT');

                    return ({ context, send }) => {
                        const newChildren = childrenQueue.current.pop() || currentChildren;
                        setCurrentChildren(newChildren);
                        childrenQueue.current = [];
                    };
                },
            },
        },
    });

    useEffect(() => {
        if (children === currentChildren || childrenQueue.current.includes(children)) {
            return;
        }

        childrenQueue.current.push(children);
        if (autoSwitch) {
            send('START');
        } else if (!visible) {
            setCurrentChildren(children);
            childrenQueue.current = [];
        }
    }, [children, autoSwitch]);

    useEffect(() => {
        state.context.externalVisible = visible;

        if (visible) {
            send('START');
        } else {
            send('EXIT');
        }
    }, [visible]);

    return (
        <>
            <AnimatePresence mode="sync">
                {state.value !== 'waiting' && (
                    <motion.div
                        key={counterId}
                        variants={curtainVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className={curtainClassName}
                        style={{ position: 'fixed', top: 0, bottom: 0 }}
                        onAnimationComplete={(animationName) => {
                            if (animationName === 'center') {
                                send('CENTER');
                            }
                        }}
                    >
                        {curtainChildren}
                    </motion.div>
                )}
            </AnimatePresence>
            {currentChildren}
        </>
    );
};

export default Curtain;
