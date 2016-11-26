'use strict';

angular.module('myApp', [])
    .controller('vistaCtrl', [
        'ProcesadorTextos',
        function(ProcesadorTextos){
            var _this = this;
            _this.texto;
            _this.ubigeos;

            _this.loadFile = function(texto) {
                _this.texto = texto;
                _this.ubigeos = ProcesadorTextos.getDataUbigeo(texto);
            };
        }
    ]);