'use strict';


angular.module('app', [
    'ui.router',
    'toastr',
    'validation',
    'validation.rule',
    'datatables',
    'datatables.bootstrap',
]);
var app = angular.module('app')
    .config(['$validationProvider',
        function ($validationProvider) {

            $validationProvider.showSuccessMessage = false;
            $validationProvider.setErrorHTML(function (msg) {
                return "<div> <label class=\"control-label has-error\">" + msg + "</label></div>";
            });

            $validationProvider.setDefaultMsg({
                required: {
                    error: 'Campo requerido',
                    success: 'Thanks!'
                },
                minlength: {
                    error: 'El campo debe contener más caracteres',
                    success: 'Thanks!'
                },
                maxlength: {
                    error: 'El campo debe contener menos caracteres',
                    success: 'Thanks!'
                },
                number: {
                    error: 'Debe ser un numero positivo'
                }
            });


            $validationProvider.setExpression({
                requiredorzero: function (value) {
                    return value === 0 ? true : !!value;
                },
            }).setDefaultMsg({
                requiredorzero: {
                    error: 'Campo requerido',
                },
            });
        }
    ])
    .run(['$rootScope',
        function ($rootScope) {

    }]);

angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('trabajadores', {
                    url: '/trabajadores',
                    template: '<div ui-view></div>',
                })
                .state('trabajadores.listar', {
                    url: '/listar',
                    controller: 'listarTrabajadoresCtrl as listarVm',
                    templateUrl: 'html/listarTrabajadores.html',
                })
        }]);

'use strict';

var app = angular.module('app');

// $http: para conexion con la API
// $q: para utilizar promesas
// $localStorage: para almacenar datos, en este caso los datos del usuario
//                en sesion tal como el token de usuario
// $base64: para encriptar datos
// $localStorage.backend: constante que contiene la ruta del $localStorage.backend
var injectParams = ['$http', '$q', '$localStorage', '$base64'];

var factory = function ($http, $q, $localStorage, $base64) {

    factory = {};

    // Utilizada para obtener cualquier array desde el $localStorage.backend
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
        $http.defaults.headers.common['Authorization'] = $localStorage.token;
        $http.get($localStorage.backend + url + include)
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

        $http.defaults.headers.common['Authorization'] = $localStorage.token;
        $http.get($localStorage.backend + url + id + include)
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

        $http.defaults.headers.common['Authorization'] = $localStorage.token;
        $http.delete($localStorage.backend + url + id)
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

        $http.defaults.headers.common['Authorization'] = $localStorage.token;
        $http.delete($localStorage.backend + url + '/id/' + ids)
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

        $http.defaults.headers.common['Authorization'] = $localStorage.token;
        $http.post($localStorage.backend + url, object)
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

        $http.defaults.headers.common['Authorization'] = $localStorage.token;
        $http.post($localStorage.backend + url, object)
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

        $http.defaults.headers.common['Authorization'] = $localStorage.token;
        $http.put($localStorage.backend + url + id, object)
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

        return $http.post($localStorage.backend + url, formData, {
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

/**
 * Created by pedrogorrin on 22/9/16.
 */

angular.module('app')
    .controller('listarTrabajadoresCtrl', [function () {
        var listarVm = this
    }]);
/**
 * Created by pedrogorrin on 22/9/16.
 */

//# sourceMappingURL=app.js.map
