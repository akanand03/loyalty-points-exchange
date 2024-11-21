const RAZORPAY_KEY_ID = 'rzp_test_4E5ZrpYhNWR2ti';

const options = {
    key: RAZORPAY_KEY_ID,
    amount: amount * 100,
    currency: 'INR',
    name: 'Loyalty Points Exchange',
    description: 'Redeem Points',
    image: '/logo.png',
    handler: function (response) {
        console.log(response);
    },
    prefill: {
        name: 'User Name',
        email: 'user@example.com',
        contact: '9999999999',
    },
    theme: {
        color: '#4B0082',
    },
};
