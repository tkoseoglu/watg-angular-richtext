/**
 * Created by Kemal on 07/31/15.
 */
(function() {
    "use strict";
    angular.module("watgRichtext").controller('testController', ['$scope', testController]);

    function testController($scope) {
        $scope.header = 'Richtext';
        $scope.item = {
            Input: "<b>test</b>",
            Output: ""
        };
        $scope.item2 = {
            Input: "",
            Output: ""
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
            }],
            variables: [{
                Name: "One"
            }, {
                Name: "Two"
            }, {
                Name: "Three"
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