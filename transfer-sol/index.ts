import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram, sendAndConfirmTransaction } from "@solana/web3.js";
import { airdrop } from "../airdrop";
import { showBalance } from "../show-balance";


export const transferSol = async (from: Keypair, to: PublicKey, amount: number) => {
    const conn = new Connection("https://api.devnet.solana.com", "confirmed");
    const transaction = new Transaction();

    const instruction = SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: LAMPORTS_PER_SOL * amount
    });

    transaction.add(instruction);
    await sendAndConfirmTransaction(conn, transaction, [
        from
    ])

    console.log("done");
}


const secret = Uint8Array.from([120,79,139,33,118,67,220,88,159,117,21,182,234,23,246,237,19,106,105,147,150,217,212,45,236,227,140,74,156,255,121,128,248,37,82,133,79,77,252,60,199,76,5,160,46,251,50,200,235,228,2,151,92,0,43,193,253,49,15,209,15,24,117,62]); //localhostjson
const fromkeyPair = Keypair.fromSecretKey(secret);
const topublicKey = new PublicKey("4Bt7w7N4ZC796UkhYhzbx9Z6x8mntXeco2tJCnwCDJd1");

(async () => {
    await airdrop(fromkeyPair.publicKey, 4);
    //from wallet
    console.log(`Initial balance of from wallet is ${await showBalance(fromkeyPair.publicKey)}`);
    //to wallet
    console.log(`Initial balance of to wallet is ${await showBalance(topublicKey)}`);


    await transferSol(fromkeyPair, topublicKey, 2);


    //from wallet
    console.log(`post balance of from wallet is ${await showBalance(fromkeyPair.publicKey)}`);
    //to wallet
    console.log(`post balance of to wallet is ${await showBalance(topublicKey)}`);
}) ()
