import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FC, useEffect, useState } from "react";
import { AccountInfo } from '@solana/web3.js';

export const BalanceDisplay: FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    const fetchBalance = async () => {
      if (!connection || !publicKey) {
        return; // Exit if connection or publicKey is not available
      }

      try {
        // Fetch account info
        const info: AccountInfo<Buffer> | null = await connection.getAccountInfo(publicKey);
        
        if (info) {
          setBalance(info.lamports); // Set balance in lamports
        } else {
          console.error('Account not found');
          setBalance(0); // Set balance to 0 if account does not exist
        }
      } catch (error) {
        console.error('Error fetching account info:', error);
      }
    };

    fetchBalance(); // Call the async function to fetch balance
  }, [connection, publicKey]);

  return (
    <div>
      <p>{publicKey ? `SOL Balance: ${balance / LAMPORTS_PER_SOL}` : "Connect your wallet"}</p>
    </div>
  );
};