function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
    obj.style.width = obj.contentWindow.document.documentElement.scrollwidth + 'px';
}

addEventListener('DOMContentLoaded', e => { // All external links should open in new windows/tabs 
    for (let x of document.querySelectorAll('a[href^="//"],a[href^="http"]')) {
        if (!x.href.match(/(alex\.port|alexanykey)/)) {
            x.target = '_blank';
        }
    }
});



onload = () => {

    function ajaxer(url, callback) { // универсальная функция для запроса, передающая данные через колбэк
        let req = new XMLHttpRequest();
        req.open('GET', url);
        req.onload = function () {
            if (200 === req.status) {
                callback(req.responseText);
            } else {
                callback('<div class="needed ajaxerror">Помилка завантаження</div>');
            }
        };
        req.send();
    }

    Element.prototype.ajaxloader = function (url, element = '') {
        ajaxer(url, (response) => {
            let x = document.createElement('div');
            x.innerHTML = response;
            this.innerHTML = (element) ? x.querySelector(element).innerHTML : response;
        });
    };


    (function init(page = '') {

        if (!page) {
            if (location.hash){
                page = 'texts/' + location.hash.substr(1) + '.html';
            } else {
                page = 'texts/home.html';
            }
        }
        document.querySelector('.Content.Padded').ajaxloader(page, '.needed');

        addEventListener('popstate', () => {
            init( 'texts/' + location.hash.substr(1) + '.html' )
        });

    })();


};

