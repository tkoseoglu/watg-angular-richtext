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

### Step 1. Directive reference

```html
<watg-richtext-editor rich-text="myRichtext" config="richTextConfig"></watg-richtext-editor>
```

### Step 2. Configuration (optional)

```js
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