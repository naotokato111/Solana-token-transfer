"use client"

import { ReactNode, useEffect, useState } from "react";
import * as web3 from '@solana/web3.js'
import * as walletAdapterWallets from '@solana/wallet-adapter-wallets'
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
require("@solana/wallet-adapter-react-ui/styles.css");



interface WalletContextProviderProps {
    children: ReactNode;
}

const WalletContextProvider: React.FC<WalletContextProviderProps> = ({ children }) => {
    const endpoint = web3.clusterApiUrl(('devnet'));
    const wallet = [new walletAdapterWallets.PhantomWalletAdapter()
    ];

    const [initialRender, setInitialRender] = useState<boolean>(false);
    useEffect(() => {
        setInitialRender(true);
    }, [])
    return (
        <>
            {
                initialRender ? (
                    <ConnectionProvider endpoint={endpoint} >
                        <WalletProvider wallets={wallet}>
                            <WalletModalProvider >
                                {children}
                            </WalletModalProvider>
                        </WalletProvider>
                    </ConnectionProvider>
                ) : (<></>)
            }
        </>
    )
}

export default WalletContextProvider;