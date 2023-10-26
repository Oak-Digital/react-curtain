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
