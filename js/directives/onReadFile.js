'use strict';

angular.module('myApp')
    .directive('onReadFile', [
        '$parse',
        function ($parse) {
            return {
                restrict: 'A',
                scope: false,
                link: function(scope, element, attrs) {
                    element.bind('change', function(event) {

                        var onFileReadFn = $parse(attrs.onReadFile);
                        var reader = new FileReader();

                        reader.onload = function() {
                            var fileContents = reader.result;
                            scope.$apply(function() {
                                onFileReadFn(scope, {
                                    'contents' : fileContents
                                });
                            });
                        };
                        reader.readAsText((event.srcElement || event.target).files[0]);
                    });
                }
            };
        }
    ]);
