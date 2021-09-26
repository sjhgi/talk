(function() {
    var sendBtn = document.getElementsByClassName("btn")[0];
    var input = document.getElementsByClassName("input")[0];
    var chatContainer = document.getElementsByClassName("main")[0];
    var init = function() {
        initEvent();

    }

    function initEvent() {
        sendBtn.addEventListener("click", onSendBtnClick);
    }
    //发送按钮事件
    function onSendBtnClick() {
        var value = input.value.trim(); //防止输入空格
        if (!value) return;
        renderChatInfo(value);
    }
    //定义渲染函数
    function renderChatInfo(val) {
        //发出的消息渲染到页面
        renderHtml(val, "right");
        input.value = "";
        //定义机器人的消息
        sendChatInfoToBackEnd(val);
    }

    function sendChatInfoToBackEnd(txt) {
        ajax({
            method: "get",
            url: 'https://developer.duyiedu.com/edu/turing/chat',
            data: {
                text: txt
            },
            onSuccess: function(ele) {
                renderHtml(ele.text, "left");
            }
        })
    }
    /* 填充内容结构到界面上 */
    function renderHtml(txt, direction) {

        var div = document.createElement("div");
        div.className = direction == "right" ? "chat-container avatar-container" : "chat-container robot-container";
        var img = new Image();
        img.src = direction == "right" ? "./img/avatar.jpg" : "./img/robot.jpg";
        var div1 = document.createElement("div");
        div1.className = "chat-txt";
        div1.innerText = txt;
        div.appendChild(img);
        div.appendChild(div1);
        chatContainer.appendChild(div);
        var distanceTop = div1.offsetTop;
        chatContainer.scrollTo(0, distanceTop);

    }




    init();
})()