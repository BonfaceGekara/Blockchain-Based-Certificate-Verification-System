import { ethers } from "ethers";
import dotenv from "dotenv";

import abi from "./CertificateABI.json" with { type: "json" };

// @ts-ignore
import BlockchainRecord from '../models/BlockchainRecord.js';

dotenv.config();

/*
PROVIDER
Connects to Sepolia blockchain
*/
const provider = new ethers.JsonRpcProvider(
    process.env.SEPOLIA_RPC_URL
);

/*
WALLET
Signs blockchain transactions
*/
const wallet = new ethers.Wallet(
    process.env.SEPOLIA_PRIVATE_KEY as string,
    provider
);

/*
SMART CONTRACT INSTANCE
Connects backend to deployed contract
*/
const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS as string,
    abi,
    wallet
);

/*
STORE CERTIFICATE HASH
*/
export const storeCertificateHash = async (certificateId: String, certificateNumber: string, hash: string) => {

    try {

        const tx = await contract.storeCertificate(
            certificateNumber,
            "0x" + hash
        );

        console.log("TX SENT:", tx.hash);

        // SAVE PENDING RECORD
        const blockchainRecord =
            await BlockchainRecord.create({
                certificateId,
                certificateNumber,
                hash,
                transactionHash: tx.hash,
                status: "pending"
            });

        // WAIT IN BACKGROUND
        tx.wait().then(async (receipt: any) => {

            console.log("CONFIRMED");

            await BlockchainRecord.findByIdAndUpdate(
                blockchainRecord._id,
                {
                    status: "confirmed",
                    blockNumber: receipt.blockNumber
                }
            );

        }).catch(async () => {

            await BlockchainRecord.findByIdAndUpdate(
                blockchainRecord._id,
                {
                    status: "failed"
                }
            );
        });

        return {
            success: true,
            transactionHash: tx.hash
        };

    } catch (error) {

        console.log(error);

        return {
            success: false,
            error
        };
    }
};

/* VERIFY CERTIFICATE */

export const verifyCertificateHash = async (certificateNumber: string, hash: string) => {

    try {

        const result = await contract.verifyCertificate(
            certificateNumber,
            "0x" + hash
        );

        return result;

    } catch (error) {

        console.log(error);

        return false;
    }
};