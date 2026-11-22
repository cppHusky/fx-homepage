# Homepage translations

Each locale is an ES module in this directory. `en.js` is the reference
dictionary; locale files should keep the same keys and nested `guide` structure.

To add a language:

1. Add a locale dictionary (for example, `fr.js`) using the same structure as
   `en.js`. Set `languageName` to the language's native name.
2. Import it and add its locale code in `index.js`.

The language menu is populated from the registered dictionaries. Browser
language preferences are matched by base language and unsupported languages
fall back to English. Chinese preferences are matched to Simplified Chinese by
default; Traditional Chinese is selected for `zh-TW`, `zh-HK`, `zh-MO`, or
`zh-Hant` preferences. A visitor's manual selection is saved in local storage.

Tutorial step strings may contain trusted HTML for links and the dynamic
`<code class="dynamic-topic"></code>` placeholder. Keep interpolated values
out of these strings.
