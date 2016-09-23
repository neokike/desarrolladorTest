angular.module('app')
    .controller('listarTrabajadoresCtrl', ['apiService', 'toastr', 'DTOptionsBuilder', 'DTColumnBuilder', '$compile', '$scope', function (apiService, toastr, DTOptionsBuilder, DTColumnBuilder, $compile, $scope) {
        var listarVm = this
        listarVm.dtInstance = {};


        listarVm.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('ajax', {
                url: 'api/trabajadores',
                type: 'GET'
            })
            .withOption('processing', true)
            .withOption('serverSide', true)
            .withBootstrap()
            .withOption('language', {
                url: '/js/es.json'
            })
            .withOption('createdRow', createdRow)
            .withDataProp('data');

        listarVm.dtColumns = [
            DTColumnBuilder.newColumn('cedula').withTitle('Cédula').renderWith(cedulaHtml),
            DTColumnBuilder.newColumn('nombre').withTitle('Nombre').renderWith(nombreHtml),
            DTColumnBuilder.newColumn('apellido').withTitle('Apellido').renderWith(apellidoHtml),
            DTColumnBuilder.newColumn('email').withTitle('Email'),
            DTColumnBuilder.newColumn('cargo.nombre').withTitle('Cargo'),
            DTColumnBuilder.newColumn('activo').withTitle('Activo').renderWith(activoHtml),
            DTColumnBuilder.newColumn('acciones').withTitle('Acciones').renderWith(accionesHtml).withOption('width', '340px'),
        ];

        function createdRow(row, data, dataIndex) {
            $compile(angular.element(row).contents())($scope);
        }

        function cedulaHtml(data, type, full, meta) {
            return '<a ui-sref="trabajadores.editar({ id: ' + full.id + ' })">' + full.cedula + '</a>';
        }

        function apellidoHtml(data, type, full, meta) {
            return '<a ui-sref="trabajadores.editar({ id: ' + full.id + ' })">' + full.apellido + '</a>';
        }

        function nombreHtml(data, type, full, meta) {
            return '<a ui-sref="trabajadores.editar({ id: ' + full.id + ' })">' + full.nombre + '</a>';

        }

        function accionesHtml(data, type, full, meta) {
            var text = full.activo ? 'Desactivar' : 'Activar';
            var icon = full.activo ? 'fa-circle-o' : 'fa-check-circle';
            var btn = full.activo ? 'btn-info' : 'btn-success';
            return '<div class="actions-btn"> ' +
                '<a class="btn btn-sm btn-warning" ui-sref="trabajadores.editar({id:' + full.id + '})"><i class="fa fa-pencil"></i> Editar</a> &nbsp;' +
                '<a class="btn btn-sm btn-danger" ng-click="listarVm.eliminar(' + full.id + ')"><i class="fa fa-trash"></i> Eliminar</a> &nbsp;' +
                '<a class="btn btn-sm ' + btn + '" ng-click="listarVm.activacion(' + full.id + ',' + full.activo + ')"><i class="fa ' + icon + '"></i> ' + text + '</a>' +
                '</div>';

        }

        function activoHtml(data, type, full, meta) {
            var icon = full.activo ? 'fa-check-circle' : 'fa-circle-o';
            var text = full.activo ? 'text-success' : 'text-danger';
            return "<i class='fa fa-2x " + icon + " " + text + "'></i>";
        }

        listarVm.eliminar = function (id) {
            var url = "api/trabajadores";

            if (id) {
                var confirm = window.confirm("¿Esta seguro de eliminar este registro?");
                if (confirm == true) {
                    apiService.remove(id, url)
                        .then(function (data) {
                            toastr.success('Registro eliminado con exito');
                            listarVm.dtInstance.reloadData();
                        })
                        .catch(function (err) {
                            toastr.error(err.errors[0].message, 'Error');
                        })
                }
            } else {
                toastr.warning('Debe seleccionar un trabajador antes de continuar')
            }
        };

        listarVm.activacion = function (id, activo) {
            var url = "api/trabajadores/activacion";

            if (id) {
                apiService.update(id, {}, url)
                    .then(function (data) {
                        if (activo) {
                            toastr.success('Trabajador desactivado con exito');
                        } else {
                            toastr.success('Trabajador activado con exito');

                        }
                        listarVm.dtInstance.reloadData();
                    })
                    .catch(function (err) {
                        toastr.error(err.errors[0].message, 'Error');
                    })
            } else {
                toastr.warning('Debe seleccionar un trabajador antes de continuar')
            }
        };
    }]);