angular.module('app')
    .controller('editarTrabajadorCtrl', ['apiService', 'toastr', '$state', '$stateParams', function (apiService, toastr, $state, $stateParams) {
        var verVm = this
        verVm.editar = true;
        verVm.procesando = false;
        verVm.trabajador = {};
        cargarCargos();
        cargarTrabajador($stateParams.id);

        function cargarCargos() {
            apiService.getAll('api/cargos').then(function (response) {
                verVm.cargos = response;
            })
        }

        function cargarTrabajador(id) {
            var url = "api/trabajadores";
            verVm.procesando = true;

            apiService.getOne(id, url)
                .then(function (response) {
                    verVm.trabajador = response.data;
                })
                .catch(function (err) {
                    toastr.error(err.error.mensaje, 'error')
                }).finally(function () {
                verVm.procesando = false;

            });
        }

        verVm.guardar = function () {
            verVm.procesando = true;

            apiService.update($stateParams.id, verVm.trabajador, 'api/trabajadores')
                .then(function (response) {
                    toastr.success('El trabajador se actualizo satisfactoriamente', 'Exito');
                    $state.go('trabajadores.listar');

                }).catch(function (err) {
                angular.forEach(err, function (error, key) {
                    toastr.error(error[0], 'Error')
                }).finally(function () {
                    verVm.procesando = false;
                });
            })
        };

        verVm.eliminar = function () {
            var url = "api/trabajadores";
            var confirm = window.confirm("¿Esta seguro de eliminar este registro?");
            if (confirm == true) {
                verVm.procesando = true;
                apiService.remove($stateParams.id, url).then(function (data) {
                    toastr.success('Trabajador eliminado con exito');
                    $state.go('trabajadores.listar');
                }).catch(function (err) {
                    toastr.error(err.errors[0].message, 'Error');
                }).finally(function () {
                    verVm.procesando = false;
                });
            }
        };
    }]);