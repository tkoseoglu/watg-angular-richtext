# watg-angular-richtext
WATG richtext editor for angularjs web applications

## Getting Started

```shell
bower install watg-angular-richtext --save
```

### Required Files

```js
bower_components/watg-angular-richtext/dist/js/watg-angular-richtext.min.js
```

```js
bower_components/watg-angular-richtext/dist/js/watg-angular-richtext.tpl.js
```

```css
bower_components/watg-angular-richtext/dist/css/watg-angular-richtext.min.css
```

### Inject module in your app

ngSanitize is a required module.

```js
angular.module('myApp', ['...', 'ngSanitize','watgRichtext']);
```

## Example

### Step 1. Directive Set-up

#### Id
Internal Id of the control. In case you have multiple controls on the same page

#### rich-text
The rich text variable on your controller

#### config
The configuration setting for the control. See below for me details/examples

#### reset-count
An array that is being "watched". If changes, the control will "reset" (There is absolutely a better way of doing this.
which I will develop in the next weeks/months)


```html
<watg-richtext-editor
                id="'myRTEditor'"
                rich-text="myRichtext" 
                config="richTextConfig"
                reset-count="resetCount"></watg-richtext-editor>
```

### Step 2. Configuration 

```js

$scope.resetCount = [];
        
$scope.doSomething = function () {
    $scope.resetCount.push(parseInt($scope.resetCount.length + 1));
};


$scope.richTextConfig = {
            height: 300,                                      //height of the editor control default 300
            multiLine: true,                                  //default true
            bootstrapCssPath: 'public/css/vendor.min.css',    //your path to boostrap.css. 
            showVariablesSelector: false,                     //an array of variables to insert
            showFontSelector: false,                          //an array of font families
            showFontSizeSelector: false,                      //an array of font sizes
            showColorSelector: false,                         //an array of colors
            fontSizes: myFontSizes,
            fontFamilies: myFontFamilies,
            colors: myColors,            
            showBold: false,
            showItalic: false,
            showStrikeThrough: false,
            showUnderline: false,
            showUnorderedList: false,
            showOrderedList: false,
            showReduceIndent: false,
            showIndent: false,
            showLeftAlign: false,
            showCenterAlign: false,
            showRightAlign: false,
            showJustify: false,
            showUndo: false,
            showRedo: false,
            showInsertLink: false,
            showRemoveLink: false,
            showSourceCode: false
        };
```



## Pick lists examples

```js
var myFontSizes: [{
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
}];

var myFontFamilies: [{
    fontName: 'Arial'
}, {
    fontName: 'Calibri'
}, {
    fontName: 'Time New Roman'
}, {
    fontName: 'Palatino Linotype'
}];

var myColors: [{
    colorName: 'Black',
    colorValue: '000000'
}, {
    colorName: 'Silver',
    colorValue: 'C0C0C0'
}, {
    colorName: 'Gray',
    colorValue: '808080'            
}];
```