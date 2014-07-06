app.factory('articlescategoryService', ['$http','$q',function ($http,$q) {
    var service = {};
    service.categories=[];
    // {id:2,'category':'Biotech',status:'New','title' :'7title category users','content':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti adipisci laudantium alias vel, illo dignissimos tenetur, excepturi earum placeat est iure. Sed ullam et recusandae iure dignissimos non aliquam voluptate.'},
    // {id:3,'category':'Energie Future',status:'Inactif','title' :'477title category articles','content':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam iste dolorum sint facere quos corporis, quo ducimus explicabo dolorem at mollitia sequi, enim? Eius ab quisquam, non quia, laudantium qui.'},
    // {id:4,'category':'Biotech',status:'Actif','title' :'4title category projets','content':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea suscipit id nulla soluta inventore facilis perspiciatis veritatis, nihil. Quae aperiam obcaecati aliquid soluta delectus recusandae, labore id assumenda, facere sed.'},
    // {id:5,'category':'Energie Future',status:'Actif','title' :'4title category dashboard','content':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates modi id voluptas architecto impedit itaque, iste porro inventore vero omnis, dolore, adipisci quos sapiente quibusdam consequatur error. Quae veritatis, distinctio!'},
    // {id:6,'category':'Biotech',status:'New','title' :'7744title category users','content':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti adipisci laudantium alias vel, illo dignissimos tenetur, excepturi earum placeat est iure. Sed ullam et recusandae iure dignissimos non aliquam voluptate.'},
    // {id:7,'category':'Energie Future',status:'Inactif','title' :'47title category categories','content':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam iste dolorum sint facere quos corporis, quo ducimus explicabo dolorem at mollitia sequi, enim? Eius ab quisquam, non quia, laudantium qui.'},
    // {id:8,'category':'alimentation',status:'Actif','title' :'title category projets','content':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea suscipit id nulla soluta inventore facilis perspiciatis veritatis, nihil. Quae aperiam obcaecati aliquid soluta delectus recusandae, labore id assumenda, facere sed.'},
    // ];
    

    service.fetchCategories= function() {
        var deferred = $q.defer();

        $http.get('/category').success(function (data,status) {
            console.log(data);
            service.categories =data;
            service.colors=['5D8AA8','C9FFE5','9966CC','FBCEB1','87A96B','FE6F5E','E97451','800020']

    service.categories.forEach(function(category) {

            category.images=[
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
    



    service.addNew=function(category){
        var deferred = $q.defer();

        //POST ARTICLE TO SAVE IN DB
        $http.post('/category',category).success(function (data,status) {
            service.categories.unshift(data);
            deferred.resolve(data);
        }).error(function (data,status) {
             deferred.reject(data);
        })
        
        return deferred.promise;      
    }

    service.edit=function(category){
        var deferred = $q.defer();
        $http.put('/category/'+category.id,category).success(function (data,status) {
            service.categories.splice(service.categories.getIndexBy('id',category.id),1,category)
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject(data);
        })
        return deferred.promise;
    }
    service.remove=function(category){
        //POST DB CHANGE
        //ON RETURN
         $http.delete('/category/'+category.id).success(function (data,status) {
            service.categories.splice(service.categories.getIndexBy('id',category.id),1)

        }).error(function (data,status) {
            console.log('ERROR');
        })
        

        


    }
    service.addImg=function(category){
        //POST DB CHANGE
        //ON RETURN
        var id = category.id;
        
        var newimg ={
                    name:"tototo3",
                    url:'http://placehold.it/30x30/'+service.colors[Math.floor((Math.random() * 8))] +'&text=%20',
                    urlBig:'http://placehold.it/60x60/'+service.colors[Math.floor((Math.random() * 8))] +'&text=%20'
                }
        category.images.push(newimg);
        service.categories.splice(service.categories.getIndexBy('id',id),1,category)
        // service.categories
        console.log(service.categories);


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