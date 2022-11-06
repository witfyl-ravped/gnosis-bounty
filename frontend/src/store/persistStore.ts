import type { Middleware, PreloadedState } from '@reduxjs/toolkit'

import local from '@/services/local-storage/local'
import type { RootState } from '@/store'
import api from '@/hooks/useUrbit'
import { consoleSandbox } from '@sentry/utils'

type PreloadedRootState = PreloadedState<RootState>

export const getPreloadedState = <K extends keyof PreloadedRootState>(sliceNames: K[]): PreloadedRootState => {
  return sliceNames.reduce<PreloadedRootState>((preloadedState, sliceName) => {
    const sliceState = local.getItem<PreloadedRootState[K]>(sliceName)

    if (sliceState) {
      preloadedState[sliceName] = sliceState
    }

    return preloadedState
  }, {})
}

export const persistState = <K extends keyof PreloadedRootState>(sliceNames: K[]): Middleware<{}, RootState> => {
  return (store) => (next) => (action) => {
    const result = next(action)

    const state = store.getState()

    for (const sliceName of sliceNames) {
      const sliceState = state[sliceName]

      if (sliceState) {
        // console.log(sliceName, sliceState)
        if (sliceName === 'addedSafes' || sliceName === 'addressBook') {  //addressBook

          // console.log(sliceName, sliceState)

          // let urbitObject: any = {}
          // let addresses: any = []
          // Object.entries(sliceState).forEach((entry) => (
          //   Object.entries(entry[1]).forEach(address => (
          //     console.log(addresses),
          //     urbitObject['chain-id'] = 5,
          //     addresses.push({
          //       value: address[0],
          //       name: address[1]
          //     })
          //   )),
          //   urbitObject['entries'] = addresses
          // ))

          // console.log(urbitObject)

          // let key = sliceName

          // let testobject = {
          //   '0x5F2da2F413f0d0C045BA63f779797F59efe93C79': "second-urbit-goerli",
          //   '0x81CB38A876eC4c13C65123Ee3EDC6480aC72DF90': "testing-migration",
          //   '0x810d07f6635928337ff62d40A42DBff9998c1007': "squid-state",
          //   '0xEF97297fACC8C72FF9D5364Ab031e1e0fC9dE88D': "testing-ls",
          //   '0xb09CEF1f834a7ba370C7E283330FC20B2A8bA376': "rabsef",
          //   '0xbA7893f0849cdD8EAB21F98bFfAF4289bc574097': "zod",
          //   '0xedA8FA3F3bC39bC186a368Cb8CD07AB247F66665': "witfyl"
          // }

          // const testSafes = {
          //   5: {
          //   '0x81CB38A876eC4c13C65123Ee3EDC6480aC72DF90': {
          //     ethbalance: "0",
          //     owners: [
          //       {value: '0xedA8FA3F3bC39bC186a368Cb8CD07AB247F66665'},
          //       {value: '0xbA7893f0849cdD8EAB21F98bFfAF4289bc574097'}],
          //     threshold: 1
          //   },
          //   '0xEF97297fACC8C72FF9D5364Ab031e1e0fC9dE88D': {
          //     ethbalance: "0",
          //     owners: [
          //       {value: '0xedA8FA3F3bC39bC186a368Cb8CD07AB247F66665'},
          //       {value: '0x810d07f6635928337ff62d40A42DBff9998c1007'}],
          //     threshold: 1
          //   },
          //   }
          // }

          let urbitObject: any = {}
          urbitObject[sliceName.toLowerCase()]= sliceState // testSafes
          console.log(urbitObject)
          // console.log({[sliceName.toLowerCase()]: sliceState})
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
