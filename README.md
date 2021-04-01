#  mofron-comp-split
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

split component for mofron

this component splits screen to two.

exp. one is for menu or navigate and the other is for main contents.

## Feature
 - default ratio is 20:80
 - vertical split the screen into two
 - the user can change the division ratio by dragging
## Attention
 - supported size is 'px' or 'rem'

# Install
```
npm install mofron  mofron-comp-split
```

# Sample
```html
<setting>
    <tag load="mofron-comp-split">Split</tag>
</setting>

<Split ratio=(30,70)>
    <div color2="#faf5f5"></div>
    <div color2="#e6e6fa"></div>
</Split>
```

# Parameter

| Short<br>Form | Parameter Name | Type | Description |
|:-------------:|:---------------|:-----|:------------|
| | left | mixed | component: contents |
| | | | array: component lists |
| | | dist | left config |
| | right | mixed | component: contents |
| | | | array: component lists |
| | | dist | right config |
| | border | component | border component |
| ◯  | ratio | number | left side split ratio [default is 20] |
| | | number | right side split ratio [default is 80] |
| | draggable | boolean | true: user is allowed change split ratio by dragging the border. |
| | | | false: user can not change split ratio. |

