const path=require("path");
const express =  require("express");
const app=express();
const hbs=require("hbs")
const geocode=require("./utils/geocode")
const forecast=require("./utils/forecast")

//Port no
const port=process.env.PORT || 3000;

//Define Paths for ecpress config
const publicDirectoryPath =  path.join(__dirname,'../public')
const viewPath=path.join(__dirname,"../templates/views")
const partialsPath=path.join(__dirname,"../templates/partials")


//Setup handlebar engine and views location
app.set("view engine","hbs")
app.set("views",viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get("/",(req,res)=>{
    res.render("index",{title:"Weather App",name:"Please provide the location to get the weather information"})
})

app.get("/weather",(req,res)=>{
   // console.log(req.query)
    const add=req.query.address;
    if(!add)
    {
        return res.send({error:"Please provide a suitable address"});
    }
    //res.send({forecast:"It is snowing",location:add})

    geocode(add,(error,{latitude,longitude,location}={})=>
{
    if(error)
    {
        return res.send({error:error});
    }    
forecast(latitude,longitude,(err,forecastData)=>
{
    if(err)
    {
        return res.send({error});
    }
    res.send({location,forecastData,add});

   // console.log(location);
    //console.log(forecastData);
})
})

})
 
// app.get("/about",(req,res)=>{
//     res.render("about",{title:"About",name:"Naman Agarwal"})
// })

// app.get("/help",(req,res)=>{
//     res.render("help",{title:"Help",name:"Naman Agarwal"})
// })
  
// app.get("/help/*",(req,res)=>
// {
//     res.render("404",{
//         title:"404 Page",
//         name:"Naman Agarwal",
//         errorMessage:"Help page not found"
//     })
// })

app.get("*",(req,res)=>{
    res.render("404",{
        title:"404 Page",
        name:"Naman Agarwal",
        errorMessage:"page not found"
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})