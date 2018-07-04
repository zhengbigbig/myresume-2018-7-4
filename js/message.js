!function(){
    var model = {
        // 获取数据
        init: function(){
            var APP_ID = '4OuH8RUbpCtmbvIxywj6c1bp-gzGzoHsz'
            var APP_KEY = '8zpWi17zpofiv0GFgRSFb57b'
            AV.init({ appId: APP_ID, appKey: APP_KEY })
        },
        fetch: function(){
            var query = new AV.Query('Message');
            return query.find() // Promise 对象
        },
        // 创建数据
        save: function(name, content){

        }
    }

    var view = document.querySelector('section.message')


    var controller = {
        view: null,
        model: null,
        messageList: null,
        init: function(view, model){
            this.view = view
            this.model = model

            this.messageList = view.querySelector('#messageList')

            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },
        loadMessages: function(){
            this.model.fetch().then(
                (messages) => {
                let array = messages.map((item)=> item.attributes )
            array.forEach((item)=>{
                let li = document.createElement('li')
                li.innerText = `${item.name}: ${item.content}`
            this.messageList.appendChild(li)
        })
        }
        )
        },
        bindEvents: function(){
            let myForm = view.querySelector('form')
            myForm.addEventListener('submit', function(e){
                e.preventDefault()

                let content = myForm.querySelector('input[name=content]').value
                let name = myForm.querySelector('input[name=name]').value
                var Message = AV.Object.extend('Message');
                var message = new Message();
                message.save({  // Promise 对象
                    'name': name,
                    'content': content
                }).then(function(object) {
                    let li = document.createElement('li')
                    li.innerText = `${object.attributes.name}: ${object.attributes.content}`
                    let messageList = document.querySelector('#messageList')
                    messageList.appendChild(li)
                    myForm.querySelector('input[name=content]').value = ''
                    console.log(object)
                })
            })
        },
    }

    controller.init(view, model)


}.call()