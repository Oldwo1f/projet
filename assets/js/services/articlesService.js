app.factory('articlesService', ['$http',function ($http) {
    var service = {};
    service.articles=[
    {id:1,status:'Actif','title' :'7title article dashboard','content':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates modi id voluptas architecto impedit itaque, iste porro inventore vero omnis, dolore, adipisci quos sapiente quibusdam consequatur error. Quae veritatis, distinctio!'},
    {id:2,status:'New','title' :'7title article users','content':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti adipisci laudantium alias vel, illo dignissimos tenetur, excepturi earum placeat est iure. Sed ullam et recusandae iure dignissimos non aliquam voluptate.'},
    {id:3,status:'Inactif','title' :'477title article articles','content':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam iste dolorum sint facere quos corporis, quo ducimus explicabo dolorem at mollitia sequi, enim? Eius ab quisquam, non quia, laudantium qui.'},
    {id:4,status:'Actif','title' :'4title article projets','content':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea suscipit id nulla soluta inventore facilis perspiciatis veritatis, nihil. Quae aperiam obcaecati aliquid soluta delectus recusandae, labore id assumenda, facere sed.'},
    {id:5,status:'Actif','title' :'4title article dashboard','content':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates modi id voluptas architecto impedit itaque, iste porro inventore vero omnis, dolore, adipisci quos sapiente quibusdam consequatur error. Quae veritatis, distinctio!'},
    {id:6,status:'New','title' :'7744title article users','content':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti adipisci laudantium alias vel, illo dignissimos tenetur, excepturi earum placeat est iure. Sed ullam et recusandae iure dignissimos non aliquam voluptate.'},
    {id:7,status:'Inactif','title' :'47title article articles','content':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam iste dolorum sint facere quos corporis, quo ducimus explicabo dolorem at mollitia sequi, enim? Eius ab quisquam, non quia, laudantium qui.'},
    {id:8,status:'Actif','title' :'title article projets','content':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea suscipit id nulla soluta inventore facilis perspiciatis veritatis, nihil. Quae aperiam obcaecati aliquid soluta delectus recusandae, labore id assumenda, facere sed.'},
    ];
    service.articles.forEach(function(article) {
            article.date = randomDate(new Date(2012, 0, 1), new Date())
            function randomDate(start, end) {
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            }
            // service.randomDate(new Date(2012, 0, 1), new Date())
    })
    // service.randomDate=function(start, end) {
    // return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    // }
    service.addNew=function(article){
        //POST ARTICLE TO SAVE IN DB
        //ON RETURN
        article.status='New';
        service.articles.unshift(article);
    }

    console.log('service'); 
    // service.fetchArticles = function() {
    //     var promise = $http.get('/api/article').
    //     then(function(data, status, headers, config) {
    //         console.log(data); 
    //         return data.data;
    //     });
    //     return promise;
    // };
    // service.count = function() {
    //     console.log('count'); 
    //     var promise = $http.get('/api/article/count').
    //     then(function(data, status, headers, config) {
    //         console.log(data.data);
    //         return data.data;
    //     });
    //     console.log('return'); 
    //     return promise;
    // };
    // service.addArticle = function(proj) {

    //     var promise = $http.post('/api/article',proj).
    //     then(function(data, status, headers, config) {
    //         return data.data;
    //     });
    //     return promise;
    // };
    // service.removeImg = function(proj,images) {

    //     var promise = $http.put('/api/article/removeImg',{proj:proj, images:images}).
    //     then(function(data, status, headers, config) {
    //         return data.data;
    //     });
    //     return promise;
    // };
    // service.editArticle = function(proj) {

    //     var promise = $http.put('/api/article',proj).
    //     then(function(data, status, headers, config) {
    //         return data.data;
    //     });
    //     return promise;
    // };
    // service.removeArticles = function(article) {
    //     console.log('apiremove'); 
    //     var promise = $http.post('/api/article/remove',article)
    //     .then(function(data, status, headers, config) {
    //         console.log(data); 
    //         return data.data;
    //     });
    //     return promise;
    // };
    





    return service;
}]);