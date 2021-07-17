$(function () {
    let counter = $('#counter')[0];
    $('#button-minus')[0].addEventListener('click', () =>  {
        counter.innerText = '' + (Number(counter.innerText) - 1);
    });
    $('#button-plus')[0].addEventListener('click', () =>  {
        counter.innerText = '' + (Number(counter.innerText) + 1);
    });
});
