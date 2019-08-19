var express=require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var url="mongodb://localhost/sdb"

var emp=require("../model/employee")
const router=express.Router();
router.use(bodyparser.urlencoded({extended:true}))

mongoose.connect(url,function(err)
{
    if(err)
    throw err;
    else
        console.log("DB Connected!");
})

router.get("/",function(req,res)
{
    res.render("emp");
})

router.get("/new",function(req,res)
{
    res.render("newemp")
})

router.post("/add",function(req,res)
{
    var e1=new emp();
    e1.eid=req.body.eid;
    e1.ename=req.body.ename;
    e1.salary=req.body.sal;
    e1.save(function(err){
        if(err) throw err
        else
        {
            res.send("data added....")
        }
    });

})


/*router.get("/view",function(req,res)
{
    res.send("View Employee")
})*/

router.get("/view",function(req,res)
{
    emp.find({},function(err,result)
    {
        if(err)
        throw err;
        else
        {
            //console.log(result);
            res.render("viewemp",{empdata:result});
        }
            
    })
})

router.get("/edit/:id",function(req,res)
{
    var id=req.params.id;
    console.log(id);
    //emp.findOne({},function(err,result))
    //empdata.eid
    emp.find({eid:id},function(err,result)
    {
        if(err)
        throw err;
        else
        {
            console.log(result);
            res.render("editemp",{empdata:result});
        }      
    })

});

router.post("/update",function(req,res)
{
    emp.update({eid:req.body.eid},{$set:{ename:req.body.ename,salary:req.body.sal}},function(err,result)
    {
        if(err)
        throw err;
        else
        emp.find({},function(err,result)
        {
            if(err)
            throw err;
            else
            {
                console.log(result);
                res.render("viewemp",{empdata:result});
            }
        })
    })
    
})

router.get("/delete/:id", function(req,res)
{
    var id=req.params.id;
    emp.deleteOne({eid:id},function(err)
    {
        if(err)
        throw err;
        else
        {
            //console.log(result);
            res.redirect("/emp/view");
        }
    })
})

module.exports=router;