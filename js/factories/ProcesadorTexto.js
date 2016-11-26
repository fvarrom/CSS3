'use strict';

angular.module('myApp')
    .factory('ProcesadorTextos',[
        function () {
            var departamentos=[];
            var provincias=[];
            var distritos=[];

            var getNombre = function (bloque) {
                var nombre = bloque.match(/([a-zA-Z]+)/g);
                if(nombre.length>1){
                    nombre = nombre.join(' ');
                }
                return nombre.toString();
            };

            var getCodigo =  function (bloque) {
                return bloque.match(/(\d+)/g).toString();
            };


            var getDataUbigeo = function (texto) {
                var reg_bloque = /(\d+)\s([\w\s])+/g;
                var temp={};
                var bloques;

                angular.forEach(texto.split(/\n/),function (linea) {
                    bloques = linea.match(reg_bloque).reverse();

                    temp['codigo'] = getCodigo(bloques[0]);
                    temp['nombre'] = getNombre(bloques[0]);

                    if(bloques.length==1){
                        temp['codigo_padre'] = '-';
                        temp['nombre_padre'] = '-';
                        departamentos.push(temp);
                    }

                    if(bloques.length>1){
                        temp['codigo_padre'] = getCodigo(bloques[1]);
                        temp['nombre_padre'] = getNombre(bloques[1]);
                    }

                    if(bloques.length==2){
                        provincias.push(temp);
                    }

                    if(bloques.length==3){
                        distritos.push(temp);
                    }

                    temp={};
                });

                return {
                    departamentos:departamentos,
                    provincias: provincias,
                    distritos: distritos
                }
            };

            return {
                getDataUbigeo:getDataUbigeo
            }
        }
    ]);