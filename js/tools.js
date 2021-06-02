function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}


/**
 * 完成该区域的轮播功能
 * 该函数需要实现手指滑动切换、自动切换
 * @param {HTMLElement} container 轮播容器
 * @param {Number} duration 自动切换的间隔时间，0表示不进行自动切换
 * @param {Number} speed 录播速度
 * @param {Function} callback 完成切换后需要调用的函数
 * @return {Function} 返回一个函数，调用函数，可以随意的切换显示的子项
 */

function createSlider(container, duration, speed, callback) {

    const firstItem = container.querySelector('.slider-item');
    const cw = container.clientWidth;
    const count = container.children.length;
    let curIndex = 0;

    function setHeight(){
        container.style.height = container.children[curIndex].offsetHeight+'px'; 
   }
   setHeight();

    /**
     * 跳到指定某子项
     * @param {number} index 索引
     */
    function switchTo(index) {
        if (index < 0) {
            index = 0;
        } else if (index > count - 1) {
            index = count - 1
        }
        curIndex = index;
        setHeight();
        firstItem.style.transition = speed+'s';
        firstItem.style.marginLeft = -index * cw + 'px';
        callback && callback(curIndex);
    }
    
   
    let timer = null;

    function beginAuto() {
        if (timer || duration == 0) {
            return
        }
        timer = setInterval(() => {
            switchTo((curIndex + 1) % count)
        }, duration)
    }

    function endAuto() {
        clearInterval(timer);
        timer = null;
    }

    beginAuto();

    container.ontouchstart = e => {
        let x = e.touches[0].clientX;
        let y =e.touches[0].clientY;
        let ml = parseFloat(firstItem.style.marginLeft) || 0;
        endAuto();
        firstItem.classList.transition = 'none';
        container.ontouchmove = e => {
            let disX = e.touches[0].clientX - x;
            let disY =e.touches[0].clientY-y;
            if(Math.abs(disX)<Math.abs(disY)){
                return;
            }
            let newMl = ml + disX;
            let minMl = -(count - 1) * cw;
            if (newMl < minMl) {
                mewMl = minMl
            }
            if (newMl > 0) {
                newMl = 0
            }
            e.preventDefault();
            firstItem.style.marginLeft = newMl + 'px'
        }

        container.ontouchend = e => {
            const disX = e.changedTouches[0].clientX - x;
            if (disX <-30) {
                switchTo(curIndex + 1)
            } else if (disX >30) {
                switchTo(curIndex - 1)
            }
            beginAuto();
        }

    }
    return switchTo
}


function createBlock(blockContainer){
    let slider=blockContainer.querySelector('.slider-container')
    let blockMenu=blockContainer.querySelector('.block-menu');
    let goto = createSlider(slider,0,0.5,function(index){
        let ac =blockMenu.querySelector('.active');
        ac&&ac.classList.remove('active');
        blockMenu.children[index].classList.add('active'); 
    })
    for(let i=0;i<blockMenu.children.length;i++){
        blockMenu.children[i].onclick=function(){
            goto(i);
        }
    }
}
