/**
 * Created by Kemal on 07/31/15.
 */
(function() {
	var watgRichtext = angular.module('watgRichtext', [
		'ngRoute',
		'ngSanitize',
		'watgRichtext.templates'
	]);
})();

(function() {
	var app = angular.module('watgRichtext');
	app.config(appConfig);
	app.run(appRun);

	function appConfig($httpProvider, $routeProvider) {
		//this is for CORS operations
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
		if (!$httpProvider.defaults.headers.get) {
			$httpProvider.defaults.headers.get = {};
		}
		//disable IE ajax request caching
		$httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
		//routes
		$routeProvider.when('/test', {
			templateUrl: 'src/app/tests/test.html',
			controller: 'testController'
		}).otherwise({
			redirectTo: '/test'
		});
	}

	function appRun() {}
})();

/**
 * Created by Kemal on 07/31/15.
 */
(function() {
    "use strict";
    angular.module("watgRichtext").directive("watgRichtextEditor", watgRichtext);

    function watgRichtext() {
        return {
            restrict: 'E',
            templateUrl: 'src/app/directives/templates/watgRichtextEditorTemplate.html',
            //templateUrl: 'app/directives/templates/watgRichtextEditorTemplate.html',
            scope: {
                id: "=",
                richText: '=',
                config: '=',
                resetCount: "="
            },
            link: function(scope, element) {
                var editor;
                var editorDoc;
                var editorHead;
                var editorBody;
                var watchCounter = 0;
                var defaultHeight = 300;
                var singleLineMaxLength = 150;
                scope.hyperlinkModalId = "hyperlinkeModal" + scope.id;
                scope.menuEnabled = false;
                scope.showSourceEditor = false;
                scope.richTextSource = scope.richText;
                scope.$watch('richText', function() {
                    if (scope.richText && watchCounter === 0) {
                        editorDoc.body.innerHTML = scope.richText;
                        scope.richTextSource = scope.richText;
                        watchCounter++;
                    }
                    if (scope.richText) scope.menuEnabled = true;
                    else scope.menuEnabled = false;
                });
                scope.$watch('richTextSource', function() {
                    scope.richText = scope.richTextSource;
                    editorDoc.body.innerHTML = scope.richTextSource;
                });
                scope.$watch('config.variables', function() {});
                scope.$watch('config.fontFamilies', function() {});
                scope.$watch('config.fontSizes', function() {});
                scope.$watch('config.colors', function() {});
                scope.$watchCollection('resetCount', function(newValue, oldValue) {
                    if (newValue !== undefined) {
                        if (newValue.length > 0) {
                            scope.richText = '';
                            if (editorDoc) editorDoc.body.innerHTML = scope.richText;
                        }
                    }
                });
                if (scope.config.fontFamilies === undefined) {
                    scope.config.fontFamilies = [{
                            fontName: 'Arial'
                }, {
                            fontName: 'Calibri'
                }, {
                            fontName: 'Time New Roman'
                }, {
                            fontName: 'Palatino Linotype'
                }
                ];
                }
                if (scope.config.fontSizes == undefined) {
                    scope.config.fontSizes = [{
                            fontSizeName: 'Huge',
                            fontSize: 7
                }, {
                            fontSizeName: 'Big',
                            fontSize: 5
                }, {
                            fontSizeName: 'Normal',
                            fontSize: 3
                }, {
                            fontSizeName: 'Small',
                            fontSize: 1
                }
                ];
                }
                if (scope.config.colors == undefined) {
                    scope.config.colors = [{
                            colorName: 'Black',
                            colorValue: '000000'
                }, {
                            colorName: 'Silver',
                            colorValue: 'C0C0C0'
                }, {
                            colorName: 'Gray',
                            colorValue: '808080'
                }, {
                            colorName: 'White',
                            colorValue: 'FFFFFF'
                }, {
                            colorName: 'Maroon',
                            colorValue: '800000'
                }, {
                            colorName: 'Red',
                            colorValue: 'FF0000'
                }, {
                            colorName: 'Purple',
                            colorValue: '800080'
                }, {
                            colorName: 'Fuchsia',
                            colorValue: 'FF00FF'
                }, {
                            colorName: 'Green',
                            colorValue: '008000'
                }, {
                            colorName: 'Lime',
                            colorValue: '00ff00'
                }, {
                            colorName: 'Olive',
                            colorValue: '808000'
                }, {
                            colorName: 'Yellow',
                            colorValue: 'ffff00'
                }, {
                            colorName: 'Navy',
                            colorValue: '000080'
                }, {
                            colorName: 'Blue',
                            colorValue: '0000FF'
                }, {
                            colorName: 'Teal',
                            colorValue: '008080'
                }, {
                            colorName: 'Aqua',
                            colorValue: '00ffff'
                }
                ];
                }
                //initialize
                scope.initialize = function() {
                    editor = element.find("iframe")[0];
                    if (editor) {
                        if (editor.contentDocument) editorDoc = editor.contentDocument;
                        else editorDoc = editor.contentWindow.document;
                        editorHead = editorDoc.head;
                        if (editorHead != null && scope.config.bootstrapCssPath) {
                            editorHead.innerHTML = "<link href='" + scope.config.bootstrapCssPath + "' rel='stylesheet'/>";
                        }
                        editorBody = editorDoc.body;
                        if (!scope.config.height) scope.config.height = defaultHeight;
                        $(editor).css('height', scope.config.height);
                        $("#richTextSource").css('height', scope.config.height);
                        if (scope.config.multiLine === false) {
                            $(editor).attr('maxLength', '10');
                            $(editorBody).attr('maxLength', '10');
                        }
                        if ('spellcheck' in editorBody) editorBody.spellcheck = true;
                        if ('contentEditable' in editorBody) editorBody.contentEditable = true;
                        else if ('designMode' in editorDoc) {
                            // turn on designMode
                            editorDoc.designMode = "on";
                        }
                        if (scope.richText) editorDoc.body.innerHTML = scope.richText;
                        //iFrame events
                        $(editor.contentWindow.document).keydown(function(e) {
                            if (scope.config.multiLine === false) {
                                //prevent ENTER key
                                if (e.keyCode === 13) {
                                    e.preventDefault();
                                }
                                if (scope.richText.length > singleLineMaxLength && e.keyCode !== 8 && e.keyCode !== 35 && e.keyCode !== 36 && e.keyCode !== 46) {
                                    e.preventDefault();
                                }
                            }
                        });
                        $(editor.contentWindow.document).keyup(function() {
                            scope.update();
                        });
                        $(editor.contentWindow.document).blur(function() {
                            scope.update();
                        });
                    } else {
                        console.error("Rich-text editor not found");
                    }
                };
                scope.update = function() {
                    try {
                        scope.richText = editorDoc.body.innerHTML;
                        scope.$apply();
                    } catch (e) {}
                };
                scope.applyRichText = function(action, details) {
                    try {
                        if (action === "createLink") {
                            if (details.indexOf("http://") === -1 && details.indexOf("https://") === -1) details = "http://" + details;

                        }
                        editorDoc.execCommand(action, false, details);
                        scope.update();
                    } catch (e) {}
                };
                scope.initialize();
            }
        };
    }
})();

