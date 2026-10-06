# OpenGuessr UI

The user interface design system for OpenGuessr, the free location guessing game. Install via `npm install openguessr-ui`.

Made to be used with [Svelte](https://svelte.dev).

> [!IMPORTANT]
> While this library is publicly available, commercial use is not permitted.

## Concepts

- **Boxes:** Boxes house controls or text inside of popups or containers. Always use `--box-margin` for padding, border radius, and usually for gap as well (unless tightly-packed controls are wanted).

- **Containers:** Containers are similar to boxes, but sit one level above. The popup acts as a layout/container hybird, don't put a container in it. But layouts don't, so this is where containers are important. They have a border radius of `--layout-margin` and a padding and when applicable gap of `--box-margin`.

- **Layouts:** Layouts are effectively pages, and they should use `--layout-margin` as the gap between containers as well as for the padding to the viewport edges. To separate larger sections in layouts, use `--layout-spacer`. Putting a margin or padding of `--layout-spacer` at the bottom of a page is also recommended to leave some slack.

- **Panels:** Panels are flexible floating UI, used for HUDs or quick action button rows. They typically include controls rather than loads of text or images. Use `--panel-margin` for border radius, padding, and gap. If the content inside is rounded strongly (e.g. large buttons), use `--layout-margin` only for the border radii. The gap or margin between related panels should be `--box-margin` if they use `--panel-margin` for the border radii, otherwise `--layout-margin`.

**The hierarchy:**
1. Every element starts in layout space (level 1), where `--layout-margin` defines the spacing between grouped elements (and `--layout-spacer` between unrelated ones), padding, and border radii of children. Typically, with fullscreen menus there's only one element in layout space (e.g. a main or the body itself), while in a gameplay scene multiple HUD elemnts sit here. 

2. The second level is containers, where the spacing and padding is `--box-margin`, and the border radii of children are as well.

3. The third level is boxes, where the spacing and padding is still `--box-margin`, but the border radii of children are `--content-margin`.

4. On the fourth level there can still be smaller boxes, and they still use `--box-margin` for padding and spacing, but use `--content-margin` for border radii. There can also be content on this level.

The content level (inside buttons, chips, or other controls) uses spacing of `--content-margin`. Popups sit in between layouts and containers. They use `--layout-margin` for spacing, but content inside them is boxes (level 3) with `--box-margin` for border radii. Panels typically live in layout space (level 1) but have unique spacing rules (as outlined above).

## Styling

This is how boxes, containers, layouts, and panels should be styled.

### Variables

These variables are used for margins, paddings, and gaps.

| Variable | Value |
| -------- | ----- |
| --content-margin | 5px |
| --panel-margin | 8px |
| --box-margin | 10px |
| --layout-margin | 15px |
| --layout-spacer | 50px |

These variables are used for colors.

| Variable | Explanation |
| -------- | ------- |
| --brand-color | Primary red |
| --panel-color | Blue-ish, for panels |
| --box-color | Bright transparent for boxes |
| --line-color | For strokes and separators |
| --box-color-dark | Accentuated boxes |
| --box-color-dark-soft | Slightly accentuated boxes |
| --overlay-color | Dark overlays |
| --overlay-color-dark | Full-screen menu overlays |
| --bright-green-color | Experience, perks |
| --bright-green-color-soft| Indicators, subtle |
| --bright-green-color-dark | Experience, perk backgrounds |
| --background-color | Opaque background |
| --dark-shadow-color | Font or drop shadows |

These variabels are used for box shadows.

| Variable | Used for |
| -------- | ------- |
| --button-shadow | Buttons |
| --button-shadow-dark | Subtle buttons |
| --box-shadow-top | Boxes that fade out towards the bottom |
| --box-shadow-bottom | Boxes that fade out towards the top |
| --box-shadow | Boxes |
| --bulb-shadow | Pills, chips, badges |
| --panel-shadow | Floating elements (containers, panels..) |

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
    max-width: fit-content;
}
```

Their width should not grow to fit their container or the Popup if the content inside is shorter.

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

Panels that house large buttons which are rounder than usual buttons should have a border radius of `--layout-margin` since we don't want uneven corners.

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

To create a button, apply the `standard-button` class. This will create a red primary button. To make it secondary, also apply `bright`.

There is a tertiary button, and it's created by applying `dark`, but it's not used in combination with other button variants. Instead, it's strictly for repetitive actions to reduce mental load. For example, a sidebar with dozens of items, where each one has a small "X" button to remove it.

Buttons that go directly into panels should typically apply `large`, which will also increase their border radius. Large buttons with small text inside (e.g. single short word) often look unnaturally short, bumping the padding by adding `wide` helps.

### Icons

Lucide, available via the package `@lucide/svelte`, should be used for icons.

At the default icon size (which always matches the font size), using `2.25` as the stroke width is suggested. Icons placed inside of buttons right next to text commonly look best at size `20`. Depending on the icon, raising the strokeWidth to `2.5` in that case can be adequate.

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

Scroll containers should be spaced in a way that scrollable content is intentionally visibly cut off when scrolling is allowed to communicate that to the user.

### Opacity values

Opacity values used are typically `0.25`, `0.5`, `0.75` and `1`. Supportive text, such as the explanation for a toggle, can be `0.75` or even `0.5`.

### Images

Apply `pointer-events: none` and `user-select: none` unless images need to be explicitly interactive (e.g. pins on the map).

### Animation and transition durations

Use `100ms`, `150ms`, `250ms`, `500ms` or `1000ms`.

## Components

These built-in components are useful for building common UI flows.

### Popup

The popup component is used for dialogs. It takes the following props:

- `open`: Whether the popup is open
- `slim`: Reduces the max width
- `verySlim`: Reduces the max width further
- `frameless`: Reduces the padding, e.g. for iFrames
- `onUserClose`: Called when the user closes the popup

A common design pattern is to include a heading at the top of a popup, effectively a popup title. For this, the built-in `popup-title` class can be used.

Many popups include a central action button which typically gets the `large popup-bottom-button` treatment.

```html
<div class="popup-title">
    <h1>Settings</h1>
