var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment")


var data = [
// const seeds = [
	{
	name: "Cloud's Rest",
	image: "https://sun9-61.userapi.com/CsLZ2pFywTsWLrLzTGpKJzu1XjqrHerC3NObBQ/Z21bbArarwY.jpg",
	description: "Lorem ipsum dolor sit amet" 
	},
	{
	name: "Desert Mesa",
	image: "https://sun9-61.userapi.com/CsLZ2pFywTsWLrLzTGpKJzu1XjqrHerC3NObBQ/Z21bbArarwY.jpg",
	description: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
	},
	{
	name: "Canyon Floor",
	image: "https://sun9-61.userapi.com/CsLZ2pFywTsWLrLzTGpKJzu1XjqrHerC3NObBQ/Z21bbArarwY.jpg",
	description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. "
	}
];

function seedDB(){
	Campground.deleteMany({}, function(err){
		if(err){
			console.log(err);
		} 
		console.log("removed campgrounds!");
		/////////////////////////////////////		
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				} else {
					console.log("added a campground");
					/////////////////////////////////////////////
					Comment.create({
							text: "This place is greate, but I wish ",
							author: "Homer"
						}, 
						function(err, comment){
							if(err){
								console.log(err);
							} else {
								campground.comments.push(comment);
								campground.save();
								console.log("created new comment");
							}
						});
				}
			});
		});
	});
}

 // ASYNC
// async function seedDB(){
// 	await Campground.deleteMany({});
// 	console.log("Campgrounds removed");
// 	////////////////////////////////////
// 	await Comment.deleteMany({});
// 	console.log("Comments removed");
// 	////////////////////////////////////
// 	for(const seed of seeds){
// 		let campground = await Campground.create(seed);
// 		console.log("Campground created");
//         ///////////////////////////////////////////////
// 		let comment = await Comment.create({text: "It's a beautiful world!", author: "Homer"}); 
// 		console.log("Comment created!");
// 		///////////////////////////////////////////////
// 		campground.comments.push(comment);
// 		campground.save();
// 		console.log("Comment added to Campground!");
// 	}
// }

module.exports = seedDB;


















