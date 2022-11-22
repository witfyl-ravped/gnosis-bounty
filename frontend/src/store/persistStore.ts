import type { Middleware, PreloadedState } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import local from '@/services/local-storage/local'
import type { RootState } from '@/store'
import api from '@/hooks/useUrbit'

type PreloadedRootState = PreloadedState<RootState>

export const getPreloadedState = <K extends keyof PreloadedRootState>(sliceNames: K[]): PreloadedRootState => {
  console.log('pslices: ', sliceNames)
  return sliceNames.reduce<PreloadedRootState>((preloadedState, sliceName) => {
    const sliceState = local.getItem<PreloadedRootState[K]>(sliceName)

    if (sliceState) {
      preloadedState[sliceName] = sliceState
    }
    
    console.log('prestate: ', preloadedState)  

    return preloadedState
  }, {})
}

export const persistState = <K extends keyof PreloadedRootState>(sliceNames: K[]): Middleware<{}, RootState> => {
  return (store) => (next) => (action) => {
    const result = next(action)

    const state = store.getState()
    // console.log('perstate: ', state)

    for (const sliceName of sliceNames) {
      const sliceState = state[sliceName]

      if (sliceState) {
        if (sliceName === 'addedSafes' || 
            sliceName === 'addressBook' || 
            sliceName === 'session' ||
            sliceName === 'cookies' ||
            sliceName == 'settings' 
        ) {
          
          let urbitObject: any = {}
          urbitObject[sliceName.toLowerCase()]= sliceState // testSafes
          api?.poke({
            app: 'gnosis',
            mark: 'gnosis-action',
            json: urbitObject
          })
        }
        local.setItem(sliceName, sliceState)
      } else {
        local.removeItem(sliceName)
      }
    }

    return result
  }
}
