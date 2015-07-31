/**
 * Created by Kemal on 07/31/15.
 */
watgRichtext.controller('testController',
    function testController($scope) {
        $scope.header = 'Richtext';

        $scope.item = {
            Content: ''
        };


        $scope.fontSizes = [{
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
        $scope.fontFamilies = [{
            fontName: 'Arial'
        }, {
            fontName: 'Calibri'
        }, {
            fontName: 'Time New Roman'
        }, {
            fontName: 'Palatino Linotype'
        }
        ];
        $scope.colors = [{
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
);
