import { network } from "hardhat";

async function main() {

    console.log("Deploying contract...");

    const { ethers } = await network.create();

    const Certificate = await ethers.getContractFactory(
        "CertificateVerification"
    );

    const certificate = await Certificate.deploy();

    await certificate.waitForDeployment();

    const address = await certificate.getAddress();

    console.log("---------------------------------");
    console.log("Contract deployed successfully!");
    console.log("Address:", address);
    console.log("----------------------------------");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});