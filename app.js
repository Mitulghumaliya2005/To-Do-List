const express = require('express');
const app = express();
const mongoose = require('mongoose');
let ejs = require('ejs');
app.use('/public', express.static('public'));
const port = 3000;
 const DatabaseURL= "mongodb+srv://mitulghumaliya76:mitul123@cluster0.60odgn6.mongodb.net/ToDoList?retryWrites=true&w=majority&appName=Cluster0";
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));


// var items = [];
var workItems=[];
var listTitles = ["Sunday","Monday", "Tuesday","wednesday","Thursday","Friday","Saturday"];

main().
  then((res)=>{
    console.log("To Do List Data Base are listening")
  })
  .catch((err)=>{
    console.log(err)
  })

// async function main(){
//   mongoose.connect('mongodb://127.0.0.1:27017/ToDoList');
// }

async function main(){
  mongoose.connect(DatabaseURL);
}

const Schema = new mongoose.Schema({
  item:{
    type:String
  },
  bool:{
    type:Boolean
  }
})

const list = mongoose.model("list",Schema);
const workcollections = mongoose.model("workcollections",Schema);

app.get("/", function (req,res) {
  const d = new Date();
  let day = d.getDay();
  list.find()
  .then((result)=>{
    res.render("list.ejs",{
      ListTitle: listTitles[day],
      listItem:result,
    })
  }).catch((err)=>{
    console.log(err)
  })
  });

  app.post("/",function (req,res){
    console.log(req.body.list);
    if(req.body.list == "Work" ){
      console.log("IFFFFF")
      var additem = req.body.newItem;
      const data = new workcollections({
        item:additem,
        bool:true
      });
      data.save();
      res.redirect("/work");
     }
     else{
      console.log("else")
      var additem = req.body.newItem;
      const add = new list({
        item:additem,
        bool:true
      });
      add.save(); 
      res.redirect("/");
     }
  })
  app.get("/work",(req,res)=>{
    workcollections.find()
      .then((result)=>{
        res.render("list.ejs",{
          ListTitle: "Work",
          listItem:result,
        })
      }).catch((err)=>{
        console.log(err)
      })
  })
   

  app.post("/delete/:name",async function(req,res){ 
    console.log(req.params);
   if(req.params.name=="Work"){
    await workcollections.deleteOne({_id:req.body.transh})
      .then((result)=>{
        console.log(result);
      }).catch((err)=>{
        console.log("err2");
      })
    res.redirect("/work")
   }
   else{
    await list.deleteOne({_id:req.body.transh})
      .then((result)=>{
        // console.log(result);
      }).catch((err)=>{
        console.log("err2");
      })
    res.redirect("/")
   }
  });
  
   
  app.post("/update/:id",async (req,res)=>{
    if(req.params.id=="Work"){
      let f = await workcollections.findById(req.params.id)
    console.log(f);
    await workcollections.findByIdAndUpdate(req.params.id,{bool:!f.bool})
      .then((result)=>{
        // console.log(result)
      }).catch((err)=>{
        console.log("err1")
      })
      res.redirect("/work");
    }else{
      let f = await list.findById(req.params.id)
      console.log(f);
      await list.findByIdAndUpdate(req.params.id,{bool:!f.bool})
        .then((result)=>{
          // console.log(result)
        }).catch((err)=>{
          console.log("err1");
        })
      res.redirect("/");
    }
  });

  app.get("/about",function(req,res){
    res.render("about.ejs",{ 
    })
  });

app.listen(port, () => {
    console.log(`server has started app listening on port ${port}`)
  })