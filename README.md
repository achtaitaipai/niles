# Niles

Niles is a small library that helps modify a website's theme directly in the browser.

It allows you to modify:

- Font sizes and spacings based on the [Utopia](https://utopia.fyi/) system
- Colors
- Font styles

## How to use?

### Usage

**With npm**

```bash
npm i @achtaitaipai/niles
```

```js
import { start } from '@achtaitaipai/niles'

start()
```

**With a CDN**

```html
<script type="module">
	const { start } = import('https://cdn.jsdelivr.net/npm/@achtaitaipai/niles')
	start()
</script>
```

### Configuration

```js
{
    // COLORS
    /** Colors names */
    colorsKeys: ["text", "background"]
    /** Colors values in hex format */
    colorsValues: ["#000000", "#ffffff"]
    /** Css prefix for colors variables */
    colorCssPrefix: "clr"

    // FONTS
    /** Fonts names */
    fontsKeys: ["body"]
    /** Fonts values */
    fontsValues: ["'system-ui', 'sans-serif'"]
    /** Fonts options */
    fontsOptions: {
        systemui: "'system-ui', 'sans-serif'",
        transitional: "'Charter', 'Bitstream Charter', 'Sitka Text', 'Cambria', 'serif'"
    }
    /** Css prefix for fonts variables */
    fontCssPrefix: string

    // UTOPIA Types

    /** Minimum viewport width in px */
    minWidth: 320
    /** Maximum viewport width in px */
    maxWidth: 1240
    /** Base font size for the minimum viewport in px */
    minFontSize: 16
    /** Base font size for the maximum viewport in px */
    maxFontSize: 18
    /** Scale between font sizes for the minimum viewport */
    minTypeScale: 1.067
    /** Scale between font sizes for the maximum viewport */
    maxTypeScale: 1.2
    /** Number of negative type steps */
    negativeTypeSteps: 2
    /** Number of positive type steps */
    positiveTypeSteps: 5
    /** Css prefix for types variables */
    typeCssPrefix: 'step'

    // Utopia Spaces
    /** Multipliers < 0 for spaces */
    negativeSpaceSteps: [0.75, 0.5, 0.25]
    /** Multipliers >= 0 for spaces */
    positiveSpaceSteps: [1, 1.5, 2, 3, 4, 6]
    /** Css prefix for spaces variables */
    spaceCssPrefix: 'space'
}
```
