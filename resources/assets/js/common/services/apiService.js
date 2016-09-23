'use strict';

var app = angular.module('app');

// $http: para conexion con la API
// $q: para utilizar promesas
// $localStorage: para almacenar datos, en este caso los datos del usuario
//                en sesion tal como el token de usuario
// $base64: para encriptar datos
// : constante que contiene la ruta del 
var injectParams = ['$http', '$q'];

var factory = function ($http, $q) {

    factory = {};

    // Utilizada para obtener cualquier array desde el 
    // url: parametro que especifica el recurso que se desea consumir de la API
    // include: si se desean incluir parametros adicionales
    factory.getAll = function (url, include) {

        // Se inicia la promesa
        var defered = $q.defer();
        var promise = defered.promise;

        var hasPage = url.indexOf('page') !== -1;
        if (include) {
            include = hasPage ? '&include=' + include : '?include=' + include;
        } else {
            include = '';
        }

        // Si no se desea pasar como parametros el token de usuario se comenta la siguiente linea
        $http.get(url + include)
            .success(function (results) {
                defered.resolve(results);
            })
            .error(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    // Obtiene un objeto json en especifico dado un id
    factory.getOne = function (id, url, include) {

        var defered = $q.defer();
        var promise = defered.promise;

        if (include) {
            include = '?include=' + include;
        } else {
            include = '';
        }

        url = url + "/";

        $http.get(url + id + include)
            .success(function (results) {
                defered.resolve(results);
            })
            .error(function (err) {
                defered.reject(err);
            });

        return promise;
    };

    // Solicita eliminar un registro dado un id a la API
    factory.remove = function (id, url) {

        var defered = $q.defer();
        var promise = defered.promise;

        url = url + "/";

        $http.delete(url + id)
            .success(function (status) {
                defered.resolve(status.data);
                //project.id = results.data.id;
                //return results.data;
            })
            .error(function (err) {
                defered.reject(err);
            });

        return promise;

    };

    factory.removeMany = function (ids, url) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.delete(url + '/id/' + ids)
            .success(function (status) {
                defered.resolve(status.data);
                //project.id = results.data.id;
                //return results.data;
            })
            .error(function (err) {
                defered.reject(err);
            });

        return promise;

    };

    // Solicita a la API guardar un objeto json
    factory.save = function (object, url) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(url, object)
            .success(function (results) {
                defered.resolve(results);

            })
            .error(function (err) {
                defered.reject(err);
            });

        return promise;

    };

    // Solicita a la API guardar un objeto json
    factory.create = function (object, url) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(url, object)
            .success(function (results) {
                defered.resolve(results);

            })
            .error(function (err) {
                defered.reject(err);
            });

        return promise;

    };

    // Solicita a la API actualizar un objeto json dado un id
    factory.update = function (id, object, url) {

        var defered = $q.defer();
        var promise = defered.promise;

        url = url + "/";

        $http.put(url + id, object)
            .success(function (results) {
                defered.resolve(results);

            })
            .error(function (err) {
                defered.reject(err);
            });

        return promise;

    };

    factory.uploadFile = function (url, file) {
        var defered = $q.defer();
        var promise = defered.promise;

        var formData = new FormData();

        formData.append("file", file);

        return $http.post(url, formData, {
            headers: {
                "Content-type": undefined
            },
            transformRequest: formData
        })
            .success(function (res) {
                defered.resolve(res);
            })
            .error(function (msg, code) {
                defered.reject(msg);
            })

        return promise;
    }

    return factory;

};

factory.$inject = injectParams;

app.factory('apiService', factory);
