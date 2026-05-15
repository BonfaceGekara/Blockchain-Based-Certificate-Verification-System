import axios from 'axios'

export const generateToken = async (req, res, next) => {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const authLink = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    try {
        const response = await axios.get(authLink, {
            headers: {
                Authorization: `Basic ${auth}`
            }
        });

        req.access_token = response.data.access_token;

        next();
    } catch (error) {
        console.error('Token generation failed:', error.response?.data || error.message);
        res.status(500).json({
            error: "Failed to generate access token",
            details: error.response?.data || error.message
        });
    }
};