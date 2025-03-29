import {PublicKey, Connection, LAMPORTS_PER_SOL} from "@solana/web3.js";

export const airdrop = async (address: PublicKey, amount: number) => {
    const publicKey = new PublicKey(address);
    const conn = new Connection("https://api.devnet.solana.com", "confirmed");
    
    const signature = await conn.requestAirdrop(publicKey, amount* LAMPORTS_PER_SOL);
    // await conn.confirmTransaction(signature);
    //Change confirmTransaction  -> DEPRECATED

    const latestBlockhash = await conn.getLatestBlockhash();
    const confirmStrategy = {
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        signature: signature
    }

    await conn.confirmTransaction(confirmStrategy, "confirmed");
}

// airdrop("4Bt7w7N4ZC796UkhYhzbx9Z6x8mntXeco2tJCnwCDJd1", 5)
