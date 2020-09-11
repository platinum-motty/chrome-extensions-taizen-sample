const OptionSettingsKey = 'sample-option-settings';

type Settings = {
    A: number,
    B: number,
};

type SettingKeys = 'A' | 'B';
const DefaultSettings = <Settings>{
    A: 0,
    B: 0,
};

$(async function() {
    // ボタンにclickイベントを登録
    $(document).on('click', '#ok-button', async function(){ 
        await setOptionSettings();
        window.close();
    });
    $(document).on('click', '#cancel-button', function(){
        window.close();
    });

    // 設定済みのオプションを読み込み、viewに反映
    const settings = await getBySyncStorage(OptionSettingsKey) || {};
    if(settings) {
        reflectToView(settings);
    }
    else {
        reflectToView(DefaultSettings);
    }
});

async function setOptionSettings(): Promise<void> {
    let options = DefaultSettings;

    // 各ラジオボタンの選択値を取得
    const oneOptionList = $('.one-setting > .setting-choice-area');
    for(let i = 0; i < oneOptionList.length; ++i) {
        let radios = $(oneOptionList[i]).find('input');
        for(let j = 0; j < radios.length; ++j) {
            if (!radios[j].checked) {
                continue;
            }
            let optionKey = <SettingKeys>(radios[j].getAttribute('name'));
            options[optionKey] = j;
        }
    }

    // 設定をstorageに保存
    await setToSyncStorage(OptionSettingsKey, options);
}

function reflectToView(options: any): void {
    for (let key in options) {
        let radioInputElems = $('input[name="' + key + '"]');
        if (radioInputElems.length === 0) {
            continue;
        }
        let targetElem = $(radioInputElems[options[key]]);
        if (targetElem.length === 0) {
            continue;
        }
        targetElem.prop('checked', true);
    }
}

function getBySyncStorage(key: string): Promise<any> {
    return new Promise((resolve) => {
        chrome.storage.sync.get(key, (value) => {
            resolve(value[key]);
        });
    });
}

function setToSyncStorage(key: string, val: any): Promise<void> {
    let value = Object.create(null);
    value[key] = val;

    return new Promise((resolve) => {
        chrome.storage.sync.set(value, () => {
            resolve();
        });
    });
}
