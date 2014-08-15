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

        $http.get('/categoryArticle').success(function (data,status) {
            console.log(data);
            service.categories =data;
            service.colors=['5D8AA8','C9FFE5','9966CC','FBCEB1','87A96B','FE6F5E','E97451','800020']

        

         
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
            console.log('ERROR');
        })

        return deferred.promise;
    };
    


    service.fetchCategory= function(id) {
        var deferred = $q.defer();

        $http.get('/categoryArticle/'+id).success(function (data,status) {
           console.log(data);
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
            console.log('ERROR');
        })

        return deferred.promise;
    };
    



    service.addNew=function(category){
        var deferred = $q.defer();
        // var working = category.working;
        // var checked = category.checked;
        // delete category.working;
        // delete category.checked;

        //POST ARTICLE TO SAVE IN DB
        $http.post('/categoryArticle',category).success(function (data,status) {
            
            service.categories.unshift(data);
            deferred.resolve(data);
        }).error(function (data,status) {
             deferred.reject(data);
        })
        
        return deferred.promise;      
    }

    service.edit=function(category){
        var deferred = $q.defer();
        $http.put('/categoryArticle/'+category.id,category).success(function (data,status) {

            console.log(getIndexInBy(service.categories,'id',category.id));
            console.log(service.categories);

            service.categories.splice(getIndexInBy(service.categories,'id',category.id),1,category)
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject(data);
        })
        return deferred.promise;
    }
    service.remove=function(catArray){

        for(var i in catArray)
        {
            $http.delete('/categoryArticle/'+catArray[i].id).success(function (category,status) {
                console.log(category);
                 service.categories.splice(getIndexInBy(service.categories,'id',category.id),1)
            }).error(function (data,status) {
                console.log('ERROR');
            })
        }
         
    }
    service.removeimage=function(category,image){
        $http.delete('/image/'+image.id).success(function (data,status) {

            category.images.splice(getIndexInBy(category.images,'id',image.id),1);
            service.categories.splice(getIndexInBy(service.categories,'id',category.id),1,category)


        }).error(function (data,status) {
            console.log('ERROR');
        })
    }

    service.replace=function(category){
        
        service.categories.splice(getIndexInBy(service.categories,'id',category.id),1,category)
        return;
    }



    return service;
}]);