const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db_pool = require("../config/db-config");
const jwt = require('jsonwebtoken');

router.route("/").post(async (req,res)=>{
    if(!req.body){
        return res.send({
            eid:50,
            details:"Error in Posting the query, retry"
        });
    }
    const hid = req.body.hid;
    const password = req.body.password;

    console.log(hid)
    const query = `select pass from hospital_login where hid = "${hid}"`
    db_pool.getConnection((error, connection)=>{
        if(error){
            return res.status(200).send({eid:100,details:"Database servers are down",error:error});
        }
        connection.query(query,async (error, results, fields)=>{
            if(error){
                return res.status(200).send({eid:200,details:"Invalid Query",error:error});
            }
            console.log(results)
            const isV = await bcrypt.compare(password, results[0].pass);
            if(isV){
                const token = jwt.sign({
                    hid:hid
                },process.env.TOKEN_PASSWORD,{expiresIn:86400});
                return res.header('x-access-token',token).send({eid:0,details:"Succesfully Logged In"});
            }else{
                return res.send({eid:500,details:"Invalid HID/Password","isUser":true,"isCC":false});
            }
        });
        connection.release();
    });

})

module.exports = router