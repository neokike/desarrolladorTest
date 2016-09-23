var app = angular.module('app')
    .config(['$validationProvider', 'toastrConfig',
        function ($validationProvider, toastrConfig) {

            angular.extend(toastrConfig, {
                positionClass: 'toast-bottom-right',
            });

            $validationProvider.showSuccessMessage = false;
            $validationProvider.setErrorHTML(function (msg) {
                return "<div> <label class=\"control-label text-danger\">" + msg + "</label></div>";
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
                email: {
                    error: 'El formato del email es incorrecto'
                }
            });


            $validationProvider.setExpression({
                cedula: /^^[[V|E|J|G]\d\d\d\d\d\d\d?\d?]{0,9}$/,

            }).setDefaultMsg({
                cedula: {
                    error: 'El formato de la cedula es incorrecto debe ser V|E|J|G00000000',
                },
            });
        }
    ])
    .run(['$rootScope',
        function ($rootScope) {

        }]);
