import { useState, useEffect, useContext } from 'react'
import EasyPeasyContext from './context'

export function useStore(mapState) {
  const store = useContext(EasyPeasyContext)
  const [state, setState] = useState(mapState(store.getState()))
  useEffect(() =>
    store.subscribe(() => {
      const newState = mapState(store.getState())
      if (newState !== state) {
        setState(newState)
      }
    }),
  )
  return state
}

export function useAction(mapActions) {
  const store = useContext(EasyPeasyContext)
  return mapActions(store.dispatch)
}
