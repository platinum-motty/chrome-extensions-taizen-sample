// コンテキストメニュー（親）の作成
let parentProperties = <chrome.contextMenus.CreateProperties>{
    id: 'parent',
    title: '親メニュー',
    contexts: ['all'],
};
const parentId = chrome.contextMenus.create(parentProperties);

// コンテキストメニュー（子）の作成
let chlidProperties = <chrome.contextMenus.CreateProperties>{
    id: 'child',
    title: '子メニュー',
    contexts: ['all'],
    parentId: parentId,
};
const childId = chrome.contextMenus.create(chlidProperties);

// クリックイベントの登録
chrome.contextMenus.onClicked.addListener((info, tabs) => {
    if (info.menuItemId === 'child') {
        console.log(tabs?.url);
    }
});