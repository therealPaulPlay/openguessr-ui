export const confirmPopup = $state({
    visible: false,
    title: "Default",
    description: "Default",
    confirmText: "Default",
    executeFunction: undefined
});

export function showConfirmPopup(title, text, executeFunction, confirmText) {
    confirmPopup.title = title;
    confirmPopup.description = text;
    confirmPopup.confirmText = confirmText || "Confirm";
    confirmPopup.executeFunction = executeFunction;

    confirmPopup.visible = true; // Show the popup
}
