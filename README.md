# react-multi-busy

> React Context library for controlling multiple busy states (spinners, progress bars, etc.) in an application

[![NPM](https://img.shields.io/npm/v/react-multi-busy.svg)](https://www.npmjs.com/package/react-multi-busy) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[Examples](https://ravenhurst.github.io/react-multi-busy)

## Install

```bash
npm install --save react-multi-busy
```

## Usage

Wrap your component tree w/ the `MultiBusyProvider`:
```jsx
import ReactDOM from 'react-dom'
import { MultiBusyProvider } from 'react-multi-busy'
ReactDOM.render(
  <CssBaseline>
    <MultiBusyProvider>
      <App />
    </MultiBusyProvider>
  </CssBaseline>,
  document.getElementById('root')
)
```
Implement the `useMultiBusy` custom hook in any component that you want to control the busy state for:
```jsx
import { useMultiBusy } from 'react-multi-busy'

export const SomeComponent = () => {
  const {isBusy, startBusy, endBusy} = useMultiBusy()
  const busy = isBusy()
  return <Button {...{
    color: 'primary',
    variant: 'contained',
    onClick: goFetchSomething(startBusy, endBusy)
  }} >
    <span>{
      `${ busy ? 'I\'m busy' : 'Click Me' }`
    }</span>
    { busy && <CircularProgress {...{
      size: '1em',
    }} /> }
  </Button>
}
```
Finally, make `startBusy() and endBusy()` methods available to whatever it is that you want to use to control the state of:
```jsx
// This could easily be a redux-thunk
const goFetchSomething = (startBusy, endBusy) => async () => {
  startBusy()
  const result = await someService()
  endBusy()
  return result
}
```

## License

MIT © [RavenHursT](https://github.com/RavenHursT)
