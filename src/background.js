// https://stackoverflow.com/questions/12065029/redirecting-url-in-a-chrome-extension
var KEY = 'key-android-redirect'

var host = "https://developer.android.google.cn";
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        var enableRedirect = localStorage.getItem(KEY) != 'disable'
        if (!enableRedirect) {
            return
        }
        return {
            redirectUrl: host + details.url.match(/^https?:\/\/[^\/]+([\S\s]*)/)[1]
        };
    }, {
        urls: [
            "*://developer.android.com/*"
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    }, ["blocking"]
)