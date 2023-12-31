# react-curtain

React curtain can be used as a page transition, by hiding all your content behind a curtain and then switching out the components.
React curtain will not switch out it's children while transitioning, thus reducing complexity in your application.

## Getting started

```
# pnpm, npm or yarn
pnpm install @oak-digital/react-curtain framer-motion
```

In your component, import the `Curtain` component and the css. Make sure to import this library's css before your own so that you may overwrite the styles.

```tsx
import { Curtain } from '@oak-digital/react-curtain'
import '@oak-digital/react-curtain/dist/style.css'

const Layout = ({ children, isLoading }) => {
    return (
        <Curtain visible={isLoading}>
            {children}
        </Curtain>
    )
}

export default Layout
```

## API

See [storybook](https://oak-digital.github.io/react-curtain/) for description of props

## Note about context

If a context changes, `react-curtain` will render the updated context immediatly. To avoid this, you should provide a "fake" context, that `react-curtain` will make sure only lives while animating the curtain.

To make `react-curtain` use a "fake" context, you should use the `contexts` prop ([example](./src/stories/CurtainContext/index.tsx)) and provide the contexts.

The following example shows how the context can be updated at the same time as the curtain should be visible, but it will still show the old state of the context, since the context was provided in the `contexts` prop.

```tsx
import { Curtain } from '@oak-digital/react-curtain'
import '@oak-digital/react-curtain/dist/style.css'

// This should either be defined outside of render function
// or as a useMemo to avoid unnecessary reruns of useEffect.
const contexts = [MyContext];

const Layout = () => {
    const { counter, incrementCounter } = useMyContext(); // This is just to show what the context provides
    const [visible, setVisible] = useState(false);

    const onClick = async () => {
        incrementCounter();
        setVisible(true);

        // wait 1000ms before hiding the curtain again
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setVisible(false);
    };

    return (
        <Curtain contexts={contexts} visible={visible}>
            <div>
                {/* Button that renders counter from context */}
                <Button onClick={onClick} />
            </div>
        </Curtain>
    );
}
```
