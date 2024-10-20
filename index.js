const express = require("express")
const Datastore = require("nedb")

const app = express();
app.listen(8080, () => console.log("listening at 3000"));
    

app.use(express.static("public"));
app.use(express.json({limit: "imb"}));

const database = new Datastore("database.db");
database.loadDatabase();


app.get("/api", (request, response) =>{
    const data= request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;

    database.find({},(err,data)=>{
        if(err){
            response.end(err) 
            return
        }
        else{
            response.send(data)
            return
        }
    })
});

app.post("/api", (request, response) =>{
   
    const data= request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;

    database.insert(data);
    response.json(data);
    console.log(response)
    
});