</div>
```

### Chip

The chip component is used for small pieces of information, such as a "New" or "Free" indicator. It takes the following props:

- `text`: The chip's text
- `children`: Content to render instead of text
- `red`: Color variant
- `italic`: Makes the text italic, typically combined with red
- `mutedOpacity`: Makes the text muted, red variant typically sets this false
- `onclick`: Makes the chip clickable
- `class`, `style`: Class passthrough

### Drawer

The drawer component is used to contain information that should be tucked away, e.g. information only valuable for a portion of players. It takes the following props:

- `title`: The title text
- `isOpen`: Whether the drawer is expanded
- `children`: The content inside
- `inPage`: Set to false when used in popups, containers etc.
- `ontoggle`: Called whenever the open state changes
- `class`: Class passthrough

### Tabs

The tabs component is great for choosing settings or views. It takes the following props:

- `tabs`: Text strings or icons
- `selected`: The selected tab content
- `selectedIndex`: The selected tab index
- `onchange`: Called with `(selected, selectedIndex)` when the selection changes
- `disabled`: Disables all tabs
- `children`: Children rendered inside tab
- `class`: Class passthrough

### Ticker

The ticker component is used for fine-grained numeric inputs. It takes the following props:

- `value`: Current value
- `initialValue`: Start value
- `step`: Step amount (how much value changes per step)
- `minimum`: Maximum value
- `minimumText`, `maximumText`: Text displayed when the max/min is reached
- `minimumValue`, `maximumValue`: Custom value to show when max/min is reached
- `note`: Unit of the value
- `minValueWidth`: Minimum width of value field to prevent the width from jumping
- `onchange`: Called when the value changes

### TitleSeparator

The title separator component is used to separate content inside Popups or containers. It takes the following props:

- `text`: The text shown before the line
- `noMargin`: Removes the default top and bottom margin (`--layout-margin`)
- `class`: Class passthrough

## Attachments

Attachments utilize Svelte's `{@attach...}` syntax.

### Tooltip

Tooltips are mostly used for icon buttons that have no text, and persistent ones for tutorials. Usage example:

```html
<button {@attach tooltip({ text: "Settings" })}><GearsIcon /></button>
```

- `text`: The tooltip text
- `imageSrc`: Image shown above the text
- `imageAspectRatio`: Aspect ratio of the image
- `maxWidth`: Max width in pixels
- `state`: A `$state({ visible: false })` object, makes the tooltip persistent and controllable
- `onClose`: Called when the close button is used
- `showDelay`: Delay in ms before showing
- `zIndex`: Tooltip z-index
- `mobile`: Set to false to hide the tooltip on mobile

## Scroll bars

Typically, scroll bars should be hidden via `scrollbar-width: none`. there can be exceptions, such as textareas the user is working inside, where the lack of a scroll bar can be annoying.

## Text formatting guidelines

- Body text and headings should be written as plain sentences, also known as sentence case, as opposed to title case (for example, “Game overview” rather than “Game Overview”). The only exception that OpenGuessr makes is for content that needs a clear title or branding such as modes (e.g. Country Guessr), maps (e.g. Capital Cities), competitions, and tournaments.
- Using a colon ":" in or for UI labels is not recommended.
- Headings should not end in a period.
