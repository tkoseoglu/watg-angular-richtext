/**
 * Created by Kemal on 07/31/15.
 */
watgRichtext.directive('watgRichtextEditor', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/templates/watgRichtextEditorTemplate.html',
        scope: {
            richText: '=richText',
            config: '='
        },
        link: function (scope, element) {

            var editor;
            var editorDoc;
            var editorHead;
            var editorBody;
            var watchCounter = 0;
            var defaultHeight = 300;
            var singleLineMaxLength = 150;

            scope.menuEnabled = false;
            scope.showSourceEditor = false;
            scope.richTextSource = scope.richText;

            scope.$watch('richText', function () {
                console.log('rich text changed');
                if (scope.richText && watchCounter === 0) {
                    editorDoc.body.innerHTML = scope.richText;
                    scope.richTextSource = scope.richText;
                    watchCounter++;
                }
                if (scope.richText)
                    scope.menuEnabled = true;
                else
                    scope.menuEnabled = false;
            });
            scope.$watch('richTextSource', function () {
                console.log('rich text source changed');
                scope.richText = scope.richTextSource;
                editorDoc.body.innerHTML = scope.richTextSource;

            });
            scope.$watch('config.variables', function () {

            });
            scope.$watch('config.fontFamilies', function () {

            });
            scope.$watch('config.fontSizes', function () {

            });
            scope.$watch('config.colors', function () {

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
            scope.initialize = function () {
                editor = element.find("iframe")[0];
                if (editor) {
                    if (editor.contentDocument)
                        editorDoc = editor.contentDocument;
                    else
                        editorDoc = editor.contentWindow.document;

                    editorHead = editorDoc.head;
                    if (editorHead != null && scope.config.bootstrapCssPath) {
                        editorHead.innerHTML = "<link href='" + scope.config.bootstrapCssPath + "' rel='stylesheet'/>";
                    }

                    editorBody = editorDoc.body;

                    if (!scope.config.height)
                        scope.config.height = defaultHeight;

                    $(editor).css('height', scope.config.height);
                    $("#richTextSource").css('height', scope.config.height);

                    if (scope.config.multiLine === false) {
                        $(editor).attr('maxLength', '10');
                        $(editorBody).attr('maxLength', '10');
                    }


                    if ('spellcheck' in editorBody)
                        editorBody.spellcheck = false;

                    if ('contentEditable' in editorBody)
                        editorBody.contentEditable = true;
                    else if ('designMode' in editorDoc) {
                        // turn on designMode
                        editorDoc.designMode = "on";
                    }

                    if (scope.richText)
                        editorDoc.body.innerHTML = scope.richText;

                    //iFrame events
                    $(editor.contentWindow.document).keydown(function (e) {

                        console.log(e);

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
            scope.applyRichText = function (action, details) {
                try {
                    console.log('Action ' + action + ' Details ' + details);

                    if (action === "createLink") {
                        if (details.indexOf("http://") === -1)
                            details = "http://" + details;
                    }

                    editorDoc.execCommand(action, false, details);
                    scope.update();
                } catch (e) {

                }
            };

            scope.initialize();
        }
    };
});