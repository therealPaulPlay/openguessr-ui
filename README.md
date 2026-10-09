# OpenGuessr UI

The user interface design system for OpenGuessr. Install via `npm install openguessr-ui`.

Made to be used with [Svelte](https://svelte.dev).

> [!IMPORTANT]
> While this library is publicly available, commercial use is not permitted.

## Structure

These core concepts define how UI should be structured.

### Core concepts

- **Boxes:** Boxes house controls, text, images, or other boxes.

- **Panels:** Panels are used for floating UI. They typically include controls rather than loads of text or images, perfect for HUDs.

- **Containers:** Containers contain boxes. The popup acts as a layout/container hybrid that also contains boxes.

- **Layouts:** Layouts are typically full pages that containers or panels sit in.

### Hierarchy

1. Every element starts in layout space (level 1), where `--layout-margin` defines the spacing between grouped elements, the padding, and the border radii of children. For separating unrelated elements, `--layout-spacer` is used.

2. The second level is containers, where the spacing and padding is `--box-margin`, and the border radii of children are as well.

3. The third level is boxes, where the spacing and padding is still `--box-margin`, but the border radii of children are `--content-margin`.

4. On the fourth level there is either content or smaller boxes. Smaller boxes still use `--box-margin` for padding and spacing, but `--content-margin` for border radii.

The content level (inside buttons, chips, tabs, or other controls) uses spacing of `--content-margin`. Placing content directly into layouts or containers is not allowed, it needs to sit inside a box or panel.

Popups take some properties from layouts and some from containers. They use `--layout-margin` for spacing, but content inside them is boxes (level 3) with `--box-margin` for border radii.

## Styling

This defines how UI should be styled.

### Variables

These variables are used for margins, paddings, and gaps:

| Variable | Value |
| -------- | ----- |
| --content-margin | 5px |
| --panel-margin | 8px |
| --box-margin | 10px |
| --layout-margin | 15px |
| --layout-spacer | 50px |

These variables are used for colors:

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
| --bright-green-color-soft| Indicators |
| --bright-green-color-dark | Experience, perk backgrounds |
| --background-color | Opaque background |
| --dark-shadow-color | Text or drop shadows |

> [!TIP]
> There should be at most one `--brand-color` element visible at a time (the primary action). Green colors should not be used for success, use bright styling instead (e.g. `rgba(255, 255, 255, 0.2)`).

These variables are used for box shadows:

| Variable | Used for |
| -------- | ------- |
| --button-shadow | Buttons |
| --button-shadow-dark | Dark buttons |
| --box-shadow-top | Boxes that fade out towards the bottom |
| --box-shadow-bottom | Boxes that fade out towards the top |
| --box-shadow | Boxes |
| --bulb-shadow | Pills, chips, badges |
| --panel-shadow | Floating elements (containers, panels etc.) |

These variables are used for blur:

| Variable | Value |
| -------- | ------- |
| --weak-blur | 5px |
| --normal-blur | 10px |
| --elevated-blur | 15px |
| --strong-blur | 50px |

### Boxes

Boxes typically use this base styling:

```css
.box {
    background-color: var(--box-color);
    border-radius: var(--box-margin); /* --content-margin when inside another box */
    padding: var(--box-margin);
    gap: var(--box-margin); /* When applicable */
    box-shadow: var(--box-shadow);
    max-width: fit-content;
}
```

Their width shouldn't grow to fit the container or popup they are in.

#### Text inside boxes

Since boxes have rather tight padding and text naturally adds top and bottom spacing through the line-height, applying `padding-inline: var(--content-margin)` to text is recommended. If the entire box just contains text, raising the box's inline padding to `--layout-margin` has the same effect.

### Panels

Panels typically use this base styling:

```css
.panel {
    background-color: var(--panel-color);
    border-radius: var(--box-margin); /* Or --layout-margin if they contain large buttons */
    padding: var(--panel-margin);
    gap: var(--panel-margin); /* When applicable */
    backdrop-filter: blur(var(--normal-blur)); /* Only if the layout doesn't apply elevated or strong blur already */
    box-shadow: var(--panel-shadow);
}
``` 

Panels that house large buttons which are rounder than usual buttons should have a border radius of `--layout-margin` to avoid uneven corners. Don't mix them, panels should stick to only large or only small buttons.

When panels sit inside layouts with a strong background color (e.g. `--overlay-color-dark`), their background color should be `--box-color` instead of `--panel-color` to avoid layering two blue-ish tones (which will produce a color that looks too vibrant).

The gap or margin between related panels should be `--box-margin` if they use `--box-margin` for the border radii, otherwise `--layout-margin`.

### Containers

Containers typically use this base styling:

```css
.container {
    background-color: var(--panel-color);
    border-radius: var(--layout-margin);
    padding: var(--box-margin);
    gap: var(--box-margin); /* When applicable */
    backdrop-filter: blur(var(--normal-blur)); /* Only if the layout doesn't apply elevated or strong blur already */
    box-shadow: var(--panel-shadow);
}
``` 

Like panels, containers inside layouts with a strong background color should use `--box-color` instead of `--panel-color`.

### Layouts

Layouts typically use this base styling:

```css
.layout {
    background-color: var(--overlay-color-dark);
    padding: var(--layout-margin);
    padding-block: var(--layout-spacer); /* For full pages to leave some slack at the top and bottom */
    gap: var(--layout-margin); /* When applicable */
    backdrop-filter: blur(var(--elevated-blur));
    max-width: 1100px;
}
``` 

### Buttons

Buttons should always be placed in a box or panel, not just on a blank page. Large buttons shouldn't be put into a box.

To create a button, apply the `standard-button` class. This will create a red primary button. To make it secondary, add `bright`.

There is a tertiary button, and it's created by applying `dark`, but it's not used in combination with other button variants. Instead, it's strictly for repetitive actions to reduce mental load since it is less eye-catching. For example, a sidebar with dozens of items, where each one has a small "X" button to delete it.

Large buttons with short text inside often look unnaturally slim when placed as the only button inside a panel, bumping the padding by adding `wide` resolves this.

### Icons in buttons

Regular buttons typically have the icon placed on the left side. 

Large buttons with text place the icon towards the right and use `space-between` to ensure that when multiple buttons are present in a stack, icons and text are perfectly horizontally aligned, making it easier to scan through them at a glance.

### Icons

Lucide (`@lucide/svelte`) should be used for icons.

At the default icon size (which inherits from the font size), using `2.25` as the stroke width is suggested. Icons placed inside of buttons right next to text commonly look best at size `20`.

Since Lucide icons don't follow a strict universal strokeWidth and size, some might look better at different values, in which case it is okay to deviate from these defaults. For example, the `X` looks a bit thinner than most other icons.

Icons should typically have the color white. They inherit color, but if they aren't placed inside an element that sets one (such as a paragraph), it needs to be set explicitly.

The spacing between text and an icon inside content should be `--content-margin`.

### Scrollable areas

Overfade (`overfade`) is a library used for scrollable areas. It applies a dynamic mask-image to the scroll container, the element that holds the overflowing content.

For example, when an element, that contains overflowing text content and uses `of-top` and `of-bottom`, is scrolled all the way to the top, the top of the text is not faded out, only the bottom is.

To use it, add its classes:

- `of-top`: Fade out towards the top (for overflow-y)
- `of-bottom`: Fade out towards the bottom (for overflow-y)
- `of-left`: Fade out towards the left (for overflow-x)
- `of-right`: Fade out towards the right (for overflow-x)
- `of-length-x`: Multiply the length of the fade, defaults to 1 (optional, x = factor)

These classes should not be applied directly on boxes or containers, since that would fade their background color. Instead, the scrollable content should go in a separate child div with overfade classes applied.

Scrollable content should be intentionally, visibly cut off when scrolling is allowed to communicate the fact that scrolling is possible.

Typically, scroll bars should be hidden via `scrollbar-width: none`. There can be exceptions, e.g. for text editors where a scroll bar brings utility.

### Opacity values

Opacity values used are typically `0.25`, `0.5`, `0.75` and `1`. Supportive text, such as the explanation for a feature, can be `0.75` or even `0.5`. Labels, e.g. for controls, should be full opacity.

### Images

Apply `pointer-events: none` and `user-select: none` unless images need to be explicitly interactive.

### Animation and transition durations

Use `100ms`, `150ms`, `250ms`, `500ms` or `1000ms`.

### Hover effects

Elements with hover styling should get darker when hovered, never brighter. For mobile, many `:hover` effects should also be applied when `:active`.

## Components

These built-in components are useful for building common UI flows.

### Popup

The popup component is used for dialogs. It takes the following props:

- `open`: Whether the popup is open
- `slim`: Reduces the max width
- `verySlim`: Reduces the max width further
- `frameless`: Reduces the padding, e.g. for iframes
- `onuserclose`: Called when the user closes the popup

A common design pattern is to include a heading at the top of a popup. For this, the built-in `popup-title` class can be used:

```html
<div class="popup-title">
    <h1>Settings</h1>
</div>
```

Many popups include a central action button which gets the `large popup-bottom-button` treatment. Never combine this with the `wide` class.

### Chip

The chip component is used for small pieces of information, such as a "New" or "Free" indicator. It takes the following props:

- `text`: The chip's text
- `children`: Content to render instead of text
- `red`: Color variant
- `italic`: Makes the text italic, typically combined with red
- `mutedOpacity`: Makes the text muted, red variant typically disables this
- `onclick`: Makes the chip clickable
- `class`, `style`: Class and style passthrough

### Collapsible

The collapsible component is used to contain information that should be tucked away, e.g. information only valuable for a portion of players. It takes the following props:

- `title`: The title text
- `isOpen`: Whether the collapsible is expanded
- `children`: The content inside
- `inPage`: Set to false when used in popups, containers etc.
- `ontoggle`: Called whenever the open state changes
- `class`: Class passthrough

### ConfirmPopup

The confirm popup component is used to request user confirmation or to display information. It needs to be mounted. It takes the following props:

- `onconfirm`: Called when the user confirms

Confirm popups are shown via `showConfirmPopup(title, text, executeFunction, confirmText)`:

- `title`: The popup title
- `text`: The description
- `executeFunction`: Called on confirm, also shows the confirm button
- `confirmText`: Text of the confirm button, defaults to "Confirm"

Usage example:

```js
showConfirmPopup("Remove item?", "The item will be removed from your favorites.", () => removeItem(), "Remove");
```

### ErrorPopup

The error popup component is used to inform the user about errors. It needs to be mounted.

Error popups are shown via `showErrorPopup(title, description, errorCode, reload, hideDontShowAgainOption)`:

- `title`: The popup title
- `description`: The description
- `errorCode`: The error code (usually passed by the server)
- `reload`: Reloads the page when the popup is closed, also shows the popup even if the user chose to hide errors
- `hideDontShowAgainOption`: Hides the "Never show again" option

Usage example:

```js
showErrorPopup("Failed to load map", "An error occurred loading this map.", "Code 404: Map not found");
```

### InfoBanner

The info banner component is used for short pieces of information. It takes the following props:

- `text`: The banner text
- `children`: Content to render instead of text
- `inPage`: Set to true when used in layouts
- `nowrap`: Keeps the text on one line
- `center`: Centers the content
- `transition`: Toggles the slide transition
- `class`, `style`: Class and style passthrough

### LoadingSpinner

The loading spinner component can be displayed while large content loads, such as panoramas or full pages. It takes the following props:

- `class`, `style`: Class and style passthrough

### Notification

The notification component is used for short messages at the top of the screen, optionally with an action. It needs to be mounted. It takes the following props:

- `top`: Distance from the top of the viewport, defaults to `--layout-margin`
- `onaccept`: Called when the accept button is used
- `ondismiss`: Called when the dismiss button is used

Notifications are shown via `showNotification(text, acceptAction, dismissAction, viewOnly, clickableText, textClickFunction)`:

- `text`: The notification text, `%s` marks where the clickable text goes
- `acceptAction`: Called on accept, also shows the accept button
- `dismissAction`: Called on dismiss
- `viewOnly`: Displays a view icon in the accept button
- `clickableText`: Clickable text inserted at `%s`, e.g. a player name
- `textClickFunction`: Called when the clickable text is clicked

Usage example:

```js
showNotification("Copied!");
showNotification("Accept event invite?", () => joinEvent());
```

### RoomCodeInput

The room code input component is used for entering 6-character room codes. It takes the following props:

- `segments`: The entered characters
- `inPage`: Set to false when used in panels, boxes etc.
- `onsubmit`: Called with the code when Enter or the submit button is pressed

### Tabs

The tabs component is great for choosing settings or views, as well as for On/Off switches. It takes the following props:

- `tabs`: Text strings or icons
- `selected`: Selected tab's content
- `selectedIndex`: Selected tab's index
- `onchange`: Called with `(selected, selectedIndex)` when the selection changes
- `disabled`: Disables all tabs
- `children`: Children rendered inside tab
- `class`: Class passthrough

### Ticker

The ticker component is used for fine-grained numeric inputs. It takes the following props:

- `value`: Current value
- `initialValue`: Start value
- `step`: Step amount (how much the value changes per step)
- `minimum`: Minimum value
- `maximum`: Maximum value
- `minimumText`, `maximumText`: Text displayed when the min/max is reached
- `minimumValue`, `maximumValue`: Custom value to bind when the min/max is reached
- `note`: Unit of the value
- `minValueWidth`: Minimum width of value field to prevent the width from jumping
- `onchange`: Called when the value changes

### TitleSeparator

The title separator component is used to separate content inside popups or containers. It takes the following props:

- `text`: The title text
- `noMargin`: Removes the default top and bottom margin (`--layout-margin`)
- `class`: Class passthrough

### ExperimentSign

The experiment sign is a sign that should be placed on the main page of an experimental OpenGuessr project. For the "Learn more" to work, the ConfirmPopup has to be mounted.

## Attachments

Attachments utilize Svelte's `{@attach...}` syntax.

### Tooltip

Regular tooltips are used for icon buttons that have no text, and persistent tooltips for tutorials. 

Usage example:

```html
<button {@attach tooltip({ text: "Settings" })}><GearsIcon /></button>
```

Options:

- `text`: The tooltip text
- `imageSrc`: Image shown above the text
- `imageAspectRatio`: Aspect ratio of the image
- `maxWidth`: Max width in pixels
- `state`: A `$state({ visible: false })` object, makes the tooltip persistent and controllable
- `onclose`: Called when the close button is used
- `showDelay`: Delay in ms before showing
- `zIndex`: Tooltip z-index
- `mobile`: Set to false to hide the tooltip on mobile

## Sound effects

UI sound effects are available as `.ogg` files and can be played with any audio library. The `sounds` export maps each name to its file URL:

```js
import { sounds } from "openguessr-ui";

new Audio(sounds.basic_button).play();
```

| Sound | Purpose |
| ----- | ------- |
| basic_button | Default sound for standard buttons and tabs |
| juicy_button | Selection-like choices (e.g. map selection) |
| start_button | Starting or joining a game |
| toggle_button | Anything that toggles (e.g. collapsibles) |
| change_value | Changing a value (e.g. through a ticker) |
| item_select | Selecting an item (e.g. a pin, badge, or flag) |
| item_locked | Trying to select a locked item |

No sound should be played for lightweight actions such as clicks on links or tiny "X" buttons (like the one used in the persistent tooltip).

The components don't play sounds themselves. Instead, they should be played via callbacks:

- Collapsible `ontoggle`: `toggle_button`
- Ticker `onchange`: `change_value`
- Tabs `onchange`: `basic_button`
- Notification `onaccept`, `ondismiss`: `basic_button`
- ConfirmPopup `onconfirm`: `basic_button`

## Text formatting guidelines

- Body text and headings should be written as plain sentences (sentence case) as opposed to title case (for example, “Game overview” rather than “Game Overview”). The only exception that OpenGuessr makes is for content that needs a clear title or branding such as modes (e.g. Country Guessr), maps (e.g. Capital Cities), competitions, and tournaments.
- Using a colon ":" in or for UI labels is not recommended.
- Headings should not end in a period.

## Flexibility

This design system is highly expandable. Instead of using fixed components for everything, most elements are built using the provided CSS variables. 

Game UIs should feel handcrafted instead of generic, there are many scenarios where custom controls feel more intuitive than any preexisting component would. So, don't use generic buttons for a fancy map selection screen, or don't use a slider for a health bar – creativity is what makes games feel special.
