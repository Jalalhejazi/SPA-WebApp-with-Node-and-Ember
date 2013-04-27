// Jalal.Hejazi
// EmberJS MVC BlogPost Demo

App = Ember.Application.create({});

App.Store = DS.Store.extend({
    revision: 12,

    // The very nice feature of Ember is Adapter:
    // In test-mode just using "DS.FixtureAdapter"
    // adapter: "DS.FixtureAdapter" ;

   // In prod-mode chaning the adapter to "DS.RESTAdapter"
    adapter: DS.RESTAdapter.extend({
     //Running using Nodejs WebServer

     url: 'http://blog.supermobile.dk/'

    })
});

App.Router.map(function() {
    //RESTfull address format: #/posts/{post_id}
    // cURL http://blog.supermobile.dk/#/posts  
    // #/posts   -> get All posts available
    // #/posts/1 -> get post id 1
    // #/posts/2 -> get post id 2
    // #/posts/3 -> get post id 3 ...
    this.resource('posts', function() {
        this.resource('post', {
            path: ':post_id'
        });
    });

    // http://blog.supermobile.dk/#/about/
    this.resource('about');

    // http://blog.supermobile.dk/#/html5/
    this.resource('html5');

    // http://blog.supermobile.dk/#/js_client/
    this.resource('js_client');

    // http://blog.supermobile.dk/#/js_server/
    this.resource('js_server');

    // http://blog.supermobile.dk/#/tweets/{screenName}
    // this.resource('tweets');

    this.resource('tweets', function() {
        this.resource('tweets', {
            path: ':username'
        });
    });
});

//Index redirect to Route posts "http://blog.supermobile.dk/#/posts"
App.IndexRoute = Ember.Route.extend({
    redirect: function() {
        this.transitionTo('posts');
    }
});

//When PostRoute is invoked, find all posts from Adapter
App.PostsRoute = Ember.Route.extend({
    model: function() {
        return App.Post.find();
    }
});

//PostController is responsible for CRUD operations
App.PostController = Ember.ObjectController.extend({
    isEditing: false,
    edit: function() {
        this.set('isEditing', true);
    },
    doneEditing: function() {
        this.set('isEditing', false);
        this.get('store').commit();
    }
});

//Post is the Model, using the Adapter 
App.Post = DS.Model.extend({
    title: DS.attr('string'),
    author: DS.attr('string'),
    intro: DS.attr('string'),
    extended: DS.attr('string'),
    publishedAt: DS.attr('date')
});
/*
// FIXTURES is used here ONLY when the Adapter is "DS.FixtureAdapter"
App.Post.FIXTURES = [{
    id: 100,
    title: "MVC using Ember is Cool",
    author: "Jalal Hejazi",
    publishedAt: new Date('10-04-2013'),
    intro: "Testing post with id 100",
    extended: "Lorem ipsum"

}, {
    id: 200,
    title: "MVC can be hard to learn",
    author: "Brian",
    publishedAt: new Date('02-02-2013'),
    intro: "Testing post with id 200",
    extended: "Lorem ipsum dolor sit amet"
}

];
*/

//EmberJs is so easy to call external javascripts library like moment.js
//Helper-function for calling moment.js utility and return FromNow() duration on every date-type. 
Ember.Handlebars.registerBoundHelper('date', function(date) {
    return moment(date).fromNow();
});


var showdown = new Showdown.converter();
Ember.Handlebars.registerBoundHelper('markdown', function(input) {
    return new Ember.Handlebars.SafeString(showdown.makeHtml(input));
});