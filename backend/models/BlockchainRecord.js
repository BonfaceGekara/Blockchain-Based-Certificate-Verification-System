import mongoose from "mongoose";

const blockchainSchema = new mongoose.Schema(
    {
        certificateId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Certificate",
            required: true,
        },

        hash: {
            type: String,
            required: true,
        },

        transactionHash: {
            type: String,
            required: true,
        },

        blockNumber: {
            type: Number
        },

        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("BlockchainRecord", blockchainSchema);