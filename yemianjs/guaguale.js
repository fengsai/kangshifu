/**
 * Created by Administrator on 2018/4/23.
 */

;(function () {
    function loadingtime() {
        var img=['guaguale/WechatIMG141.png',"guaguale/WechatIMG134.png",'guaguale/1/111.png'];
        var i=0,
            count=0,
            len=img.length;
        for(;i<len;i++)
        {
            var img_fs=new Image();
            img_fs.onload=function () {
                count++;
                if(count>=img.length)
                {
                    setTimeout(function () {
                        $(".Tcss_window_windows").css("display","none");
                    },500);
                }
            }

            img_fs.src=img[i];
        }
    }

    loadingtime();
    var _datalist=JSON.parse(window.sessionStorage.getItem("shoujiangdata_fs"))
    var c1; //画布
    var ctx; //画笔
    var ismousedown; //标志用户是否按下鼠标或开始触摸
    var isOk=0; //标志用户是否已经刮开了一半以上
    var ischuli=true;
    var fontem = parseInt(window.getComputedStyle(document.documentElement, null)["font-size"]);//这是为了不同分辨率上配合@media自动调节刮的宽度
    window.onload = function(){
        c1 = document.getElementById("c1");
        //这里很关键，canvas自带两个属性width、height,我理解为画布的分辨率，跟style中的width、height意义不同。
        //最好设置成跟画布在页面中的实际大小一样
        //不然canvas中的坐标跟鼠标的坐标无法匹配
        c1.width=c1.clientWidth;
        c1.height=c1.clientHeight;
        ctx = c1.getContext("2d");
        //PC端的处理
        c1.addEventListener("mousemove",eventMove,false);
        c1.addEventListener("mousedown",eventDown,false);
        c1.addEventListener("mouseup",eventUp,false);
        //移动端的处理
        c1.addEventListener('touchstart', eventDown,false);
        c1.addEventListener('touchend', eventUp,false);
        c1.addEventListener('touchmove', eventMove,false);
        //初始化
        initCanvas();
    }

    function initCanvas(){//网上的做法是给canvas设置一张背景图片，我这里的做法是直接在canvas下面另外放了个div
        //c1.style.backgroundImage="url(中奖图片.jpg)";
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = '#aaaaaa';
        ctx.fillRect(0,0,c1.clientWidth,c1.clientHeight);
        ctx.fill();
       // ctx.font = "Bold 30px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#a0a0a0";
        //ctx.fillText("刮一刮",c1.width/2,50);//把这个属性设为这个就可以做出圆形橡皮擦的效果
        //有些老的手机自带浏览器不支持destination-out,下面的代码中有修复的方法
        ctx.globalCompositeOperation = 'destination-out';
    }

    function eventDown(e){
        e.preventDefault();
        ismousedown=true;
        if(ischuli)
        {
            //ajax
            guguajax();
            ischuli=false;
        }
    }

    function eventUp(e){
        e.preventDefault();
        //得到canvas的全部数据
        var a = ctx.getImageData(0,0,c1.width,c1.height);
        var j=0;
        for(var i=3;i<a.data.length;i+=4){
            if(a.data[i]==0)j++;
        }
        //当被刮开的区域等于一半时，则可以开始处理结果
        if(j>=a.data.length/8){
            isOk = 1;
        }
        ismousedown=false;
    }

//鼠标移动 和 触摸移动
    function eventMove(e){
        e.preventDefault();
        if(ismousedown) {
            if(e.changedTouches){
                e=e.changedTouches[e.changedTouches.length-1];
            }
            var topY = document.getElementById("top").offsetTop;
            var oX = c1.offsetLeft,
                oY = c1.offsetTop+topY;
            var x = (e.clientX + document.body.scrollLeft || e.pageX) - oX || 0,
                y = (e.clientY + document.body.scrollTop || e.pageY) - oY || 0;

            //画360度的弧线，就是一个圆，因为设置了ctx.globalCompositeOperation = 'destination-out';
            //画出来是透明的
            ctx.beginPath();
            ctx.arc(x, y, fontem*0.5, 0, Math.PI * 2,true);

            //下面3行代码是为了修复部分手机浏览器不支持destination-out
            //我也不是很清楚这样做的原理是什么
            c1.style.display = 'none';
            c1.offsetHeight;
            c1.style.display = 'inherit';
            ctx.fill();
        }
        if(isOk){
           // var btn = document.getElementsByClassName("btn");
           //  for(var i=0; i<btn.length; i++){
           //     // btn[i].style.zIndex = '3';
           //  }
           // document.getElementsByClassName("btn")[0].style.zIndex="3";
        }
    }


    function gusucess(img,text) {
        var html="";
            html+='<div class="tupianzhongjian" style="background-image: url('+img+')"></div>';
            html+='<div style="font-size: 100%;color: #898989;text-align: center;' +
                'margin-top:0.234375rem;">'+text+'</div>';

        return html;
    }

    function errorguagu() {
        var html="";
        html+='<div style="text-align: center;' +
            'font-size: 125%;' +
            'color: #898989;height: 100%;line-height: 3.15625rem;">谢谢参与!</div>';
        return html;
    }

    function guguajax() {
        var data={
            type: 'post',
            httpType: G$.sweetHttp + "imasterkong/integralMall/luckyDraw.do",
            reqData: {
                "appId":params.appId,
                "openId":params.openId,
                "timestamp":+new Date(),
                "signParams":params.signParams,
                "prizeId":_datalist.prizeId
            }
        };
        Mparams(data);

        function sucess(result) {
            if(result.responseCode=="200")
            {
                var urls="https://qrcrmimg.masterkong.com.cn/crm-images/";
                var _addressdata=result.data.customerAddressInfo["detailAddress"]?result.data.customerAddressInfo:"wu";
                if(_addressdata=="wu")
                {

                }else {
                    window.sessionStorage.setItem("fsshouhuo",JSON.stringify(_addressdata));
                }
                result.data.picUrl=urls+result.data.picUrl;

                window.sessionStorage.setItem("dyjpdata",JSON.stringify(result.data));
                $("#lotteryContainer").html(gusucess(result.data.picUrl,result.data.prizeName));

                $(".btnlingqu").html("立即领取");
                $(".btnlingqu").css('display',"block");
                $(".btnlingqu").on("click",function () {
                    window.location.href="shouhuolingqu.html";
                })

            }else {
                $("#lotteryContainer").html(errorguagu());
                $(".btnlingqu").css('display',"block");
                $(".btnlingqu").html("看看其他");
                $(".btnlingqu").on("click",function () {
                    window.location.href="jifenindex.html";
                })
            }
        }

        function error(er) {

        }

        G$.ajax(data,sucess,error);
    }

})()

