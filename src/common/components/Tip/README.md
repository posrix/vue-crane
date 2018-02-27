# Tip

> Tip Component for showing helpful text into the dom flow

## Usage

```html
<template>
  <Tip
    :content="content"
    mode="dynamic"
    className="warn"
    ref="tip"/>
  <button v-tip:tip>click trigger</button>
</template>

<script>
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'

export default {
  components: {
    Tip
  },
  directives: {
    tip: TipDirective
  },
  data() {
    return {
      content: ['apple', 'banana']
    }
  }
}
</script>
```

## Directive
Bind the directive `v-tip` to any element you want as a click trigger to show the tip.

## API

|Attribute|Type|Default|Description|
|:-------:|:--:|:-----:|:----------|
|**`content`**|`{Array}`|`/`|Text to be displayed in tip|
|**`mode`**|`{String}`|`'static'`|Mode to decide whether to use a trigger element to show the tip, accepted values are `'static'/'dynamic'`|
|**`className`**|`{String}`|`'default'`|There are 4 className `default/success/warn/error` for customize tip theme|
|**`ref`**|`{String}`|`/`|Use this Vue built-in directive to bind with a trigger element in `'dynamic'` mode|
|**`transition`**|`{String}`|`'fade'`|Vue built-in transition component effect, use it by define some global css transition class|

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017 Yundun
