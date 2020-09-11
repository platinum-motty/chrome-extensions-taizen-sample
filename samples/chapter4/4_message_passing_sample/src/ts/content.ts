// イベントリスナーの登録
chrome.runtime.onMessage.addListener(
	(request, sender, sendResponse) => {
		let response = Object.create(null);

		// 拡張機能からのリクエストであることのチェック
		if (!sender.tab && request['uri'] === 'getPriceList') {
			// 価格と個数をまとめて取得
			response = getPriceList();
		}

		sendResponse(response);
	}
);

function getPriceList(): Object {
	let priceList = Object.create(null);

	// 価格の要素をすべて取得
	const prices = document.querySelectorAll('.price');
	for (let i = 0; i < prices.length; ++i) {
		let price = prices[i].textContent?.replace(/[^0-9]/g, '');

		if (!price) {
			continue;
		}

		priceList[price] = (priceList[price] || 0) + 1;
	}

	return priceList;
}