app.factory('articlesService', ['$http','$q',function ($http,$q) {
    var service = {};
    service.articles=[];
    

    service.fetchArticles= function() {
        var deferred = $q.defer();

        $http.get('/article').success(function (data,status) {
            service.articles =data;
            service.colors=['5D8AA8','C9FFE5','9966CC','FBCEB1','87A96B','FE6F5E','E97451','800020']

    service.articles.forEach(function(article) {

            article.images=[
                {
                    name:"tototo",
                    rank:1,
                    url:'http://placehold.it/30x30/'+service.colors[Math.floor((Math.random() * 8))] +'&text=1',
                    urlBig:'http://placehold.it/60x60/'+service.colors[Math.floor((Math.random() * 8))] +'&text=1'
                },
                {
                    name:"tototo2",
                    rank:3,
                    url:'http://placehold.it/30x30/'+service.colors[Math.floor((Math.random() * 8))] +'&text=3',
                    urlBig:'http://placehold.it/60x60/'+service.colors[Math.floor((Math.random() * 8))] +'&text=3'
                },
                {
                    name:"tototo3",
                    rank:2,
                    url:'http://placehold.it/30x30/'+service.colors[Math.floor((Math.random() * 8))] +'&text=2',
                    urlBig:'http://placehold.it/60x60/'+service.colors[Math.floor((Math.random() * 8))] +'&text=2'
                },
                {
                    name:"tototo3",
                    rank:5,
                    url:'http://placehold.it/30x30/'+service.colors[Math.floor((Math.random() * 8))] +'&text=5',
                    urlBig:'http://placehold.it/60x60/'+service.colors[Math.floor((Math.random() * 8))] +'&text=5'
                },
                {
                    name:"tototo3",
                    rank:7,
                    url:'http://placehold.it/30x30/'+service.colors[Math.floor((Math.random() * 8))] +'&text=7',
                    urlBig:'http://placehold.it/60x60/'+service.colors[Math.floor((Math.random() * 8))] +'&text=7'
                },
                {
                    name:"tototo3",
                    rank:4,
                    url:'http://placehold.it/30x30/'+service.colors[Math.floor((Math.random() * 8))] +'&text=4',
                    urlBig:'http://placehold.it/60x60/'+service.colors[Math.floor((Math.random() * 8))] +'&text=4'
                }
            ]

    });
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
            console.log('ERROR');
        })

        return deferred.promise;
    };
    











    // service.articles.forEach(function(article) {
    //         article.date = randomDate(new Date(2012, 0, 1), new Date())
    //         function randomDate(start, end) {
    //         return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    //         }
    //         // service.randomDate(new Date(2012, 0, 1), new Date())
    // })
    // service.randomDate=function(start, end) {
    // return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    // }
    service.addNew=function(article){
        var deferred = $q.defer();
        article.status='New';

        var working = article.working;
        var checked = article.checked;
        delete article.working;
        delete article.checked;
        //POST ARTICLE TO SAVE IN DB
        $http.post('/article',article).success(function (data,status) {

            data.working = working;
            data.checked = checked;
            service.articles.unshift(data);
            deferred.resolve(data);
        }).error(function (data,status) {
             deferred.reject(data);
        })
        
        return deferred.promise;      
    }

    service.edit=function(article){
        var deferred = $q.defer();
         var working = article.working;
        var checked = article.checked;
        delete article.working;
        delete article.checked;
        $http.put('/article/'+article.id,article).success(function (data,status) {
            data.working = working;
            data.checked = checked;
            console.log(data);
            service.articles.splice(service.articles.getIndexBy('id',article.id),1,article)
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject(data);
        })
        return deferred.promise;
    }
    service.remove=function(article){
        //POST DB CHANGE
        //ON RETURN
         $http.delete('/article/'+article.id).success(function (data,status) {
            service.articles.splice(service.articles.getIndexBy('id',article.id),1)

        }).error(function (data,status) {
            console.log('ERROR');
        })
        

        


    }
    service.addImg=function(article){
        //POST DB CHANGE
        //ON RETURN
        var id = article.id;
        
        var newimg ={
                    name:"tototo3",
                    url:'http://placehold.it/30x30/'+service.colors[Math.floor((Math.random() * 8))] +'&text=%20',
                    urlBig:'http://placehold.it/60x60/'+service.colors[Math.floor((Math.random() * 8))] +'&text=%20'
                }
        article.images.push(newimg);
        service.articles.splice(service.articles.getIndexBy('id',id),1,article)
        // service.articles
        console.log(service.articles);


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