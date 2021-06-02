

window.onload = function () {
    init();
}

function init() {
    initBanner()
    initMenu()
    initNews()
    initHero()
    initVideo();
}
//初始化轮播图
function initBanner() {
    const banner = $('.page-banner .slider-container');
    const dots = $('.page-banner .dots')
    createSlider(banner, 3000, 1, (index) => {
        const ac = dots.querySelector('.active');
        ac && ac.classList.remove('active');
        dots.children[index].classList.add('active');
    })
}
//点击标签
function changeTab() {
    const tabs = $('.page-tab');
    const ac = tabs.querySelector('.active');
    ac && ac.classList.remove('active');
    arguments[0].classList.add('active');
}

function initMenu() {
    let isExpand = false;
    $('.menu .expand').onclick = function () {
        let spr = this.querySelector('.spr');
        let txt = this.querySelector('.txt')
        let menulist = $('.menu .menu-list');
        if (isExpand) {
            txt.innerText = "展开";
            spr.classList.add('spr_expand');
            spr.classList.remove('spr_collapse');
            menulist.style.flexWrap = "nowrap";
        } else {
            txt.innerText = "折叠";
            spr.classList.add('spr_collapse');
            spr.classList.remove('spr_expand');
            menulist.style.flexWrap = "wrap";
        }
        isExpand = !isExpand
    }
}

function initNews() {
    (async function () {
        const resp = await fetch('../data/news.json').then(function (resp) {
            return resp.json();
        })
        let slider = $('.news-list .slider-container');
        slider.innerHTML = Object.values(resp).map(function (item) {
            return `<div class='slider-item'>${item
                .map(function (item) {
                    return `<div class='news-item ${item.type}'>
                <a href='${item.link}' >${item.title}</a>
                <span>${item.pubDate}</span>    
                </div>`
                }).join('')}</div>`
        }).join('');
        createBlock($('.news-list'))
    }())

}

function initHero() {
    (async function () {
        const resp = await fetch('../data/hero.json').then(function (resp) {
            return resp.json();
        })
        let slider = $('.hero-list .slider-container');

        createHeroItem(
            resp.filter((item) => {
                return item.hot === 1
            })
        )

        for (let i = 1; i <= 6; i++) {
            createHeroItem(
                resp.filter((item) => {
                    return item.hero_type === i || item.hero_type2 === i
                })
            )
        }


        function createHeroItem(heros) {
            const div = document.createElement('div');
            div.className = 'slider-item';
            div.innerHTML = heros.map(item => {
                return `<a><img
                        src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg"/>
                      <span>${item.cname}</span>
                      </a>`
            }).join('')
            slider.appendChild(div)
        }
        createBlock($('.hero-list'))
    }())
}


function initVideo() {
    (async function () {
        const resp = await fetch('../data/video.json').then(function (resp) {
            return resp.json();
        })
        let slider = $('.video-list .slider-container');
        slider.innerHTML = Object.values(resp).map(item => {
            return `<div class='slider-item'>
                      ${item.map(item => {
                return `<a href='${item.link}'>
                               <img src='${item.cover}'/>
                               <div class='title'>${item.title}</div>
                               <div class='aside'>
                               <div class='play'>
                                 <span class='spr spr_videonum'></span>
                                 <span>${item.playNumber}</span>
                               </div>
                               <div class='time'>${item.pubDate}</div>
                               </div>  
                            </a>`
            }).join('')}</div>`
        }).join('');
        createBlock($('.video-list'))
    }())
}