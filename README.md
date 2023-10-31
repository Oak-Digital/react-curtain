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

To provide a "fake" context you can use the `childrenWrapper` prop ([example](./src/stories/CurtainContext/index.tsx)) and provide a function that renders the current context.

```tsx
const { counter, incrementCounter } = useMyContext();

return (
    <Curtain childrenWrapper={
        useCallback((c: ReactNode) => (
            <MyContext.Provider
                value={{
                    counter,
                    incrementCounter,
                }}
            >
                {c}
            </MyContext.Provider>
        ), [counter, incrementCounter])
    }>
        <div>
            {/* Button that renders counter from context */}
            <Button onClick={onClick} />
        </div>
    </Curtain>
)
```
