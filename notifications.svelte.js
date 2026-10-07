export const notification = $state({
    visible: false,
    text: "",
    viewOnly: false,
    clickableText: null,
    textClickFunction: null,
    acceptFunction: null,
    dismissFunction: null
});

let hideNotificationTimeout;

export async function showNotification(text, acceptAction, dismissAction, viewOnlyParam, clickableTextParam, textClickFunctionParam) {
    clearTimeout(hideNotificationTimeout);

    // If a notification is already shown, animate that away
    if (notification.visible) {
        hideNotification();

        await new Promise(resolve => setTimeout(resolve, 250));
    };

    // Show visible
    notification.visible = true;

    // Set notification state
    notification.text = text;
    notification.viewOnly = viewOnlyParam;

    // Clickable text inside notification, e.g. for profiles
    notification.clickableText = clickableTextParam;
    notification.textClickFunction = textClickFunctionParam;

    if (viewOnlyParam) {
        hideNotificationTimeout = setTimeout(() => {
            hideNotification();
        }, 5000); // Shorter expiration for informational notifications
    } else if (acceptAction) {
        hideNotificationTimeout = setTimeout(() => {
            hideNotification();
        }, 15000); // Much longer expiration time for notifications that ask for user action
    } else {
        hideNotificationTimeout = setTimeout(() => {
            hideNotification();
        }, 3000);
    }

    // Set functions
    notification.acceptFunction = acceptAction;
    notification.dismissFunction = dismissAction;
}

export function hideNotification() {
    notification.visible = false;
}
