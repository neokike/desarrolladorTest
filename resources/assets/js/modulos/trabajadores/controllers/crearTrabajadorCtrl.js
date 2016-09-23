angular.module('app')
    .controller('crearTrabajadorCtrl', ['apiService', 'toastr', '$state', function (apiService, toastr, $state) {
        var verVm = this;
        verVm.editar = false;
        verVm.procesando = false;
        verVm.trabajador = {};
        verVm.cargos = [];
        cargarCargos();
        function cargarCargos() {
            apiService.getAll('api/cargos').then(function (response) {
                verVm.cargos = response;
            })
        }

        verVm.guardar = function () {
            verVm.procesando = true;
            apiService.create(verVm.trabajador, 'api/trabajadores').then(function (response) {
                toastr.success('El trabajador se creo satisfactoriamente', 'Exito')
                $state.go('trabajadores.listar');

            }).catch(function (err) {
                angular.forEach(err, function (error, key) {
                    toastr.error(error[0], 'Error')
                });
            }).finally(function () {
                verVm.procesando = false;
            });
        };
    }]);