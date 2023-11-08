import { Context, FC, PropsWithChildren, useMemo } from 'react';
import { FakeContext } from './FakeContext';

type Props = PropsWithChildren<{
    locked?: boolean;
    contexts?: Context<unknown>[];
}>;

export const FakeContexts: FC<Props> = ({ locked = false, contexts, children }) => {
    const renderedContexts = useMemo(
        () =>
            (contexts ?? []).reduceRight((acc, context) => {
                return (
                    <FakeContext locked={locked} context={context}>
                        {acc}
                    </FakeContext>
                );
            }, children),
        [contexts, locked, children]
    );

    return <>{renderedContexts}</>;
};
