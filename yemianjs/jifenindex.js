/**
 * Created by Administrator on 2018/4/11.
 */
;(function () {
    var listfsdata=null;
    $(".tb").each(function (index,item) {
           if($(item).hasClass("selected"))
           {
               $(".tabshow"+$(item).data("id")).css("display","-webkit-box");
           }else {
               $(".tabshow"+$(item).data("id")).css("display","none");
           }
    })
    $(".tb").on("click",function () {
        if($(this).hasClass("selected"))
        {
            return;
        }
        $(".tb").each(function (index,item) {
            $(item).removeClass("selected");
        })
        $(this).addClass("selected");

        $(".tabshow").each(function (index,item) {
            $(item).css("display","none");
        });

        $(".tabshow"+$(this).data("id")).css("display","-webkit-box");
        if($(this).data("id")==2)
        {

        }else if($(this).data("id")==3) {
            $(".tabshow3").html(winscore(_datalist.winscore))
            $(".listyjf").on("click",function (e) {
                var idss=e.target.dataset["ids"];
                if(e.target.dataset["type"]=="store")
                {
                    if(listfsdata[idss].haveurl=="1")
                    {
                        window.location.href="centertab.html?type=shop&v="+Math.random();

                    }
                }else if(e.target.dataset["type"]=="gift")
                {
                    if(listfsdata[idss].haveurl=="1")
                    {
                        window.location.href=listfsdata[idss].url;

                    }
                }else if(e.target.dataset["type"]=="answer")
                {
                    if(listfsdata[idss].haveurl=="1")
                    {
                        window.location.href=listfsdata[idss].url;

                    }
                }
            })
        }


    });

    var _datalist={
        jftotal:0,
        jfc:[],
        jfd:[],
        jfcb:[],
        jfdb:[],
        winscore:null
    }
    
    $(".subtt").on("click",function () {
       var  urls="https://qrcrmimg.masterkong.com.cn/crm-images/";

        if($(this).hasClass("subselect"))
            {
                return;
            }
            $(".subtt").each(function (index,item) {
                $(item).removeClass("subselect");
            })

          $(this).addClass("subselect");
          if($(this).html()=="积分抽奖")
          {
              $(".gundongquyu").html(jdhtml(_datalist.jfc,"cj"));
              $(".bnnersy").css("backgroundImage","url("+urls+ _datalist.jfcb+")");
              bindEvent();
          }else if($(this).html()=="积分兑换"){
              $(".gundongquyu").html(jdhtml(_datalist.jfd,"dh"));
              $(".bnnersy").css("backgroundImage","url("+urls+ _datalist.jfdb+")");
              bindEvent();
          }

    })

    function jfSHop() {
        this.integralGoodsInfos=[];
        this.prizeInfos=[];
    }

    function shujulisttip() {
        var html="";
        html+="<div class='w1' style='height: 1.5rem;" +
            "text-align: center;line-height: 1.5rem;font-size: 120%;color: #3d3d3d'>数据加载中</div>";
        return html;
    }
    var flag=false;
    // $(".gundongquyu")[0].onscroll=function () {
    //     if(this.scrollTop===0)
    //     {
    //         console.log("滚动到顶部");
    //     }if(this.scrollTop+$(".gundongquyu")[0].clientHeight>=$(".gundongquyu")[0].scrollHeight)
    //     {
    //         console.log("滚动到底部");
    //         flag=true;
    //         if(flag)
    //         {
    //             $(this).append(shujulisttip());
    //             flag=false;
    //         }
    //
    //     }
    // }

    function throttle(func, wait, mustRun) {
        var timeout,
            startTime = new Date();

        return function() {
            var context = this,
                args = arguments,
                curTime = new Date();

            clearTimeout(timeout);
            // 如果达到了规定的触发时间间隔，触发 handler
            if(curTime - startTime >= mustRun){
                func.apply(context,args);
                startTime = curTime;
                // 没达到触发间隔，重新设定定时器
            }else{
                timeout = setTimeout(func, wait);
            }
        };
    };
// 实际想绑定在 scroll 事件上的 handler
    function realFunc(){
        if($(".gundongquyu")[0].scrollTop===0)
            {
                console.log("滚动到顶部");
            }if($(".gundongquyu")[0].scrollTop+$(".gundongquyu")[0].clientHeight>=$(".gundongquyu")[0].scrollHeight)
            {

                $($(".gundongquyu")[0]).append(shujulisttip());

            }
    }
// 采用了节流函数
  //  $(".gundongquyu")[0].addEventListener('scroll',throttle(realFunc,1000,2000));
    
    function jiazaishuju() {
        var data={
            type: 'post',
            httpType: G$.sweetHttp + "imasterkong/integralMall/exchangeGoods.do",
            reqData: {
                openId:params.openId,
                appId:params.appId,
                "timestamp":+new Date()
            }
        },
            urls="https://qrcrmimg.masterkong.com.cn/crm-images/";


        Mparams(data);

        function sucess(result) {
            if(result.responseCode=="200")
            {
                var _result=result.data;
                _datalist.winscore=_result.IntegralWinPoints;
                _datalist.jftotal=_result.totalScore;
                _datalist.jfc=_result.integralActiveDraw.prizeInfos;
                _datalist.jfcb=_result.integralActiveDraw.mallaPic;
                _datalist.jfd=_result.integralActiveExchange.prizeInfos?_result.integralActiveExchange.prizeInfos:[];
                _datalist.jfdb=_result.integralActiveExchange.mallaPic;
                _datalist.winscore=_result.IntegralWinPoints?_result.IntegralWinPoints:{};
                _datalist.jcmallaType=_result.integralActiveDraw.mallaType;
                _datalist.dhmallaType=_result.integralActiveExchange.mallaType;
               // console.log(_datalist)
                $(".gundongquyu").html(jdhtml(_datalist.jfc,"cj"));
                $(".bnnersy").css("backgroundImage","url("+urls+ _datalist.jfcb+")");
               // $(".container")[0].
                bindEvent();
            }
        }

        function err(er) {

        }

        G$.ajax(data,sucess,err);
    }

    function jdhtml(data,type) {
            var html="";
            var len=data.length,
                i=0,
                urls="https://qrcrmimg.masterkong.com.cn/crm-images/";

        for(;i<len;)
            {
                html+='<div class="borboxsize bx bxh w1" style="height:5.203125rem;border-bottom:0.0625rem solid #f3f3f3;">';
                html+='<div data-indexid="'+i+'" data-integralcnt="'+data[i].integralCnt+'" data-prizetype="'+(type=="cj"?_datalist.jcmallaType:_datalist.dhmallaType)+'" data-prizeid="'+data[i].prizeId+'" data-type="'+(type=="cj"?"cj":"dh")+'" class="jpleft1 bxf1 w1 borboxsize bx bxv bxc shijianbind" style="border-right:0.0625rem solid #f3f3f3;">';
                html+='<div class="jplfetimg1" style="background-image: url('+urls+data[i].prizePic+')"></div>';
                html+='<div class="fontleft1">'+data[i].prizeName+'</div>';
                html+='<div class="fontleft1" style="color:#c60012">'+data[i].exField1+data[i].integralCnt+data[i].exField2+'</div>';
                html+='</div>';
                if(typeof data[i+1]!=="undefined")
                {
                    html+='<div data-indexid="'+(i+1)+'" data-integralcnt="'+data[i+1].integralCnt+'" data-prizetype="'+(type=="cj"?_datalist.jcmallaType:_datalist.dhmallaType)+'" data-prizeid="'+data[i+1].prizeId+'" data-type="'+(type=="cj"?"cj":"dh")+'" class="jpleft2 bxf1 w1 bx bxv bxc borboxsize shijianbind">';
                    html+='<div class="jplfetimg2" style="background-image: url('+urls+data[i+1].prizePic+')"></div>';
                    html+='<div class="fontleft2">'+data[i+1].prizeName+'</div>';
                    html+='<div class="fontleft2" style="color:#c60012">'+data[i].exField1+data[i+1].integralCnt+data[i].exField2+'</div>';
                    html+='</div>';
                    html+='</div>';
                }else {
                    html+='<div data-sdta="wu" data-type="'+(type=="cj"?"cj":"dh")+'" class="jpleft2 bxf1 w1 bx bxv bxc borboxsize">';
                    html+='<div class="jplfetimg2" style="background-image: url("")"></div>';
                    html+='<div class="fontleft2"></div>';
                    html+='<div class="fontleft2" style="color:#c60012"></div>';
                    html+='</div>';
                    html+='</div>';
                }

                i+=2;

            }

        return html;
    }

    jiazaishuju()
    
    function bindEvent() {
        var list=document.querySelectorAll(".shijianbind");
        list.forEach(function (item) {
            $(item).on("click",function () {
                var indexid=$(this).data("indexid");
                if($(this).data("integralcnt")>_datalist.jftotal)
                {
                    $(".jfshul_fs").html("需要"+$(this).data("integralcnt")+"积分");
                    $(".yiyouj_fs").html("您的积分为"+_datalist.jftotal+",积分不足!");
                    $(".jfbuzu").css("display","-webkit-box");
                    $(".jfbuzu_btn").on("click",function () {
                        $(".jfbuzu").css("display","none");
                    })

                    return;

                }
                if($(this).data("type")=="cj") {
                    window.sessionStorage.setItem("shoujiangdata_fs",JSON.stringify(_datalist.jfc[indexid]));
                    switch ($(this).data("prizetype"))
                    {
                        case 1:
                            window.location.href="yaoyiyao.html?v="+Math.random();
                            break;
                        case 2:
                            window.location.href="zhuanpan.html?v="+Math.random();
                            break;
                        case 3:
                            window.location.href="guaguale.html?v="+Math.random();
                            break;
                        case 4:
                            window.location.href="duijiang.html?v="+Math.random();
                            break;
                    }

                    return;

                }else if($(this).data("type")=="dh")
                {
                    var _listdata=_datalist.jfd[indexid];
                    var urls="https://qrcrmimg.masterkong.com.cn/crm-images/";

                    $(".exchangeimg").css("backgroundImage","url("+urls+_listdata.prizePic+")");
                    $(".exfontt1").html(_listdata.prizeName);
                    $(".exfontt2").html(_listdata.exField1+""+_listdata.integralCnt+""+_listdata.exField2);
                    $(".cpexchange").css("display","-webkit-box");

                    $(".bntexcange").one("click",function (e) {
                        console.log(e.target)
                        if(e.target.innerHTML=="再看看")
                        {
                            $(".cpexchange").css("display","none");

                        }else if(e.target.innerHTML=="立即兑换")
                        {
                           //兑换
                            jfdh_sss(_listdata.prizeId);
                        }
                    })
                }
            })
        })
    }

    function winscore(data) {

        var html="",
            listdata=[],
            answer={},
            gift={},
            store={};
            if(data)
            {
                for(var key in data)
            {
                if(key.indexOf("answer")>=0)
                {

                    answer[(key.indexOf("Pic")>=0?"pic":
                        key.indexOf("Points")>=0?'points':
                            key.indexOf("Title")>=0?"title":key.indexOf("Url")>=0?"url":"")]=data[key];


                }else if(key.indexOf("gift")>=0)
                {
                    gift[(key.indexOf("Pic")>=0?"pic":
                        key.indexOf("Points")>=0?'points':
                            key.indexOf("Title")>=0?"title":key.indexOf("Url")>=0?"url":"")]=data[key];


                }else if(key.indexOf("store")>=0)
                {
                    store[(key.indexOf("Pic")>=0?"pic":
                        key.indexOf("Points")>=0?'points':
                            key.indexOf("Title")>=0?"title":key.indexOf("Url")>=0?"url":"")]=data[key];


                }

                if(key=="haveStore")
                {
                    store["haveurl"]=data[key];
                }

                if(key=="haveGift")
                {
                    gift["haveurl"]=data[key];
                }

                if(key=="haveAnswer")
                {
                    answer["haveurl"]=data[key];
                }

            }
                store.type="store";
                gift.type="gift";
                answer.type="answer";
                listdata.push(store);
                listdata.push(gift);
                listdata.push(answer);
                listfsdata=listdata;
                var urls="https://qrcrmimg.masterkong.com.cn/crm-images/";
                var color1="color:#898989";
                var color2="color:#e60012";
                for(var i=0;i<listdata.length;i++)
                {
                    var uimg=listdata[i].haveurl=="1"?(urls+listdata[i].pic):"yiwuyima/ywc.png";
                    html+='<div class="listyjf bx bxc bxh" data-ids="'+i+'" data-type="'+listdata[i].type+'">';
                    html+='<div class="bxf1 h1 bx bxh" data-ids="'+i+'" style="-webkit-box-align: center;" data-type="'+listdata[i].type+'">';
                    html+='<div class="typeimg" style="background-image: url('+uimg+')"></div>';
                    html+='<div data-ids="'+i+'" data-type="'+listdata[i].type+'" style="'+(listdata[i].haveurl=="1"?color2:color1)+'">'+listdata[i].title+'</div>';
                    html+='</div>';
                    html+='<div class="yjftext fontall borboxsize" style="'+(listdata[i].haveurl=="1"?color2:color1)+'" data-ids="'+i+'" data-type="'+listdata[i].type+'">'+listdata[i].points+'积分</div>';
                    html+='</div>';
                }

            }

        return html;
    }
    
    function jfdh_sss(priveid) {
        var data={
                type: 'post',
                httpType: G$.sweetHttp + "imasterkong/integralMall/exchange.do",
                reqData: {
                    openId:params.openId,
                    appId:params.appId,
                    prizeId:priveid,
                    exchangeCount:'1',
                    "signParams":params.signParams,
                    "timestamp":+new Date()
                }
            }

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
                $(".cpexchange").css("display","none");
                $(".jfbuzusucess").css("display","-webkit-box");
                $(".jfbuzu_btnsucess").one("click",function () {

                    window.sessionStorage.setItem("dyjpdata",JSON.stringify(result.data));
                    window.location.href="shouhuolingqu.html?v="+Math.random();
                })
            }
        }

        function error(er) {

        }

        G$.ajax(data,sucess,error);

    }
})();