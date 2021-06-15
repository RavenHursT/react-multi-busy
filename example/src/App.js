import React from 'react'
import { Box, Button, CircularProgress, Link, makeStyles } from '@material-ui/core'
import { useMultiBusy } from 'react-multi-busy'

const someService = async () => await new Promise(
  resolve => {
    setTimeout(() => {
      resolve('DONE')
    }, 1000)
  }
)

// This could easily be an action-thunk
const goFetchSomething = (startBusy, endBusy) => async () => {
  startBusy()
  const result = await someService()
  endBusy()
  return result
}

const useComponentStyles = makeStyles(theme => ({
  progress: {
    color: theme.palette.grey[500],
    marginLeft: theme.spacing(1)
  }
}))
const SomeComponent = () => {
  const classes = useComponentStyles()
  const {isBusy, startBusy, endBusy} = useMultiBusy()
  return <Button {...{
    color: 'primary',
    variant: 'contained',
    disabled: isBusy,
    onClick: goFetchSomething(startBusy, endBusy)
  }} >
    <span>{
      `${ isBusy ? 'I\'m busy' : 'Click Me' }`
    }</span>
    { isBusy && <CircularProgress {...{
      size: '1em',
      className: classes.progress
    }} /> }
  </Button>
}

const SomeOtherComponent = () => {
  const classes = useComponentStyles()
  const {isBusy, startBusy, endBusy} = useMultiBusy()
  return <Button {...{
    color: 'primary',
    variant: 'contained',
    disabled: isBusy,
    onClick: goFetchSomething(startBusy, endBusy)
  }} >
    <span>{
      `${ isBusy ? 'I\'m busy' : 'Click Me' }`
    }</span>
    { isBusy && <CircularProgress {...{
      size: '1em',
      className: classes.progress
    }} /> }
  </Button>
}

const useLinkStyles = makeStyles(theme => ({
  progress: {
    marginLeft: theme.spacing(1)
  }
}))

const YetAnotherComponent = () => {
  const classes = useLinkStyles()
  const {isBusy, startBusy, endBusy} = useMultiBusy()
  return <Link {...{
    href: '#',
    disabled: isBusy,
    onClick:goFetchSomething(startBusy, endBusy)
  }}>
    <span>{
    `${isBusy ? 'I\'m Busy' : 'Click Me'}`
    }</span>
    { isBusy && <CircularProgress {...{
      size: '1em',
      className: classes.progress
    }} /> }
  </Link>
}

const useAppStyles = makeStyles(theme => ({
  root:{
    '& button': {
      marginBottom: theme.spacing(1),
    },
  }
}))
const App = () => {
  const classes = useAppStyles()
  return <Box {...{
    className: classes.root,
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  }}>
    <SomeComponent />
    <SomeOtherComponent />
    <YetAnotherComponent />
  </Box>
}

export default App
