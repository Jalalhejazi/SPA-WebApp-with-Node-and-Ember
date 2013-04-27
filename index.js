// Jalal.Hejazi

var express     = require('express');
var io          = require('socket.io');
var     app     = express();
var     request = require('request');
var     server  = require('http').createServer(app);
var     io      = io.listen(server);
var     port    = process.env.PORT  || '3000' ;

//The Client WebApp is running from the /public/index.html 
app.use(express.static(__dirname + '/public'));

// database is simulating a JSON-database
// in production-mode this variable can fetch data from any JSON-database-store :-)
database = [{
    id: 1,
    title: "This post is coming from nodejs DataService ",
    author: "Edward V Berard",
    publishedAt: '10-02-1990',
    intro: "Testing post with id 1",
    extended: "Walking on water and developing software from a specification are easy if both are frozen."

}, {
    id: 2,
    title: "MVC can be hard to learn",
    author: "Brian Kernighan",
    publishedAt: '02-01-1980',
    intro: "Debugging is twice as hard as writing the code in the first place.",
    extended: "Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
}, {
    id: 3,
    title: "JavaScript MVC is used in Single Page App",
    author: "Bill Gates",
    publishedAt: '20-03-2005',
    intro: "Testing post id 3",
    extended: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight."
}, {
    id: 4,
    title: "Experience is simply the name we give our mistakes",
    author: "Jalal Hejazi",
    publishedAt: '20-04-2013',
    intro: "Testing post id 4",
    extended: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, impedit, quo dignissimos quam odio nisi minima. Explicabo, assumenda repellat doloremque doloribus! Quaerat, nemo, maxime, cupiditate temporibus facere impedit vero deleniti sunt ipsa voluptas minima doloremque similique aut voluptates est ex libero quos alias inventore obcaecati dolorum cumque iste sapiente pariatur quae repudiandae sequi aspernatur debitis a autem accusamus voluptate explicabo deserunt quisquam sint perspiciatis adipisci iusto expedita earum nisi! Delectus, voluptatibus, sapiente, earum, omnis corporis quod nulla ducimus quibusdam sed nisi odio eaque necessitatibus dicta hic non architecto itaque quam voluptas commodi cum perspiciatis suscipit porro pariatur illum molestiae odit ipsa facilis quae perferendis voluptate. Consequatur, amet, odit, quidem, culpa voluptas quis nulla molestiae iste reiciendis officia totam velit error soluta nam minus nihil adipisci quibusdam veritatis ipsa voluptatem consectetur esse natus perferendis sunt optio in itaque nemo molestias vel id! Totam, illum, consequuntur voluptas possimus numquam aperiam omnis repellat!"
}, {
    id: 5,
    title: "CORS: Security of Origin control Access !",
    author: "Jalal",
    publishedAt: '04-04-2013',
    intro: "Testing CORS security with id 5",
    extended: "Access-Control-Allow-Origin is solved using Node running as DataService."
}
];

var Status_OK = function (res) {
 res.writeHead(200, {
         'Content-Type': 'text/json',
         'Access-Control-Allow-Origin': '*',
         'X-Powered-By':'nodejs DataService @Jalal.Hejazi'
        });

};

// listening for GET /posts 
app.get('/posts', function (req,res) {
    var body = {
        "posts": database
    };
    Status_OK(res);
    res.end(JSON.stringify(body));
});


// listening for GET /posts/{id} 
app.get('/posts/:id', function (req,res) {
    var postid = req.params.id;
    var body = {
        "posts": database[postid]
    };
    Status_OK(res);
    res.end(JSON.stringify(body));
});

app.get('/tweets/:username', function(req, response) {
    var username = req.params.username;
    options = {
        protocol: "http:",
        host: 'api.twitter.com',
        pathname: '/1/statuses/user_timeline.json',
        query: {
            screen_name: username,
            count: 10
        }
    };
    var twitterUrl = url.format(options);
    request(twitterUrl).pipe(response);
});

// Running the server and listen for any HTTP request
server.listen(port, dev_debug_info);

function dev_debug_info(){
    console.log('');
    console.log('********************************************') ;
    console.log('WebApp listening on http://localhost:'+port    );
    console.log('********************************************') ;
    console.log('');
    console.log('**************************************************************') ;
    console.log('X-Powered-By:Nodejs using Express SERVER  HTTP-verb: GET / POST / PUT  ');
    console.log('**************************************************************') ;
    console.log('');
    console.log('cURL http://localhost:' + port + '/posts/0') ;
    console.log('cURL http://localhost:' + port + '/posts/1') ;
    console.log('cURL http://localhost:' + port + '/posts/2') ;
    console.log('cURL http://localhost:' + port + '/posts/3') ;
    console.log('cURL http://localhost:' + port + '/posts/4') ;
    console.log('');
}

