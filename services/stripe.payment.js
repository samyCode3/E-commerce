const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const Payment = (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: "usd"
    }, (stripeErr, stripeRes) =>{
        if(stripeErr) return res.status(500).json(stripeErr)  
        if(stripeRes) res.status(200).json(stripeRes)
    })
}

module.exports = Payment