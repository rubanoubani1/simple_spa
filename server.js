const express = require("express");
let app = express();
let database = [];
let id = 100;

app.use(express.static("public"));

app.use(express.json()); 

app.get("/api/contact", function(req,res){
	return res.status(200).json(database);
}) // all get requests sent to this function

app.post("/api/contact",function(req,res){
	
	let contact = {
		id:id,
		firstname:req.body.firstname,
		lastname:req.body.lastname,
		email:req.body.email,
		phone:req.body.phone
	}
	
	id++;
	database.push(contact);
	return res.status(201).json(contact);//201 retun what ever we created
})

app.delete("/api/contact/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	let tempDatabase = database.filter(contact=>  contact.id !== tempId)  // this line check in database and return value if contact.id doesn't exist'
	database = tempDatabase;
	return res.status(200).json({message:"success!"});
})

app.put("/api/contact/:id",function (req,res) {   // :id is variable
	let tempId = parseInt(req.params.id,10);
	for(let i=0;i<database.length;i++) {
		if(tempId === database[i].id) {
			let contact = {
				id:tempId,
				firstname:req.body.firstname,
				lastname : req.body.lastname,
				email:req.body.email,
				phone:req.body.phone
			}
			database.splice(i,1,contact);
			return res.status(200).json({message:"not found!"});
		}
	}
	return res.status(404).json({message:"not found!"});
})

app.listen(3000);
console.log("Running in port 3000");
