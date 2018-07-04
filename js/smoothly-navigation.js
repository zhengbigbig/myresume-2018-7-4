!function () {
    var view = document.querySelector('nav.menu')
//获取点击li时的当前页面高度并用JS给一个缓动的动画
    var controller = {
        view:null,
        aTags:null,
        init:function (view) {
            this.view = view
            this.initAnimation()
            //当鼠标移进li对应的二级菜单激活，移出则消失
            this.bindEvents()
        },
        initAnimation:function () {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);
        },
        bindEvents:function () {
            let aTags = this.view.querySelectorAll('ul li a')
            for(let i=0; i<aTags.length;i++){
                aTags[i].onclick = ()=>{
                    x.preventDefault() //阻止不需要的事件发生
                    let a = x.currentTarget  //获取用户点击的对象
                    let href = a.getAttribute('href') //去除前缀
                    let element = document.querySelector(href) //通过这个选择器得到相对应的元素
                    let top = element.offsetTop//得到这个元素所要移动的高度
                    //  window.scrollTo(0,top-80)

                    let currentTop = window.scrollY
                    let targetTop = top - 80
                    var coords = { y: currentTop };

                    let s = targetTop - currentTop
                    var t = Math.abs((s/100)*300)
                    if(t>500){t = 500}
                    var tween = new TWEEN.Tween(coords)
                        .to({ y: targetTop }, t)
                        .easing(TWEEN.Easing.Quadratic.InOut)
                        .onUpdate(function() {
                            window.scrollTo(0,coords.y);
                        })
                        .start();
                }
            }
            let liTags = document.querySelectorAll('nav ul li.menuTigger')
            for(let i=0; i<liTags.length; i++){
                liTags[i].onmouseenter = function(x){
                    x.currentTarget.classList.add('active')
                }
                liTags[i].onmouseleave = function(x){
                    x.currentTarget.classList.remove('active')
                }
            }
        }
    }

    controller.init(view)
}.call()
