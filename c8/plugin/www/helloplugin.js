var helloplugin = {

    sayHello:function(name, successCallback, errorCallback) {
 
        cordova.exec(
            successCallback,
            errorCallback,
            'HelloPlugin',
            'sayHello',
            [{
                "name": name
            }]
        );
     }

}

module.exports = helloplugin;