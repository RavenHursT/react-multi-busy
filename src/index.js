import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { uid } from 'uid'

const INIT_FLAGS = []
const MultiBusyContext = createContext([...INIT_FLAGS])

export const BUSY_FLAGS_ADD = 'BUSY_FLAGS_ADD'
export const BUSY_FLAGS_REMOVE = 'BUSY_FLAGS_REMOVE'
export const BUSY_FLAGS_RESET = 'BUSY_FLAGS_RESET'

const multiBusyReducer = (busyFlags, {type, flagId}) => {
  switch (type) {
    case BUSY_FLAGS_ADD:
      return [
        ...busyFlags,
        flagId
      ]
    case BUSY_FLAGS_REMOVE:
      return busyFlags.filter(fid => fid !== flagId)
    case BUSY_FLAGS_RESET:
      return [...INIT_FLAGS]
    default:
      return busyFlags
  }
}

export const useMultiBusy = () => {
  const { busyFlags, dispatch } = useContext(MultiBusyContext)
  const [busyFlagId, setBusyFlagId] = useState(null)
  const isBusy = busyFlags.includes(busyFlagId)

  useEffect(() => setBusyFlagId(uid()), [])
  useEffect(() => () => setBusyFlagId(null), [])

  return {
    busyFlagId,
    busyFlags,
    startBusy: () => dispatch({ type: BUSY_FLAGS_ADD, flagId: busyFlagId}),
    endBusy: () => dispatch({ type: BUSY_FLAGS_REMOVE, flagId: busyFlagId}),
    checkIsBusy: (adHocId) => busyFlags.includes(adHocId || busyFlagId),
    isBusy
  }
}

export const MultiBusyProvider = ({children}) => {
  const [busyFlags, dispatch] = useReducer(multiBusyReducer, INIT_FLAGS)
  return <MultiBusyContext.Provider {...{
    value: {busyFlags, dispatch}
  }}>{children}</MultiBusyContext.Provider>
}

export default MultiBusyContext
