import type { Dispatch, SetStateAction } from 'react'
import { useState, useCallback, useEffect } from 'react'
import api from '@/hooks/useUrbit'
import local from './local'

const useLocalStorage = <T>(key: string, initialState: T): [T, Dispatch<SetStateAction<T>>] => {
  const [cache, setCache] = useState<T>(initialState)
  
  useEffect(() => {
    const initialValue = local.getItem<T>(key)
    if (initialValue !== undefined) {
      setCache(initialValue)
    }
  }, [setCache, key])

  const setNewValue = useCallback(
    (value: T | ((prevState: T) => T)) => {
      setCache((prevState) => {
        const newState = value instanceof Function ? value(prevState) : value
        if (newState !== prevState) {
          local.setItem(key, newState)
        }
        if(key === 'ownedSafes') {
          api?.poke({app: 'gnosis', mark: 'gnosis-action', json: {ownedsafes: newState}})
          console.log('Writing to ownedSafes: ', newState)
        }
        return newState
      })
    },
    [setCache, key],
  )

  return [cache, setNewValue]
}

export default useLocalStorage
