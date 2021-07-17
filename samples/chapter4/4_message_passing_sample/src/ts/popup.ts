$(async function () {
    // コンテンツスクリプトから価格リストを取得
    const priceList = await getPriceListByDOM();
    for (let price in priceList) {
        let elem = $('<div>', {
            class: 'item',
            text: `${price} (${priceList[price]})`, 
        }).prop('outerHTML');

        $('#event-flag-container').append(elem);
    }
});

async function getPriceListByDOM(): Promise<any> {
    return new Promise((resolve, reject) => {
        const query = {
            active: true, 
            currentWindow: true,
        };
        chrome.tabs.query(query, (tabs: chrome.tabs.Tab[]) => {
            const tab = tabs[0];
            if (!tab?.id) {
                reject();
            } else {
                const message = {uri: 'getPriceList'};
                chrome.tabs.sendMessage(tab?.id, message, (response) => {
                    resolve(response);
                });
            }
        });
    });
}