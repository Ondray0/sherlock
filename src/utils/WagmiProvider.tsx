import React, { PropsWithChildren } from "react"
import { Provider, defaultChains, developmentChains, ProviderProps } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"
import { providers } from "ethers"
import config from "../config"

// Working chain ID
const networkId = config.networkId
const localNetworkId = config.localNetworkId

// API key for Alchemy project
const alchemyApiUrl = config.alchemyApiUrl
const alchemyApiUrlHttp = alchemyApiUrl.replace("ws", "http")
const alchemyApiKey = alchemyApiUrl?.split("/").slice(-1)[0] as string

// Chains for connectors to support
const chains = defaultChains

// Add local node support if developing
if (__DEV__) {
  chains.push(...developmentChains)
}

// Set up connectors
const connectorsDefault = ({ chainId }: { chainId?: number | undefined }) => {
  return [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
        chainId: networkId,
        rpc: {
          [networkId]: alchemyApiUrlHttp,
        },
      },
    }),
  ]
}

const providerDefault = ({ chainId }: { chainId?: number | undefined }) => {
  // Use local node if working on a development chain
  if (__DEV__ && chainId && chainId === localNetworkId) {
    return new providers.JsonRpcProvider("http://127.0.0.1:8545")
  }

  return new providers.AlchemyProvider(networkId, alchemyApiKey)
}

export const WagmiProvider: React.FC<PropsWithChildren<ProviderProps>> = ({
  children,
  provider = providerDefault,
  connectors = connectorsDefault,
  ...props
}) => (
  <Provider autoConnect provider={provider} connectors={connectors} {...props}>
    {children}
  </Provider>
)
