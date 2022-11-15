import React from 'react'
import { Provider } from 'react-redux'
import type { Store } from 'redux'

import type { RootState } from '@/store'
import { getPersistedState } from '@/store'

export const HYDRATE_ACTION = '@@HYDRATE'

type Props = { children: React.ReactElement | React.ReactElement[]; initialState?: RootState }

export const createStoreHydrator = (makeStore: (initialState?: Partial<RootState>) => Store<RootState>) => {
  return class HydrationWrapper extends React.Component<Props> {
    private store: ReturnType<typeof makeStore>

    constructor(props: Props) {
      super(props)
      this.store = makeStore(props.initialState)
      console.log('storeHydrator store: ', this.store)
    }

    componentDidMount() {
      console.log('hyd per: ', getPersistedState())
      this.store.dispatch({
        type: HYDRATE_ACTION,
        payload: getPersistedState(),
      })
    }

    render() {
      console.log('hyd store: ', this.store, 'hyd child: ', this.props.children)
      return <Provider store={this.store}>{this.props.children}</Provider>
    }
  }
}
