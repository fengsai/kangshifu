$(function (){

    function loadingtime() {
        var img=['zhuanpan/zpbg.jpg',"zhuanpan/zhuanpan.png",'zhuanpan/btn.png'];
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
    var s="";
    var _datalist=JSON.parse(window.sessionStorage.getItem("shoujiangdata_fs"));
    var rotateTimeOut = function (){
        $('#zhuanpanarea').rotate({
            angle:0,
            animateTo:2160,
            duration:8000,
            callback:function (){

            }
        });
    };
    var bRotate = false;

    var rotateFn = function (awards, angles, txt){
        $('#zhuanpanarea').stopRotate();
        $('#zhuanpanarea').rotate({
            angle:0,
            animateTo:angles+1800,
            duration:8000,
            callback:function (){
                if(txt==1)
                {
                    $(".Tcss_window").css("display","-webkit-box");
                }else {
                    $(".Tcss_window_fss").css("display","-webkit-box");

                }
               
               setTimeout(function () {
                   bRotate = !bRotate;
               },1000);
            }
        })
    };

    $('#pointer').one("touchstart",function (){
        if(bRotate)return;
        bRotate = !bRotate;

        choujiangcomm();
        //console.log(item);
    });

    $(".tipbtn").on('touchstart',function () {
        $(".Tcss_window").css("display","none");
        window.location.href="shouhuolingqu.html?v="+Math.random();
    });

    $(".tipbtndd").on('touchstart',function () {
        $(".Tcss_window_fss").css("display","none");
        window.location.href="jifenindex.html";
    });
    function choujiangcomm() {
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
            //alert(JSON.stringify(result));
            if(result.responseCode=="200")
            {
                var a=[1,0,1,0,1,0,1,0];

                var item = rnd(0,8);
                s=item;
                // $('#zhuanpanarea').rotate({
                //     angle:0,
                //     animateTo:2160,
                //     duration:8000,
                //     callback:function (){
                //         alert('网络超时，请检查您的网络设置！');
                //     }
                // })
                var item =6;
                switch (item) {
                    case 0:
                        //var angle = [26, 88, 137, 185, 235, 287, 337];
                        rotateFn(0, 338, a[0]);
                        break;
                    case 1:
                        //var angle = [88, 137, 185, 235, 287];
                        rotateFn(1, 23, a[1]);
                        break;
                    case 2:
                        //var angle = [137, 185, 235, 287];
                        rotateFn(2, 68, a[2]);
                        break;
                    case 3:
                        //var angle = [137, 185, 235, 287];
                        rotateFn(3, 113, a[3]);
                        break;
                    case 4:
                        //var angle = [185, 235, 287];
                        rotateFn(4, 158, a[4]);
                        break;
                    case 5:

                        //var angle = [185, 235, 287];
                        rotateFn(5, 203, a[5]);
                        break;
                    case 6:
                        //var angle = [235, 287];
                        rotateFn(6, 248, a[6]);
                        break;
                    case 7:
                        //var angle = [235, 287];
                        rotateFn(7, 293, a[7]);
                        break;
                }

                var urls="https://qrcrmimg.masterkong.com.cn/crm-images/";
                var _addressdata=result.data.customerAddressInfo["detailAddress"]?result.data.customerAddressInfo:"wu";
                if(_addressdata=="wu")
                {

                }else {
                    window.sessionStorage.setItem("fsshouhuo",JSON.stringify(_addressdata));
                }
                result.data.picUrl=urls+result.data.picUrl;

                window.sessionStorage.setItem("dyjpdata",JSON.stringify(result.data));


            }else {
                $(".fffwtip").html(result.responseDesc)
                var a=[1,0,1,0,1,0,1,0];
                var item =1;
                switch (item) {
                    case 0:
                        //var angle = [26, 88, 137, 185, 235, 287, 337];
                        rotateFn(0, 338, a[0]);
                        break;
                    case 1:
                        //var angle = [88, 137, 185, 235, 287];
                        rotateFn(1, 23, a[1]);
                        break;
                    case 2:
                        //var angle = [137, 185, 235, 287];
                        rotateFn(2, 68, a[2]);
                        break;
                    case 3:
                        //var angle = [137, 185, 235, 287];
                        rotateFn(3, 113, a[3]);
                        break;
                    case 4:
                        //var angle = [185, 235, 287];
                        rotateFn(4, 158, a[4]);
                        break;
                    case 5:

                        //var angle = [185, 235, 287];
                        rotateFn(5, 203, a[5]);
                        break;
                    case 6:
                        //var angle = [235, 287];
                        rotateFn(6, 248, a[6]);
                        break;
                    case 7:
                        //var angle = [235, 287];
                        rotateFn(7, 293, a[7]);
                        break;
                }
            }
        }

        function error(er) {
            //alert(JSON.stringify(er));
        }

        G$.ajax(data,sucess,error)
    }

    var img=document.querySelectorAll("img");
    img.forEach(function (item) {
        $(item).on("click",function (e) {
            e.preventDefault();
        })
    })

    document.addEventListener("touchstart",function (e) {
        e.preventDefault();
    },{
        capture:false,
        passive:false
    })
});


function rnd(n, m){
    return Math.floor(Math.random()*(m-n+1)+n)
}