/**
 * Created by Kemal on 07/31/15.
 */
(function() {
    "use strict";
    angular.module("watgRichtext").controller('testController', ['$scope', testController]);

    function testController($scope) {
        $scope.header = 'Richtext';
        $scope.item = {
            Content: 'Bla Bla Bla <b>Tolga</b>',
            Content2: 'Da da da <b>Charli</b>'
        };
        $scope.resetCount = [];
        $scope.resetCount2 = [];
        $scope.doSomething = function() {
            console.log('do something');
            $scope.resetCount.push(parseInt($scope.resetCount.length + 1));
        };
        //all optional
        $scope.watgRichTextConfig = {
            height: 200, //default 300
            multiLine: true, //default true
            bootstrapCssPath: '../bower_components/bootstrap/dist/css/bootstrap.min.css',
            fontSizes: [{
                fontSizeName: 'Huge',
                fontSize: 7
            }, {
                fontSizeName: 'Big',
                fontSize: 5
            }, {
                fontSizeName: 'Normal',
                fontSize: 3
            }, {
                fontSizeName: 'Small',
                fontSize: 1
            }],
            fontFamilies: [{
                fontName: 'Arial'
            }, {
                fontName: 'Calibri'
            }, {
                fontName: 'Time New Roman'
            }, {
                fontName: 'Palatino Linotype'
            }],
            colors: [{
                    colorName: 'Black',
                    colorValue: '000000'
            }, {
                    colorName: 'Silver',
                    colorValue: 'C0C0C0'
            }, {
                    colorName: 'Gray',
                    colorValue: '808080'
            }, {
                    colorName: 'White',
                    colorValue: 'FFFFFF'
            }, {
                    colorName: 'Maroon',
                    colorValue: '800000'
            }, {
                    colorName: 'Red',
                    colorValue: 'FF0000'
            }, {
                    colorName: 'Purple',
                    colorValue: '800080'
            }, {
                    colorName: 'Fuchsia',
                    colorValue: 'FF00FF'
            }, {
                    colorName: 'Green',
                    colorValue: '008000'
            }, {
                    colorName: 'Lime',
                    colorValue: '00ff00'
            }, {
                    colorName: 'Olive',
                    colorValue: '808000'
            }, {
                    colorName: 'Yellow',
                    colorValue: 'ffff00'
            }, {
                    colorName: 'Navy',
                    colorValue: '000080'
            }, {
                    colorName: 'Blue',
                    colorValue: '0000FF'
            }, {
                    colorName: 'Teal',
                    colorValue: '008080'
            }, {
                    colorName: 'Aqua',
                    colorValue: '00ffff'
            }
            ],
            variables:[{
                Name:"One"
            },{
                Name:"Two"
            },{
                Name:"Three"
            }],
            showVariablesSelector: true,
            showFontSelector: true,
            showFontSizeSelector: true,
            showColorSelector: true,
            showBold: true,
            showItalic: true,
            showStrikeThrough: true,
            showUnderline: true,
            showUnorderedList: true,
            showOrderedList: true,
            showReduceIndent: true,
            showIndent: true,
            showLeftAlign: true,
            showCenterAlign: true,
            showRightAlign: true,
            showJustify: true,
            showUndo: true,
            showRedo: true,
            showInsertLink: true,
            showRemoveLink: true,
            showSourceCode: true,
            Button: {
                Style: "btn-info"
            }
        };
    }
})();
