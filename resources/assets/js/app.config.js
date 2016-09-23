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
