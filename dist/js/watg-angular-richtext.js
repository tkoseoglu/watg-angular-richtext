/**
 * Created by Kemal on 07/31/15.
 */

    var watgRichtext = angular.module('watgRichtext', ['ngSanitize', 'watgRichtext.templates'])
        .config(function () {

        });


/**
 * Created by Kemal on 07/31/15.
 */

watgRichtext.directive('watgRichtextEditor', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/templates/watgRichtextEditorTemplate.html',
        scope: {
            richText: '=richText',
            variables: '='
        },
        link: function (scope, element) {

            var editor;
            var editorDoc;
            var editorHead;
            var editorBody;
            var watchCounter = 0;

            scope.menuEnabled = false;
            scope.fonts = [{
                fontName: 'Arial'
            }, {
                fontName: 'Calibri'
            }, {
                fontName: 'Time New Roman'
            }, {
                fontName: 'Palatino Linotype'
            }
            ];
            scope.colors = [{
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


            scope.$watch('richText', function () {
                if (scope.richText && watchCounter === 0) {
                    editorDoc.body.innerHTML = scope.richText;
                    watchCounter++;
                }
                if (scope.richText)
                    scope.menuEnabled = true;
                else
                    scope.menuEnabled = false;

            });

            scope.$watch('variables', function () {

            });

            //initialize
            scope.initialize = function () {

                editor = element.find("iframe")[0];

                if (editor) {
                    if (editor.contentDocument)
                        editorDoc = editor.contentDocument;
                    else
                        editorDoc = editor.contentWindow.document;

                    editorHead = editorDoc.head;
                    if (editorHead != null) {
                        editorHead.innerHTML = "<link href='../dev/css/vendor.min.css' rel='stylesheet'/>";
                    }

                    editorBody = editorDoc.body;

                    // turn off spellcheck
                    if ('spellcheck' in editorBody) {    // Firefox
                        editorBody.spellcheck = false;
                    }

                    if ('contentEditable' in editorBody) {
                        // allow contentEditable
                        editorBody.contentEditable = true;
                    }
                    else {  // Firefox earlier than version 3
                        if ('designMode' in editorDoc) {
                            // turn on designMode
                            editorDoc.designMode = "on";
                        }
                    }

                    if (scope.richText) {
                        editorDoc.body.innerHTML = scope.richText;
                    }

                    //iFrame events
                    $(editor.contentWindow.document).keyup(function () {
                        scope.update();
                    });
                    $(editor.contentWindow.document).blur(function () {
                        scope.update();
                    });
                }
                else {
                    console.error("Rich-text editor not found");
                }

            };
            scope.update = function () {

                try {
                    scope.richText = editorDoc.body.innerHTML;
                    scope.$apply();
                } catch (e) {

                }
            };

            //tool bar events
            scope.applyRichText = function (action, details) {
                try {
                    console.log('Action ' + action + ' Details ' + details);
                    editorDoc.execCommand(action, false, details);
                    scope.update();
                } catch (e) {

                }

            };
            scope.createLink = function () {
                console.log('create link');
            };

            scope.initialize();
        }
    };
});
