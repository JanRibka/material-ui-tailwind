---
productId: material-ui
title: React Text Field component
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
githubLabel: 'component: text field'
materialDesign: https://m2.material.io/components/text-fields
githubSource: packages/janribkaui-material-ui-tailwind/src/TextField
---

# Text Field

<p class="description">Text Fields let users enter and edit text.</p>

Text fields allow users to enter text into a UI. They typically appear in forms and dialogs.

## Basic TextField

The `TextField` wrapper component is a complete form control including a label, input, and help text.
It comes with three variants: outlined (default), filled, and standard.

{{"demo": "BasicTextFields.js"}}

:::info
The standard variant of the Text Field is no longer documented in the [Material Design guidelines](https://m2.material.io/)
([this article explains why](https://medium.com/google-design/the-evolution-of-material-designs-text-fields-603688b3fe03)),
but Material UI will continue to support it.
:::
