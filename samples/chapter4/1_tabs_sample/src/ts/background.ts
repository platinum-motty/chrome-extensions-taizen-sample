chrome.browserAction.onClicked.addListener(() => {
    const query = {
        active: true, 
        currentWindow: true
    };
    chrome.tabs.query(query, (tabs) => {
        const currentTab = tabs[0];
        console.log(currentTab.id, currentTab.title);
    });
});
