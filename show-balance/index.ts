import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js"

export const showBalance = async (publicKey: PublicKey) => {
    const conn = new Connection("https://api.devnet.solana.com", "confirmed");
    const response = await conn.getAccountInfo(publicKey);

    return response.lamports/LAMPORTS_PER_SOL;
}

(async() => {
    const balance = await showBalance(new PublicKey("4Bt7w7N4ZC796UkhYhzbx9Z6x8mntXeco2tJCnwCDJd1"));
    console.log(balance);
})()

