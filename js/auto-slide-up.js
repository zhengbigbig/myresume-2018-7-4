!function () {
    let specialTags = document.querySelectorAll('[data-x]')
    for(let i =0;i< specialTags.length;i++)
        specialTags[i].classList.add('offset')

    findClosestAndRemoveOffset()
    window.addEventListener('scroll',function() {
        findClosestAndRemoveOffset()
    })

    /*helper*/
    function findClosestAndRemoveOffset() {
        let specialTags = document.querySelectorAll('[data-x]')
        let minIndex = 0
        for (let i = 1; i < specialTags.length; i++) {
            if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY))
                minIndex = i
        }//找出当前离屏幕上端最小的
        specialTags[minIndex].classList.remove('offset')


        //当界面移动到相应部分,li部分高亮
        let id = specialTags[minIndex].id
        let a = document.querySelector('a[href="#' + id + '"]')//从最小部分得到这个a标签的id
        let li = a.parentNode//得到其父节点
        let brothersAndMe = li.parentNode.children//其父节点的父节点下的所有子节点，也就是所有的li
        for (let i = 0; i < brothersAndMe.length; i++) {
            brothersAndMe[i].classList.remove('highlight')//移除所有li的高亮样式
        }
        li.classList.add('highlight')//添加当前li的高亮样式
    }
}.call()