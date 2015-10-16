define({

    getProjectsList : function(sDestination){
		var deferred = Q.defer();
        this._callBuiLD({
          method : "GET",
          destination : sDestination,
          path : this._routes.API + this._routes.PROJECTS}).then(
              function(sResponse) {
                  deferred.resolve(sResponse[0]);
              }
        ).fail(
            function(oError){
                deferred.reject(oError);
            }
        );

        return deferred.promise;
    },

    getSnapshot : function(sDestination, sProjectId){
        var deferred = Q.defer();
        this._callBuiLD({
          method : "GET",
          destination : sDestination,
          path : this._routes.API + this._routes.PROJECTS + "/" + sProjectId + this._routes.SNAPSHOT}).then(
              function(sResponse) {
                deferred.resolve(sResponse[0]);
              }
        ).fail(
            function(oError){
                deferred.reject(oError);
            }
        );

        return deferred.promise;
    },

    _routes : {
        API : "/api-basic",
        PROJECTS : "/projects",
        SNAPSHOT : "/prototype/zipsnapshot?stream=true"
    },

	_authenticate : function () {
        return Q(true);
	},

	_reportError : function(error) {
        throw new Error(error);
	},

	_constructUrl : function(sDestination, sPath){
        return "../destinations/" + sDestination + sPath;
	},

	_callBuiLD : function(requestInfo) {
		var deferred = Q.defer();
        var that = this;
        this._authenticate().then(
            function(){
                    var sUrl = that._constructUrl(requestInfo.destination, requestInfo.path);
                    var requestOptions = {
                    type : requestInfo.method,
                    data : requestInfo.data,
                    contentType : requestInfo.contentType,
                    headers: {
                        "Content-Type" : requestInfo.contentType
                    }
                };

                Q.sap.ajax(sUrl, requestOptions).then(
                    function(response){
                        deferred.resolve(response);
                    }
                ).fail(
                    function(oError) {
                        deferred.reject(oError);
                    }
                );
            }
        ).fail(
            function(oError){
                deferred.reject("Cannot authenticate user" + "\nError= " + oError);
            }
        );

        return deferred.promise;
	}
});