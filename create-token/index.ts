import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js"
import { airdrop } from "../airdrop";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";


const createMint = async (mintWallet) => {
    const conn = new Connection("https://api.devnet.solana.com", "confirmed");
    const creatorToken = await Token.createMint(conn, mintWallet, mintWallet.publicKey, null, 8, TOKEN_PROGRAM_ID);
    return creatorToken.publicKey;
}

const transferTokens = async (tokenAddress: PublicKey, mintWallet: Keypair, receiver: PublicKey) => {
    const conn = new Connection("https://api.devnet.solana.com", "confirmed");
    const creatorToken = new Token(conn, tokenAddress, TOKEN_PROGRAM_ID, mintWallet);

    const mintTokenaccount = await creatorToken.getOrCreateAssociatedAccountInfo(mintWallet.publicKey);
    await creatorToken.mintTo(mintTokenaccount.address, mintWallet.publicKey, [], 10000000);
    const receiverTokenaccount = await creatorToken.getOrCreateAssociatedAccountInfo(receiver);


    const transaction = new Transaction().add(
        Token.createTransferInstruction(TOKEN_PROGRAM_ID, mintTokenaccount.address, receiverTokenaccount.address, mintWallet.publicKey, [], 10000000 )
    );
        await sendAndConfirmTransaction(conn, transaction, [mintWallet], {commitment: "confirmed"});
}

( async () => {
    const mintWallet = await Keypair.generate();
    await airdrop(mintWallet.publicKey, 2);
    const creatorTokenAddress = await createMint(mintWallet);
    await transferTokens(creatorTokenAddress, mintWallet, new PublicKey("4Bt7w7N4ZC796UkhYhzbx9Z6x8mntXeco2tJCnwCDJd1"));
}) ()