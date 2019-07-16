function isInSight(el) { //是否在可视区
    const bound = el.getBoundingClientRect();
    //只考虑向下滚动
    const clientHeight = window.innerHeight;
    return bound.top <= clientHeight + 50; //提前加载
}

let index = 0; //已经加载图片的index
function checkImgs() {
    const imgs = document.querySelectorAll('.detailImg');
    // Array.from(imgs).forEach(element => {
    //     if (isInsight(element)) { //判断是否在可视区域
    //         //加载图片
    //         loadImg(element)
    //     }
    // });
    for (let i = index; i < imgs.length; i++) {
        if (isInSight(imgs[i])) {
            loadImg(imgs[i]);
            index = i;
        }
    }
}

function loadImg(el) {
    if (!el.src) {
        const source = el.dataset.src;
        el.src = source;
    }
}

function throttle(fn, mustRun = 500) {
    const timer = null;
    let previous = null;
    return function() {
        const now = new Date();
        const context = this;
        const args = arguments;
        if (!previous) {
            previous = now;
        }
        const remaining = now - previous;
        if (mustRun && remaining >= mustRun) {
            fn.apply(context, args);
            previous = now;
        }
    }
}