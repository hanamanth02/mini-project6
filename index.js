const express=require("express")
const body=require("body-parser");
const mongoose = require("mongoose");
const app=express()
app.set('view engine', 'ejs');
app.use(body.urlencoded({extended:true}))
app.use(express.static("public"))


mongoose.connect("mongodb+srv://Akarsha:AkdSUiet@cluster0.cib132o.mongodb.net/tododb",{useNewUrlParser:true})

const todoschema=mongoose.Schema({task:String})

const todomodel=mongoose.model("tasks",todoschema)

// const t1=new todomodel({task:"gamming"})
// const t2=new todomodel({task:"running"})
// const t3=new todomodel({task:"jumping"})
// const t4=new todomodel({task:"boxing"})

// t1.save()
// t2.save()
// t3.save()
// t4.save()

var lists=[]


app.get("/",function(req,res){

    todomodel.find().then((result) => {
        res.render('index', {tasks:result})
        console.log(result)

    }).catch((err) =>{

        console.log(err)
    });

    
})

app.post("/",function(req,res){
    var todotask=req.body.task
    // lists.push(task)
    const task=new todomodel({task:todotask})
    task.save()
    res.redirect("/")
    
})

app.post("/delete",function(req,res){
    var item=req.body.checkbox
    todomodel.deleteOne({_id:item}).then((result) =>{
        res.redirect("/")
    }).catch((err) =>{
        console.log(err)
    });
})

app.listen(process.env.PORT ||3000,function(){
    console.log("Server is started")
})
