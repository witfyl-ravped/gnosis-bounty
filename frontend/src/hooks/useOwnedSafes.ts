import { useEffect } from 'react'
import { getOwnedSafes, type OwnedSafes } from '@gnosis.pm/safe-react-gateway-sdk'
import api from './useUrbit'
import useChainId from '@/hooks/useChainId'
import useLocalStorage from '@/services/local-storage/useLocalStorage'
import useWallet from '@/hooks/wallets/useWallet'
import useAsync from './useAsync'
import { Errors, logError } from '@/services/exceptions'

const CACHE_KEY = 'ownedSafes'

type OwnedSafesCache = {
  [walletAddress: string]: {
    [chainId: string]: OwnedSafes['safes']
  }
}

const useOwnedSafes = (): OwnedSafesCache['walletAddress'] => {
  const chainId = useChainId()
  const { address: walletAddress } = useWallet() || {}
  const [ownedSafesCache, setOwnedSafesCache] = useLocalStorage<OwnedSafesCache>(CACHE_KEY, {})

  const [ownedSafes, error] = useAsync<OwnedSafes>(() => {
    if (!chainId || !walletAddress) return
    return getOwnedSafes(chainId, walletAddress)
  }, [chainId, walletAddress])

  useEffect(() => {
    if (!ownedSafes || !walletAddress || !chainId) return

    // api.poke({app: 'gnosis', mark: 'gnosis-action', json: {'add-address': walletAddress}})

    setOwnedSafesCache((prev) => ({
      ...prev,
      [walletAddress]: {
        ...(prev[walletAddress] || {}),
        [chainId]: ownedSafes.safes,
      },
    }))
  }, [ownedSafes, setOwnedSafesCache, walletAddress, chainId])

  useEffect(() => {
    if (error) {
      logError(Errors._610, error.message)
    }
  }, [error])

  return ownedSafesCache[walletAddress || ''] ?? {}
}

export default useOwnedSafes
