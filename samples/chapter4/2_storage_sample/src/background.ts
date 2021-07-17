const StorageKey = 'mylist';

chrome.action.onClicked.addListener(async () => {
    const rand = Math.round(Math.random()*100);

    const res = await getByStorage(StorageKey);
    console.log('GET', res);

    await setToStorage(StorageKey, rand);
    console.log('SET', rand);        
});

function getByStorage(key: string): Promise<number|null> {
    return new Promise((resolve) => {
        chrome.storage.local.get(key, (value) => {
            resolve(value[key]);
        });
    });
}

function setToStorage(key: string, val: number): Promise<void> {
    let value = Object.create(null);
    value[key] = val;

    return new Promise((resolve) => {
        chrome.storage.local.set(value, () => {
            resolve();
        });
    });
}

