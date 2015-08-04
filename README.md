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

### Inject module in your app

```js
angular.module('myApp', ['...', 'watgRichtext']);
```

## Example

### Step 1. Directive reference

```html
<watg-richtext-editor rich-text="myRichtext" config="richTextConfig"></watg-richtext-editor>
```

### Step 2. Configuration (optional)

```js
$scope.richTextConfig = {
            height: 300,                    //height of the editor control default 300
            multiLine: true,                //default true
            showVariablesSelector: false,   //an array of variables to insert
            showFontSelector: false,        //an array of font families
            showFontSizeSelector: false,    //an array of font sizes
            showColorSelector: false,       //an array of colors
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

