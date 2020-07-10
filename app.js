var express       = require('express');
var app           = express();
var mongoose      = require('mongoose');
var flash         = require("connect-flash");
var bodyParser    = require('body-parser');
var Campground    = require("./models/campground");
var seedDB        = require("./seeds");
var Comment       = require("./models/comment");
var User          = require("./models/user");
var passport      = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");

var commentRoutes    = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes      = require("./routes/index");



// seedDB();
mongoose.connect('mongodb+srv://chimit:postmodern@cluster0-15dgu.azure.mongodb.net/yelpcamp?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");


// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Rusty is the best!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function(){
	console.log('Server has started!');
});

// process.on('SIGTERM', () => {
//   server.close(() => {
//     console.log('Process terminated')
//   })
// })




