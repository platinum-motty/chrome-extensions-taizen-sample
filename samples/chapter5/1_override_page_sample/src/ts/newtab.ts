function getTime(): string {
    const now = new Date();
    const hour = ('0' + now.getHours()).substr(-2);
    const min = ('0' + now.getMinutes()).substr(-2);
    const sec = ('0' + now.getSeconds()).substr(-2);
    return hour + ':' + min + ':' + sec;
}

$(function () {
    setInterval(() => {
        $('#clock')[0].innerText = getTime();
    }, 1000)
});
