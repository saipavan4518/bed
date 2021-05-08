const router = require("express").Router();
const db_pool = require("../config/db-config");
const bcrypt = require('bcryptjs');

router.route("/").post(async (req,res) => {
    if(req.body){
        console.log(req.body);
        const salt = bcrypt.genSaltSync(10);
        const hid = req.body.hid;
        const password = await bcrypt.hash(req.body.password, salt);
        const adID = req.body.adID;

        if(adID !== "HOPE2021"){
            return res.status(200).send({eid:1000,details:"Not Authenticated"});
        }

        const query = `insert into hospital_login (hid, pass) values("${hid}","${password}")`;

        db_pool.getConnection((error, connection)=>{
            if(error){
                return res.status(200).send({eid:100,details:"Database servers are down",error:error});
            }
            connection.query(query, (error, results, fields)=>{
                if(error){
                    return res.status(200).send({eid:200,details:"Invalid Query",error:error});
                }
                return res.send({
                    eid:0,
                    hid:hid,
                    details:"Registration Successfull, Please Login"
                });
            })
            connection.release();
        })

    }else{
        return res.send({
            eid:50,
            details:"Error in Posting the query, retry"
        });
    }
})

module.exports = router