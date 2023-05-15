
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing"); 
 
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));


const url = "https://us21.api.mailchimp.com/3.0/lists/c8a38be9df"

const options = {
        method:"POST",
        auth:"josh1:eab29d402a6452e8280fcd38fa605c54-us21"
    }
 
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});
 
app.post("/",(req,res)=>{
    const firstName = req.body.fName;
    const email = req.body.email;
    const lastName = req.body.lName;
   
 
    const data = {
        members: [
        {
        email_address:email,
        status:"subscribed",
        merge_fields:{
            FNAME : firstName,
            LNAME : lastName
        }
        }
        ]
    };
    
    const jsonData = JSON.stringify(data);

 
    const request = https.request(url, options, function (response) {

    if (response.statusCode === 200) {
       res.sendFile(__dirname + "/success.html")
    } else {
        res.sendFile(__dirname + "/failure.html")
    }

    response.on('data', function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
 
})
 
 
app.post("/failure", function(req, res) {
  res.redirect("/");
});
 
app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
   





