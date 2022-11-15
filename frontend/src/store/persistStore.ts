import type { Middleware, PreloadedState } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import local from '@/services/local-storage/local'
import type { RootState } from '@/store'
import api from '@/hooks/useUrbit'

type PreloadedRootState = PreloadedState<RootState>

export const getPreloadedState = <K extends keyof PreloadedRootState>(sliceNames: K[]): PreloadedRootState => {
  // console.log('pslices: ', sliceNames)
  return sliceNames.reduce<PreloadedRootState>((preloadedState, sliceName) => {
    const sliceState = local.getItem<PreloadedRootState[K]>(sliceName)

    // if (sliceState) {
    //   preloadedState[sliceName] = sliceState
    // }
    
    // console.log('prestate: ', preloadedState)

    let urbState: any
    const subEvent = (stateObj: any) => {
      urbState = stateObj
      // console.log('gall: ', urbState)
      return urbState
    }
  
    const fakeState = {
      addedSafes: {},
      addressBook: {},
      cookies: {analytics: true, necessary: true, updates: true},
      pendingTxs: {},
      safeApps: {},
      session: {lastChainId: "5", lastSafeAddress: {5: "0xyeah"}},
      settings: {currency: 'usd', shortName: {copy: true, qr: true, show: true}, theme: {darkMode: false}}
    }
  
    async function loadUrbit() {
      // console.log('loadurb called')
      await api?.subscribe({
        app: 'gnosis',
        path: '/updates',
        event: subEvent,
        err: console.log,
        quit: console.log,
      })
  
      // console.log('finished sub')
      // console.log(urbState)
      // return urbState
    }
  
    loadUrbit()
  
    // @ts-ignore
    return urbState    


    // return preloadedState
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
        // console.log(sliceName, sliceState)
        if (sliceName === 'addedSafes' || 
            sliceName === 'addressBook' || 
            sliceName === 'session' ||
            sliceName === 'cookies' ||
            sliceName == 'settings' 
        ) {
          
          let urbitObject: any = {}
          urbitObject[sliceName.toLowerCase()]= sliceState // testSafes
          if (sliceName === 'settings') {
            // console.log('poking settings: ', sliceState)
          }
          api?.poke({
            app: 'gnosis',
            mark: 'gnosis-action',
            json: urbitObject
          })
        }
        if (sliceName === 'settings') {
          // console.log('ls setting: ', sliceName, sliceState)
        }
        local.setItem(sliceName, sliceState)
      } else {
        local.removeItem(sliceName)
      }
    }

    return result
  }
}
