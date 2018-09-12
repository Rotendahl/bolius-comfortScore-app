export const Tracking = {
    dataLayer: window.dataLayer = window.dataLayer || [],

    trackEvent: function(action, label, interactivity) {
        this.dataLayer.push({
            "event": "widget",
            "eventCategory": "comfortscore",
            "eventAction": action,
            "eventLabel": label,
            "eventValue": undefined,
            "eventNonInteractive": interactivity
        });
    }
}
