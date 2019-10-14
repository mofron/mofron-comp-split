#  mofron-comp-split
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

split component for mofron

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
<require>
    <tag module="mofron-comp-split">Split</tag>
</require>

<Split ratio=(30,70)>
    <div baseColor="#faf5f5"></div>
    <div baseColor="#e6e6fa"></div>
</Split>
```
# Parameter

|Simple<br>Param | Parameter Name | Type | Description |
|:--------------:|:---------------|:-----|:------------|
| | border | component | border component |
| ◯  | ratio | number | left side split ratio [default is 20] |
| | | number | right side split ratio [default is 80] |
| | draggable | boolean | true: user is allowed change split ratio by dragging the border. |
| | | | false: user can not change split ratio. |
| | width | string (size) | split width |
| | height | string (size) | split height |

