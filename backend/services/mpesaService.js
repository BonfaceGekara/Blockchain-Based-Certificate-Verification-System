import axios from 'axios';

export const getMpesaAccessToken = async () => {

    const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');

    const response = await axios.get(
        'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
        {
            headers: {
                Authorization: `Basic ${auth}`
            }
        }
    );

    return response.data.access_token;

};

export const stkPush = async ( phone, amount, accountReference, description ) => {

    const token = await getMpesaAccessToken();

    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);

    const password = Buffer.from(
        process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + timestamp
    ).toString('base64');

    const response = await axios.post(
        'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
        {
            BusinessShortCode: process.env.MPESA_SHORTCODE,
            Password: password,
            Timestamp: timestamp,
            TransactionType: 'CustomerPayBillOnline',
            Amount: amount,
            PartyA: phone,
            PartyB: process.env.MPESA_SHORTCODE,
            PhoneNumber: phone,
            CallBackUrl: process.env.MPESA_CALLBACK_URL,
            AccountReference: accountReference,
            TransactionDesc: description
        },
        {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        }
    );

    return response.data;

};