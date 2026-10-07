export const errorPopupState = $state({
  popupOpen: false,
  hideDisableOption: true, // This will hide the "Don't show again" option, mostly for minor messages that are needed
  hideErrors: false, // False, if the user clicks on "Don't show again" (ignored for critical errors) it will become true
  title: "",
  description: "",
  errorCode: "",
  reload: false
});

export function errorPopup(popupTitle, popupDescription, popupErrorCode, reloadPopup, hideDontShowAgainOption) {
  errorPopupState.hideDisableOption = hideDontShowAgainOption;

  // If errors should be shown or it is a critical error that needs a reload, show the popup
  if (!errorPopupState.hideErrors || reloadPopup) {
    errorPopupState.title = popupTitle;
    errorPopupState.description = popupDescription;
    errorPopupState.errorCode = popupErrorCode;
    errorPopupState.reload = reloadPopup;
    errorPopupState.popupOpen = true;
  }
}
