"use client"
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react"
import Navbar from "./Navbar";
import { BalanceDisplay } from "./Balance";

const TransferSol = () => {
    const [receiver, setReceiver] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [signature, setSignature] = useState<string>("");
    const sender = "";
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const handleTransfer = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setError("");
        console.log(connection);
        console.log(publicKey);
        if (!connection || !publicKey) {
            setError("conncetion or sender cannot be empty");
        }
        if (!receiver || !amount) {
            setError("Receiver or amount cannot be empty");
        }

        const privateKey = process.env.PRIVATE_KEY || "";
        const transaction = new Transaction();
        const instraction = SystemProgram.transfer({
            fromPubkey: publicKey!,
            lamports: Number(amount) * LAMPORTS_PER_SOL,
            toPubkey: new PublicKey(receiver),
        });

        transaction.add(instraction);



        try {
            const signature = await sendTransaction(transaction, connection);
            setSignature(signature);
        } catch (error) {
            console.log(error)
        } finally {
            setError("");
            setAmount("");
            setReceiver("");
        }
    };
    const link = `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
    return (
        <>
            <Navbar />
           
                <form
                    className="min-h-content flex flex-col items-center justify-center m-40 "
                    onSubmit={(e) => handleTransfer(e)}
                >
                    <BalanceDisplay />
                    <h1 className="text-lg lg:text-2xl font-semibold text-teal-500 text-center ">
                        Transfer Token 
                    </h1> 
                    <input
                        type="text"
                        id="receiver"
                        onChange={(e) => setReceiver(e.target.value)}
                        className="w-full border-2 rounded-lg mt-6 p-3 bg-black hover:border-yellow-300"
                        placeholder="Enter the receiver address"
                        value={receiver}
                    />
                     
                    <input
                        type="text"
                        id="amount"
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter the amount of SOL to transfer"
                        className="w-full border-2 rounded-lg mt-4 p-3 bg-black hover:border-yellow-300"
                        value={amount}
                    />
                    <button className="w-full border-2 rounded-lg mt-4 p-3 text-lg hover:bg-white hover:text-black hover:font-bold hover:border-green-500" type="submit">
                        Transfer sol 
                    </button>
                    <a className={`text-green border-2 p-4 rounded-lg bg-green-500 mt-6 ${signature ? "visible" : "hidden"}`} href={link}>View Transaction : <span className="text-blue-900 font-bold underline">{signature.slice(25)}....</span></a>
                    <p className={`text-red border-2 p-4 rounded-lg bg-red-500 mt-6 ${error ? "visible" : "hidden"}`}>{error}</p>
                </form>

        </>
    )
}

export default TransferSol;