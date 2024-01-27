const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')
const User = require('../models/User')
const axios = require('axios')

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date,Order_Location:req.body.location})

    console.log(data)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })    
    console.log(eId)
    if (eId===null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log("error",error.message)
            res.send("Server Error", error.message)

        }

    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            // console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

router.post('/myorderData', async (req, res) => {
    try{
        let myData = await Order.findOne({"email":req.body.email})
        res.json({orderData:myData})
    }catch(error){
        res.send("Server Error", error.message)
    }
})

// Get logged in User details, Login Required.
router.post('/getuser', fetch, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password") // -password will not pick password from db.
        res.send(user)
    } catch (error) {
        // console.error(error.message)
        res.send("Server Error")

    }
})
// Get logged in User details, Login Required.
router.post('/getlocation', async (req, res) => {
    try {
        let lat = req.body.latlong.lat
        let long = req.body.latlong.long
        console.log(lat, long)
        let location = await axios
            .get("https://geocode.maps.co/reverse?lat="+ lat +"&lon="+long+"&api_key=65b3f80c25ece848503264sqp8a43e1")
            .then(async res => {
                // console.log(res)
                console.log(res.data.address)

                let response = res.data.address;
                console.log(response)
                let { city, county, state_district, state, postcode } = response
                if(city==undefined){
                    return String( county + "," + state_district + "," + state + "\n" + postcode)
                }
                return String(city + "," + county + "," + state_district + "," + state + "\n" + postcode)
            })
            .catch(error => {
                // console.error(error)
            })
        res.send({ location })

    } catch (error) {
        // console.error(error.message)
        res.send("Server Error")

    }
})

module.exports = router