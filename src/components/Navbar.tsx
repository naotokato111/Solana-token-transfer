"use client"
import "../app/globals.css"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
const Navbar = () => {
    return (
        <div className= "flex justify-center mt-10 h-[90px] flex-row  text-[20px] flex-wrap" >
            <WalletMultiButton />
        </div>
    )
}

export default Navbar ;