# OpenGuessr UI

The user interface design system for OpenGuessr, the free location guessing game. Install via `npm install openguessr-ui`.

Made to be used with [Svelte](https://svelte.dev).

> [!NOTE]
> While this library is source-available, it is not intended for commercial use.

## Concepts

- **Boxes:** Boxes house controls or text inside of popups or containers. Always use `--box-margin` for padding, border radius, and usually for gap as well (unless tightly-packed controls are wanted).

- **Containers:** Containers are similar to boxes, but sit one level above. The popup acts as a container, don't put a container in it. But layouts don't, so this is where containers are important. They have a border radius of `--layout-margin` and a padding and when applicable gap of `--box-margin`.

- **Layouts:** Layouts are effectively pages, and they should use `--layout-margin` as the gap between containers as well as for the padding to the viewport edges. To separate larger sections in layouts, use `--layout-spacer`. Putting a margin or padding of `--layout-spacer` at the bottom of a page is also recommended to avoid leaving no slack.

- **Panels:** Panels are floating UI, used e.g. for HUDs or quick actions. They typically include controls rather than loads of text. Use `--panel-margin` for border radius, padding, and gap. The gap or margin between panels should be `--box-margin`.

## Styling

This is how boxes, containers, layouts, and panels should be styled.

### Variables

These variables are used for margins, paddings, and gaps.

| Variable | Value | Purpose |
| -------- | ----- | ------- |
| --content-margin | 5px | Controls (buttons, labels, inputs) |
| --panel-margin | 8px | Floating panels fixed to viewport |
| --box-margin | 10px | Boxes (containers) |
| --layout-margin | 15px | Layout gaps, box border-radius |
| --layout-margin + --box-margin | 25px | Popups, sheets |
| --layout-spacer | 50px | To separate sections in pages |

These variables are used for colors.

| Variable | Purpose |
| -------- | ------- |
| --brand-color | Primary red. |
| --panel-color | Blue-ish, for panels. |
| --box-color | Bright transparent for boxes. |
| --line-color | For strokes and separators. |
| --box-color-dark | Accentuated boxes. |
| --box-color-dark-soft | Slightly accentuated boxes. |
| --overlay-color | Dark overlays. |
| --overlay-color-dark | Full-screen menu overlays. |
| --bright-green-color | Experience, perks. |
| --bright-green-color-soft| Indicators, subtle. |
| --bright-green-color-dark | Experience, perk backgrounds. |
| --background-color | Opaque background. |
| --dark-shadow-color | Font or drop shadows. |

These variabels are used for box shadows.

| Variable | Purpose |
| -------- | ------- |
| --button-shadow | Buttons. |
| --button-shadow-dark | Subtle buttons. |
| --box-shadow-top | Boxes that fade out towards the bottom. |
| --box-shadow-bottom | Boxes that fade out towards the top. |
| --box-shadow | Boxes. |
| --bulb-shadow | Pills, chips, badges. |
| --panel-shadow | Floating elements (including ones in pages). |

These variables are used for blur.

| Variable | Value |
| -------- | ------- |
| --weak-blur | 5px |
| --normal-blur | 10px |
| --elevated-blur | 15px |
| --strong-blur | 50px |

### Boxes

Boxes typically get this base styling:

```css
.box {
    background-color: var(--box-color);
    border-radius: var(--box-margin);
    padding: var(--box-margin);
    box-shadow: var(--box-shadow);
}
```

#### Text inside boxes

Since boxes have rather tight padding and text naturally adds top and bottom spacing through the line-height, applying `padding-inline: var(--content-margin)` to text is recommended. If the entire box just contains text, raising the boxes' inline padding to `--layout-margin` has the same effect.

### Panels

Panels typically get this base styling:

```css
.panel {
    background-color: var(--panel-color);
    border-radius: var(--box-margin);
    padding: var(--panel-margin);
    backdrop-filter: blur(var(--normal-blur));
    box-shadow: var(--panel-shadow);
}
``` 

### Containers

Containers typically get this base styling:

```css
.container {
    background-color: var(--box-color);
    border-radius: var(--layout-margin);
    padding: var(--box-margin);
    box-shadow: var(--panel-shadow);
}
``` 

### Layouts

Layouts typically get this base styling:

```css
.layout {
    background-color: var(--overlay-color-dark);
    padding: var(--layout-margin);
    backdrop-filter: blur(var(--elevated-blur));
    max-width: 1100px;
}
``` 

### Buttons

Buttons should always be placed in a box or panel, not just on a blank page.

To create a button, apply the `standard-button` class. This will create a red primary button. To make it secondary, also apply `bright`, and to make it an accent button (also known as tertiary), apply `dark`.

Buttons that go directly into panels should typically apply `large`, which will also increase their border radius.

### Icons

Lucide, available via the package `@lucide/svelte`, should be used for icons.

At the default icon size (which always matches the font size), using `2.25` as the stroke width is suggested. Icons placed inside of buttons right next to text (always placed towards the right) commonly look best at size `20`. Depending on the icon, raising the strokeWidth to `2.5` in that case can be adequate.

Since Lucide icons don't follow a strict universal strokeWidth and size, some might look better at different values, in which case it is okay to deviate from these defaults. For example, the `X` looks a bit thinner than many other icons.

### Overfade

Overfade, available via the package `overfade`, is a library used for scroll containers. It applies a dynamic mask-image on the overflowing container. When a container that contains overflowing text content is scrolled all the way to the top, the top of the text is not faded out, only the bottom is, and vice-versa.

The classes are dynamic by themselves, adding e.g. `of-top` only when the container is overflowing is not needed – always apply them.

To use it, add its classes:
- `of-top`: Fade out towards the top
- `of-bottom`: Fade out towards the bottom 
- `of-left`: Fade out towards the left
- `of-right`: Fade out towards the right
- `of-length-x`: Multiply the length of the fade, defaults to 1 (optional, x = factor)

These classes should not be applied directly on boxes, since that would fade their background color. Instead, the scrollable content should go in a separate div with overfade classes applied inside of e.g. a box.

### Opacity values

Opacity values used are typically `0.25`, `0.5`, `0.75` and `1`. Supportive text, such as the explanation for a toggle, can be `0.75` or even `0.5`.

### Images

Apply `pointer-events: none` and `user-select: none` unless images need to be explicitly interactive (e.g. pins on the map).

### Animation and transition durations

Use `100ms`, `150ms`, `250ms`, `500ms` or `1000ms`.

## Components

These built-in components are useful for building common UI flows.

### Popup

The popup component is used for dialogs. They take the following props:
- TODO

A common design pattern is to include a heading at the top of a popup, effectively a popup title. For this, the built-in `popup-title` class can be used.

Many popups include a central action button which typically gets the `large-button popup-bottom-button` treatment.

```html
<div class="popup-title">
    <h1>Settings</h1>
</div>
```

### Chip

Todo

### Drawer

Todo

### Tabs

Todo

### Ticker

Todo

### TitleSeparator

Todo

## Text formatting guidelines

- Body text and headings should be written as plain sentences, also known as sentence case, as opposed to title case (for example, “Game overview” rather than “Game Overview”). The only exception that OpenGuessr makes is for content that needs a clear title or branding such as modes (e.g. Country Guessr), maps (e.g. Capital Cities), competitions, and tournaments.
- Using a colon ":" in or for UI labels is not recommended.
- Headings should not end in a period.
