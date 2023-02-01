// This is your test secret API key.
const stripe = require('stripe')('sk_test_51MOzgsDje7TaFP6ifEv0538HeUy785gg7ljaJrVtuINjumcwGBestXe528KrnvnWcr70jkXv7sKQVzYdklVCjddG00naWk05tS');
const express = require('express');
const bodyparser = require("body-parser")
const cors = require("cors")
const app = express();
const path = require('path')
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(cors({origin:true,credentials:true}))


app.use('/',express.static(path.join(__dirname,'angular')));

app.get('',(req, res) =>{
  res.sendFile(path.join(__dirname,'angular','index.html'))
});


app.post('/checkout', async (req, res) => {
	console.log(req.body);
  const session = await stripe.checkout.sessions.create({
    line_items:req.body.items.map(i=>
    ({
        price_data: {currency: 'usd', product_data: {name:i.product.name,images:[i.product.thumbnail]}, unit_amount: i.product.price*100},
        quantity: i.quantity,
    })
  ),
    mode: 'payment',
    success_url: `http://localhost:4200/store/checkout?seccus=true`,
    cancel_url: `http://localhost:4200/store/checkout?seccus=false`,
  });
  // console.log(session)
  // res.redirect(303, session.url);
  res.status(200).json(session)
});

app.listen(5000, () => console.log('Running on http://localhost:5000/'));