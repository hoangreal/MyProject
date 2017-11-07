var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views","./views");
app.listen(3000);

var pg= require("pg");
var config = {
	user: 'postgres',
	database: "hff",
	password: "hff",
	host: 'localhost',
	port: 5432,
	max:10,
	idleTimeoutMillis: 30000,
};
var pool = new pg.Pool(config);

app.get("/",function(req,res){
	res.render("HFF-HSGS Football Federation.ejs");
});

app.get("/HFF-HSGS Football Federation.html",function(req,res){
	res.render("HFF-HSGS Football Federation.ejs");
});

app.get("/News", function(req,res){
	pool.connect(function(err,client,done){
		if(err){
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * from news order by id asc', function(err,result){
			done();

			if (err) {
				res.end();
				return console.error('error running program', err);
			}
			res.render("News.ejs", {data:result});
		});
	});
});

app.get("/new_details/:id", function(req,res){
	pool.connect(function(err,client,done){
		if(err){
			return console.error('error fetching client from pool', err);
		}
	var i = req.params.id;
		client.query('SELECT * from news where id='+i, function(err,result){
			done();

			if (err) {
				res.end();
				return console.error('error running program', err);
			}
			res.render("new_details.ejs", {data:result});
		});
	});
});
