const router = require("express").Router();
const { query } = require("express");
const db_pool = require("../config/db-config");
const pool_promise = db_pool.promise();

router.route("/update/data").put(async (req,res)=>{
    if(!req.body){
        return res.send({
            eid:50,
            details:"Error in Posting the query, retry"
        });
    }
    const hid = req.body.hid;
    const total_covid_beds = req.body.tcb;
    const occp_covid_beds = req.body.ocb;
    const total_oxy_beds = req.body.tob;
    const occp_oxy_beds = req.body.oob;
    const total_vent_beds = req.body.tvb;
    const occp_vent_beds = req.body.ovb;
    const total_icu_beds = req.body.tib;
    const occp_icu_beds = req.body.oib;
    const name = req.body.name;
    const ts = new Date();
    const query1 = `select * from hospital_data where hid = "${hid}"`;
    const query2 = 
    `insert into hospital_data values ("${hid}",${total_covid_beds},${occp_covid_beds},${total_oxy_beds},${occp_oxy_beds},${total_vent_beds},${occp_vent_beds},${total_icu_beds},${occp_icu_beds})`;
    const query3 = `insert into logging (hid, name_of_u, ts) values ("${hid}","${name}","${ts}")`;

    const query4 = 
    `update hospital_data set total_covid_beds = ${total_covid_beds}, occp_covid_beds = ${occp_covid_beds}, total_oxy_sup_beds = ${total_oxy_beds}, occp_oxy_sup_beds = ${occp_oxy_beds}, total_vent_beds = ${total_vent_beds}, occp_vent_beds = ${occp_vent_beds}, total_icu_beds = ${total_icu_beds}, occp_icu_beds = ${occp_icu_beds} where hid = "${hid}"`;

    const query5 = 
    `update logging set name_of_u = "${name}", ts = "${ts}" where hid = "${hid}"`;

    const [rows, fields] = await pool_promise.query(query1);
    if(rows.length === 0){
        //insert the rows
        var isOne = false
        var isTwo = false
        await pool_promise.query("START TRANSACTION")
        try{
            const [rows2, fields2] = await pool_promise.query(query2);
            if(rows2.affectedRows === 1){
                isOne = true
            }
        }catch(e){
            console.log(e)
        }
        try{
            const [rows3, fields3] = await pool_promise.query(query3);
            if(rows3.affectedRows === 1){
                isTwo = true
            }
        }catch(e){
            console.log(e)
        }
        if(isOne && isTwo){
            await pool_promise.query("COMMIT");
            return res.status(200).send({"eid":0,"details":"Updated Succesfully"});
        }else{
            await pool_promise.query("ROLLBACK");
            return res.status(200).send({"eid":600,"details":"Failed Retry Again"});
        }
    }else{
        //update the rows
        var isOne = false
        var isTwo = false
        await pool_promise.query("START TRANSACTION")
        try{
            const [rows4, fields4] = await pool_promise.query(query4);
            if(rows4.affectedRows === 1){
                isOne = true
            }
        }catch(e){
            console.log(e)
        }
        try{
            const [rows5, fields3] = await pool_promise.query(query5);
            if(rows5.affectedRows === 1){
                isTwo = true
            }
        }catch(e){
            console.log(e)
        }
        if(isOne && isTwo){
            await pool_promise.query("COMMIT");
            return res.status(200).send({"eid":0,"details":"Updated Succesfully"});
        }else{
            await pool_promise.query("ROLLBACK");
            return res.status(200).send({"eid":600,"details":"Failed Retry Again"});
        }
    }
});

router.route("/info/updated").get(async (req,res)=>{
    const hid = req.query.hid;
    const query1 = `select * from hospital_info where hid ="${hid}"`;
    const [rows, fields] = await pool_promise.query(query1);
    if(rows.length === 0){
        return res.status(200).send({eid:2000,"details":"NO"})
    }else{
        return res.status(200).send({eid:0,"details":"YES"})
    }
})


router.route("/update/info").put(async (req,res)=>{
    if(!req.body){
        return res.send({
            eid:50,
            details:"Error in Posting the query, retry"
        });
    }
    const hid = req.body.hid;
    const addr = (req.body.addr).toUpperCase();
    const pincode = (req.body.pincode).toUpperCase();
    const state = (req.body.state).toUpperCase();
    const district = (req.body.district).toUpperCase();
    const poc1 = req.body.poc1;
    const poc2 = req.body.poc2;
    const isC = req.body.isC;

    
    const query2 = `insert into hospital_info values ("${hid}","${addr}","${pincode}","${state}","${district}","${poc1}","${poc2}",${isC})`;
    var isOne = false
    await pool_promise.query("START TRANSACTION")
    try{
        const [rows2, fields2] = await pool_promise.query(query2);
        if(rows2.affectedRows === 1){
            isOne = true
        }
    }catch(e){
        console.log(e)
    }
    if(isOne){
        await pool_promise.query("COMMIT");
        return res.status(200).send({"eid":0,"details":"Updated Succesfully"});
    }else{
        await pool_promise.query("ROLLBACK");
        return res.status(200).send({"eid":600,"details":"Failed Retry Again"});
    }
})


module.exports = router;
