/**
 * Created by Administrator on 2018/4/13.
 */
(function () {
    var fs_timer=3;
    var chao_2=false;
    $(".keyongjfen").on("click",function () {
        // clearInterval(this.timer);
        // $(".Tcss_window_s").css("display","-webkit-box");
        // this.timer=null;
        // var _self=this;
        // this.timer=setInterval(function () {
        //     if(fs_timer<=0)
        //     {
        //         $(".Tcss_window_s").css("display","none");
        //         fs_timer=3;
        //         clearInterval(_self.timer);
        //         return;
        //     }
        //     fs_timer--;
        // },300);
         window.location.href="jifenindex.html";
    })
    if(GetQueryString("type"))
    {
        if(GetQueryString("type")=="zcc")
        {
            $(".tab1").addClass("selected");
            $(".tab2").removeClass("selected");
            $(".tab3").removeClass("selected");

        }else if(GetQueryString("type")=="jfjf")
        {
            $(".tab1").removeClass("selected");
            $(".tab2").addClass("selected");
            $(".tab3").removeClass("selected");
        }else if(GetQueryString("type")=="jxjx")
        {
            $(".tab1").removeClass("selected");
            $(".tab2").removeClass("selected");
            $(".tab3").addClass("selected");
        }
    }


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

        }else {
            hongbaolingqu(totalp.totbalcount,"start","hd")
        }

    });

    $(".hongbaohead").on("click",function (e) {

        if($(e.target).hasClass("subselect"))
        {
            return;
        }

        $(".hongbaohead >div").each(function (index,item) {
            $(item).removeClass("subselect");
        })



        if($(e.target).html()=="待领取红包")
        {
            console.log($(e.target).data("txt"))
            $(e.target).addClass("subselect");
            hongbaolingqu(totalp.totbalcount,"start",$(e.target).data("txt"))

        }else if($(e.target).html()=="已领取红包")
        {
            $(e.target).addClass("subselect");
            hongbaolingqu(totalp.totbalcount,"end",$(e.target).data("txt"))
        }

    });

    $(".myjfsubtab >div").on("click",function (e) {
          if($(e.target).hasClass("subselect"))
          {
              return;
          }
        $(".myjfsubtab >div").each(function (index,item) {
            $(item).removeClass("subselect");
        })

        $(this).addClass("subselect");

        if($(this).data("txt")=="sr"){
            jfjtg(totalp.objjf,'sr')
        }else if($(this).data("txt")=="zc"){
            jfjtg(totalp.objjf,'zc')
        }else if($(this).data("txt")=="gq"){
            jfjtg(totalp.objjf,'gq')
        }
    })

    $(".myjptab >div").on("click",function (e) {
        if($(e.target).hasClass("subselect"))
        {
            return;
        }
        $(".myjptab >div").each(function (index,item) {
            $(item).removeClass("subselect");
        })

        $(this).addClass("subselect");

        if($(this).data("txt")=="dl"){
            myjplingqu(totalp.myjplingqudata,"dl");
        }else if($(this).data("txt")=="yl"){
            myjplingqu(totalp.myjplingqudata,"yl");
        }
    })

    //积分数据模拟

    function jfjtg(data,type) {
        var i=0,html="";
        var arr=data[type];
        var len=arr.length;
        for(var i=0;i<len;i++)
        {
            html+='<div class="jftypeliest bx bxh borboxsize"> ';
            html+='<div class="bxf1 h1 add_fs" style="padding-left: 0.71875rem;">'+arr[i].text+'</div>';
            html+='<div class="bxf1 h1 add_fs" style="text-align: right;padding-right:0.6875rem;">'+arr[i].date+'</div>';
            html+='</div>';
        }

        $(".jfztg").html(html);
    }

    function hongbaolingqu(data,type,type1) {
     //   console.log(data)
        var html="",i=0;
        var arr=data[type1];
        var outerdata=data;
        var len=arr.length;
        if(type=="start")
        {
            html+='<div class="jiesuanqu bx bxh borboxsize" style="height:1.5625rem;">';
            html+='<div style="max-width:4rem;" class="h1"></div>';
            html+='<div class="bxf1 h1 bx bxh bxc">';
            html+='<div class="jiesunbefore bxf1" style="padding-top: 0;margin-left: 0.578125rem;">总计:<span class="add_fs" style="font-weight: bold;padding-left: 0.1875rem;">￥'+data.noReceiveBill+'</span><span style="font-size: 75%;">元</span></div>';
            html+='<div class="jiesuanbtn" style="margin-top: 0;margin-left: 0;">提现</div>';
            html+='</div>';
            html+='</div>';
            html+="<div class='bx bxh w1 borboxsize bxc' style='height: 1rem;background-color: #f3f3f3;'>";
            html+="<div class='bxf1 h1 bx bxv' style='-webkit-box-pack: center;margin-left:0.578125rem;'>";
            html+="<div style='color: #3d3d3d;font-size: 91.6666666667%;line-height: 1.5;'>红包</div>";
            html+="<div style='font-size: 75%;color: #a7a7a7;'>"+data.nofilterDate+"红包小计<span class='add_fs' style='padding-left:0.2rem;'>"+data.noFilterTotal+"</span>元</div>";
            html+="</div>";
            html+="<div class='dateimgs' id='dateShowBtn'>";
            html+='<label for="appDate"></label>';
            html+='<input value="" class="" readonly="readonly" name="appDate" ' +
                'id="appDate" type="text" style="opacity: 0;width: 0.1rem;">';
            html+="</div>";
            html+="</div>";
        }
        if(type=="end")
        {
            html+='<div class="jiesuanqu bx bxh borboxsize" style="height: 1.5625rem;">';
            html+='<div style=";" class="h1"></div>';
            html+='<div class="bxf1 h1 bx bxh">';
            html+='<div class="jiesunbefore bxf1" style="text-align: right;padding-right: 0.59375rem;">总计:<span class="add_fs" style="font-weight: bold;padding-left: 0.1875rem;">￥'+data.receivedBill+'</span><span style="font-size: 75%;">元</span></div>';
            html+='</div>';
            html+='</div>';
            html+="<div class='bx bxh w1 borboxsize bxc' style='height: 1rem;background-color: #f3f3f3;'>";
            html+="<div class='bxf1 h1 bx bxv' style='-webkit-box-pack: center;margin-left:0.578125rem;'>";
            html+="<div style='color: #3d3d3d;font-size: 91.6666666667%;line-height: 1.5;'>红包</div>";
            html+="<div style='font-size: 75%;color: #a7a7a7;'>"+data.filterDate+"红包小计<span class='add_fs' style='padding-left:0.2rem;'>"+data.filterTotal+"</span>元</div>";
            html+="</div>";
            html+="<div class='dateimgsend' id='dateShowBtnend'>";
            html+='<label for="appDates"></label>';
            html+='<input value="" class="" readonly="readonly" name="appDates" ' +
                'id="appDateend" type="text" style="opacity: 0;width: 0.1rem;">';
            html+="</div>";
            html+="</div>";
        }
        for(;i<len;i++)
        {
            html+='<div class="hongbaolistlq borboxsize bx bxh">';
            html+='<div class="h1 bxf1 bx bxv" style="-webkit-box-pack:center;padding-left: 0.625rem;">';
            html+='<div>'+arr[i].tetx+'</div>';
            html+='<div style="color: #a7a7a7;font-size:69.23076923076923%;padding-top: 0.1875rem;" class="add_fs">'+arr[i].date+'</div>';
            html+='</div>';
            html+='<div class="add_fs" style="height: 100%;padding-right: 0.59375rem;line-height:1.390625rem;">'+arr[i].shumu+'</div>';
            html+='</div>';
        }
            if(type=="start")
            {
                // html+='<div class="jiesuanqu bx bxh borboxsize">';
                // html+='<div style="max-width:4rem;" class="h1"></div>';
                // html+='<div class="bxf1 h1 bx bxh">';
                // html+='<div class="jiesunbefore bxf1" style="text-align: right;">总计:<span class="add_fs" style="font-weight: bold;padding-left: 0.1875rem;">￥'+data.noReceiveBill+'</span><span style="font-size: 75%;">元</span></div>';
                // html+='<div class="jiesuanbtn">提现</div>';
                // html+='</div>';
                // html+='</div>';

            }
        $(".hongbaocont").html("");
        $(".hongbaocont").html(html);
        if(type=="start")
        {

        }

        console.log($(".tipbottoms")[0].clientHeight,$(".hongbaocont")[0].clientHeight,$(".lingqucontent")[0].clientHeight)
        if($(".tipbottoms")[0].clientHeight+$(".hongbaocont")[0].clientHeight+40>=$(".lingqucontent")[0].clientHeight)
        {
            if(!$(".tipbottoms").hasClass("tipbottom"))
            {
                $(".tipbottoms").removeClass("tipbottompo").addClass("tipbottom")
            }
        }else {
            $(".tipbottoms").removeClass("tipbottom").addClass("tipbottompo");
            console.log(2)
        }

        if(type=="start")
        {
            var currYear = (new Date()).getFullYear();
            var opt={};
            opt.date = {preset : 'date'};
            // opt.datetime = {preset : 'datetime'};
            // opt.time = {preset : 'time'};
            opt.default = {
                theme: 'android-ics light', //皮肤样式
                display: 'modal', //显示方式
                mode: 'scroller', //日期选择模式
                dateFormat: 'yyyymm',
                lang: 'zh',
                dateOrder:"yymm",
                showNow: true,
                nowText: "今天",
                startYear: currYear - 10, //开始年份
                endYear: currYear + 10,//结束年份,
                onSelect:function () {
                    totalp.getBillsInfo(arguments[0],"1");
                }
            };

            $("#appDate").mobiscroll($.extend(opt['date'], opt['default']));
            // var optDateTime = $.extend(opt['datetime'], opt['default']);
            // var optTime = $.extend(opt['time'], opt['default']);
            // $("#appDateTime").mobiscroll(optDateTime).datetime(optDateTime);
            // $("#appTime").mobiscroll(optTime).time(optTime);

            $(".jiesuanbtn").on('click',function () {

                if(outerdata.noReceiveBill<1)
                {
                    $(".tip1hb").html("红包余额不足1元");
                    $(".tip2hb").html("不能提现");
                    $('.Tcss_window').css("display","-webkit-box");

                }else if(outerdata.noReceiveBill>200)
                {
                    $(".tip1hb").html("余额超过200元");
                    $(".tip2hb").html("会分次红包推送");
                    $('.Tcss_window').css("display","-webkit-box");
                    chao_2=true;
                }else {

                    var data={
                        type: 'post',
                        httpType: G$.sweetHttp + "imasterkong/customer/drawBillsInfo.do",
                        reqData: {
                            "appId":params.appId,
                            "openId":params.openId,
                            "signParams":params.signParams,
                            "timestamp":+new Date()
                        }
                    };

                    Mparams(data);
                    function sucess(result) {
                        if(result.responseCode=="200")
                        {
                            $(".tip1hb").html("领取申请已发出");
                            $(".tip2hb").html("请留意下红包");
                            $('.Tcss_window').css("display","-webkit-box");
                            totalp.getBillsInfo();
                        }
                    }
                    
                    function error(er) {
                        
                    }
                    if((parseInt(totalp.totbalcount.takeCount)+1)==2)
                    {
                        if(totalp.totbalcount.isStoreInfo==0)
                        {
                            window.location.href="centertab.html?type=shop&v="+Math.random();
                            return;
                        }
                    }

                    if((parseInt(totalp.totbalcount.takeCount)+1)==4)
                    {
                        if(totalp.totbalcount.isCompleteCustomerInfo==0)
                        {
                            window.location.href="centertab.html?type=info&v="+Math.random();
                            return;
                        }
                    }
                    G$.ajax(data,sucess,error);

                }

            })
        }
        if(type=="end")
        {
            var currYear = (new Date()).getFullYear();
            var opt={};
            opt.date = {preset : 'date'};
            // opt.datetime = {preset : 'datetime'};
            // opt.time = {preset : 'time'};
            opt.default = {
                theme: 'android-ics light', //皮肤样式
                display: 'modal', //显示方式
                mode: 'scroller', //日期选择模式
                dateFormat: 'yyyymm',
                lang: 'zh',
                dateOrder:"yymm",
                showNow: true,
                nowText: "今天",
                startYear: currYear - 10, //开始年份
                endYear: currYear + 10,//结束年份,
                onSelect:function () {
                    totalp.getBillsInfo(arguments[0],"2");
                }
            };

            $("#appDateend").mobiscroll($.extend(opt['date'], opt['default']));
            // var optDateTime = $.extend(opt['datetime'], opt['default']);
            // var optTime = $.extend(opt['time'], opt['default']);
            // $("#appDateTime").mobiscroll(optDateTime).datetime(optDateTime);
            // $("#appTime").mobiscroll(optTime).time(optTime);

            $(".jiesuanbtn").on('click',function () {

                if(outerdata.noReceiveBill<1)
                {
                    $(".tip1hb").html("红包余额不足1元");
                    $(".tip2hb").html("不能提现");
                    $('.Tcss_window').css("display","-webkit-box");

                }else if(outerdata.noReceiveBill>200)
                {
                    $(".tip1hb").html("余额超过200元");
                    $(".tip2hb").html("会分次红包推送");
                    $('.Tcss_window').css("display","-webkit-box");
                    chao_2=true;
                }else {

                    var data={
                        type: 'post',
                        httpType: G$.sweetHttp + "imasterkong/customer/drawBillsInfo.do",
                        reqData: {
                            "appId":params.appId,
                            "openId":params.openId,
                            "signParams":params.signParams,
                            "timestamp":+new Date()
                        }
                    };

                    Mparams(data);
                    function sucess(result) {
                        if(result.responseCode=="200")
                        {
                            $(".tip1hb").html("领取申请已发出");
                            $(".tip2hb").html("请留意下红包");
                            $('.Tcss_window').css("display","-webkit-box");
                            totalp.getBillsInfo();
                        }
                    }

                    function error(er) {

                    }
                    if((parseInt(totalp.totbalcount.takeCount)+1)==2)
                    {
                        if(totalp.totbalcount.isStoreInfo==0)
                        {
                            window.location.href="centertab.html?type=shop&v="+Math.random();
                            return;
                        }
                    }

                    if((parseInt(totalp.totbalcount.takeCount)+1)==4)
                    {
                        if(totalp.totbalcount.isCompleteCustomerInfo==0)
                        {
                            window.location.href="centertab.html?type=info&v="+Math.random();
                            return;
                        }
                    }
                    G$.ajax(data,sucess,error);

                }

            })
        }
    }
    
    function myjplingqu(data,type) {
        var html="",
            i=0,
            _data=data[type],
            len=_data.length;
            for(;i<len;i++)
            {
                if(i==0){
                    html+='<div class="myjptablqlist bx bxv" data-id="'+_data[i].id+'" data-index="'+i+'">';
                }else {
                    html+='<div class="myjptablqlist bx bxv" style="margin-top:0.125rem;" data-id="'+_data[i].id+'" data-index="'+i+'">';
                }
                html+='<div class="bxf1 w1 bx bxh bxc borboxsize">';
                html+='<div style="height: 2.0625rem;" class="myjpimg">';
                html+="<img src='"+decodeURIComponent(_data[i].picUrl)+"' style='display: block;width: 100%;height: 100%;'>"
                html+='</div>';
                html+='<div style="height: 2.0625rem;padding-right: 0.6875rem;padding-left: 0.3125rem;" class="bxf1 bx bxv">';
                html+='<div class="bxf1 w1" style="font-size: 108.3333333333333%;color:#313131;line-height: 1.3;">'+_data[i].prizeName+'</div>';//康师傅新版新酸汤肥牛<span style="padding-left:0.3125rem;" class="add_fs">500g*5</span>新体验
                if(type=="dl")
                {
                    html+='<div class="w1" style="text-align: right;font-size:91.66666666666667%;color: #646464;">奖品数量有限，请尽快领取!</div>';
                }
                html+='</div>';
                html+='</div>';
                if(type=='dl')
                {
                html+='<div class="myjptablqlistbt borboxsize" style="position: relative;" data-index="'+i+'" data-id="'+_data[i].id+'">';
                    html+='<div class="myjptablqlistbtn borboxsize">立即领取</div>';
                    html+='</div>';
                }
                html+='</div>';
            }

            $(".jpcontent").html(html);

            if(type=='dl')
            {
                $(".myjptablqlistbt").on("click",function () {
                      var id=$(this).data("id");
                      var index=$(this).data("index");
                      window.sessionStorage.setItem("dyjpdata",JSON.stringify(totalp.myjplingqudata.dl[index]));
                      if(totalp.customerDefaultAddress!="wu")
                      {
                          window.sessionStorage.setItem("fsshouhuo",JSON.stringify(totalp.customerDefaultAddress));
                      }
                      window.location.href="shouhuolingqu.html?fanhu=fanh&v="+Math.random();
                })
            }

            if(type=="yl")
            {
                $(".myjptablqlist").on("click",function () {
                    var id=$(this).data("id");
                    var index=$(this).data("index");
                    window.sessionStorage.setItem("yljpdatas",JSON.stringify(totalp.myjplingqudata.yl[index]));
                    if(totalp.myjplingqudata.yl[index].prizeType=="physical_prizes"){
                        window.location.href="lingqudetail.html?v="+Math.random();

                    }else if(totalp.myjplingqudata.yl[index].prizeType=="outer_code")
                    {
                        window.location.href="lingqudetail1.html?v="+Math.random();

                    }
                })
            }



    }

    function CenterJp() {
        this.totbalcount={
            noReceiveBill:0,
            receivedBill:0,
            isCompleteCustomerInfo:0,
            isStoreInfo:0,
            takeCount:0,
            filterDate:'',
            filterTotal:0,
            noFilterTotal:0,
            nofilterDate:'',
            hd:[],
            lq:[]
        };
        this.objjf={
            sr:[],
            gq:[],
            zc:[]
        };
        this.myjplingqudata={
            dl:[],
            yl:[]
        }
    }

    CenterJp.prototype={
        init:function () {
            this.getBillsInfo();
            this.getScoreInfo();
            this.getPrizeInfo();
        },
        getBillsInfo:function (filterDate,filterType) {
            var self=this;
            var data={
                type: 'post',
                httpType: G$.sweetHttp + "imasterkong/customer/getBillsInfo.do",
                reqData: {
                    "appId":params.appId,
                    "openId":params.openId,
                    "timestamp":+new Date(),
                    filterDate:filterDate?filterDate:"",
                    filterType:filterType?filterType:''
                }
            };

            Mparams(data);

            function sucess(result) {
                if(result.responseCode=="200")
                {

                    //待领取
                    var _dailingqu=result.data.noReceiveBillInfos,
                     _yilingqu=result.data.receivedBillInfos,
                        i=0,
                        len=_dailingqu.length,
                        _dailingquinfos=[],
                        _yilingquinfos=[];

                     for(;i<len;i++)
                     {
                         _dailingquinfos.push(
                             {
                                 'tetx':'红包',
                                 'date':'结束时间'+_dailingqu[i].endTime+'',
                                 'shumu':'+'+(_dailingqu[i].amount/100)+''
                             }
                         )
                     }
                    for(i=0,len=_yilingqu.length;i<len;i++)
                    {
                        _yilingquinfos.push(
                            {
                                'tetx':_yilingqu[i].status=="3"?"过期未领取红包":'红包',
                                'date':'获得时间'+_yilingqu[i].createDate+'',
                                'shumu':'+'+(_yilingqu[i].amount/100)+''
                            }
                        )
                    }

                    self.totbalcount={
                        filterDate:result.data.filterDate,
                        filterTotal:result.data.filterTotal,
                        noFilterTotal:result.data.noFilterTotal,
                        nofilterDate:result.data.noFilterDate,
                        noReceiveBill:result.data.noReceiveBill,
                        receivedBill:result.data.receivedBill,
                        isStoreInfo:result.data.isStoreInfo,
                        isCompleteCustomerInfo:result.data.isCompleteCustomerInfo,
                        takeCount:result.data.takeCount,
                        hd:_dailingquinfos,
                        lq:_yilingquinfos
                    }

                    hongbaolingqu(self.totbalcount,"start","hd")
                    data=null;
                }
            }

            function error(er) {

            }

            G$.ajax(data,sucess,error);

        },
        getScoreInfo:function () {
            var self=this;
            var data={
                type: 'post',
                httpType: G$.sweetHttp + "imasterkong/customer/getScoreInfo.do",
                reqData: {
                    "appId":params.appId,
                    "openId":params.openId,
                    "timestamp":+new Date()
                }
            };

            Mparams(data);

            function sucess(result) {
               if(result.responseCode=="200")
               {
                    var _result=result.data,
                        i=0,
                        _incomeScores=_result.incomeScores,//积分收入
                        _overScores=_result.overScores,//过期
                        len=_incomeScores.length;
                   self.objjf={
                       sr:[],
                       gq:[],
                       zc:[]
                   }
                     for(;i<len;i++)
                     {
                        self.objjf.sr.push(
                            {
                                text:'+'+_incomeScores[i].score,
                                date:'截止'+_incomeScores[i].endTime
                            }
                        )

                     }

                   for(i=0,len=_overScores.length;i<len;i++)
                   {
                        self.objjf.gq.push(
                            {
                                text:_overScores[i].score,
                                date:'截止'+_overScores[i].endTime
                            }
                        )
                   }

                   for(var key in _result.outScores)
                   {
                       if(_result.outScores.hasOwnProperty(key))
                       {
                            self.objjf.zc.push(
                                {
                                    text:_result.outScores[key],
                                    date:key=="drawScore"?'抽奖累计扣分':"兑换累计扣分"
                                }
                            )
                       }
                   }

                   $(".totolscore").html("+"+_result.totalScore);

                   jfjtg(self.objjf,'sr');
                   data=null;
               }
            }
            
            function error(err) {
                
            }

            G$.ajax(data,sucess,error);
        },
        getPrizeInfo:function () {
            var self=this;
            var data={
                type: 'post',
                httpType: G$.sweetHttp + "imasterkong/customer/getPrizeInfo.do",
                reqData: {
                    "appId":params.appId,
                    "openId":params.openId,
                    "timestamp":+new Date()
                }
            };

            Mparams(data);

            function sucess(result) {
              if(result.responseCode=="200")
              {
                  if(result.data.customerDefaultAddress)
                  {
                      if(result.data.customerDefaultAddress["detailAddress"])
                      {
                          self.customerDefaultAddress=result.data.customerDefaultAddress;
                      }else {
                          self.customerDefaultAddress="wu";
                      }

                  }else {
                      self.customerDefaultAddress="wu";
                  }
                  var _weilingqu=result.data.noReceivePrizes;
                  var _yilingqu=result.data.receivedPrizes;
                  var i=0,len=_weilingqu.length;
                  var urls="https://qrcrmimg.masterkong.com.cn/crm-images/";
                  for(;i<len;i++)
                  {
                      var imgsssss=urls+_weilingqu[i].picUrl
                      self.myjplingqudata.dl.push(
                          {
                              "prizeType":_weilingqu[i].prizeType,
                              "picUrl":imgsssss,
                              "prizeName":_weilingqu[i].prizeName,
                              "id":_weilingqu[i].id,
                              "addressId":_weilingqu[i].addressId,
                              "prizePrice":_weilingqu[i].prizePrice,
                              "prizeCount":_weilingqu[i].prizeCount,
                              "status":_weilingqu[i].status,
                              "couponsCode":_weilingqu[i].couponsCode,
                              "startDate":_weilingqu[i].startDate,
                              "endDate":_weilingqu[i].endDate,
                              "prizeSource":_weilingqu[i].prizeSource
                          }
                      )
                  }

                  for(i=0,len=_yilingqu.length;i<len;i++)
                  {
                      var imgsssss=urls+_yilingqu[i].picUrl
                       self.myjplingqudata.yl.push(
                           {
                            "prizeType":_yilingqu[i].prizeType,
                            "picUrl":imgsssss,
                            "prizeName":_yilingqu[i].prizeName,
                            "id":_yilingqu[i].id,
                            "addressId":_yilingqu[i].addressId,
                            "prizePrice":_yilingqu[i].prizePrice,
                            "prizeCount":_yilingqu[i].prizeCount,
                            "status":_yilingqu[i].status,
                            "couponsCode":_yilingqu[i].couponsCode,
                            "startDate":_yilingqu[i].startDate,
                            "endDate":_yilingqu[i].endDate,
                            "prizeSource":_yilingqu[i].prizeSource,
                            "customerAddressInfo":_yilingqu[i].customerAddressInfo,
                             "createDate":_yilingqu[i].createDate,
                             "express":_yilingqu[i].express,
                             "expressNo":_yilingqu[i].expressNo
                           }
                       );
                  }
                    console.log(self.myjplingqudata)
                  myjplingqu(self.myjplingqudata,"dl");
                  data=null;
              }
            }
            
            function error(er) {
                
            }
            G$.ajax(data,sucess,error);
        }
    }
    var totalp=new CenterJp();
    totalp.init();

    $(".hongbaotipbtn").on("click",function () {
        $('.Tcss_window').css("display","none");
        if(chao_2)
        {

            var data={
                type: 'post',
                httpType: G$.sweetHttp + "imasterkong/customer/drawBillsInfo.do",
                reqData: {
                    "appId":params.appId,
                    "openId":params.openId,
                    "signParams":params.signParams,
                    "timestamp":+new Date()
                }
            };

            Mparams(data);
            function sucess(result) {
                if(result.responseCode=="200")
                {
                    chao_2=false;
                    $(".tip1hb").html("领取申请已发出");
                    $(".tip2hb").html("请留意下红包");
                    $('.Tcss_window').css("display","-webkit-box");
                    totalp.getBillsInfo();
                }
            }

            function error(er) {

            }
            if((parseInt(totalp.totbalcount.takeCount)+1)==2)
            {
                if(totalp.totbalcount.isStoreInfo==0)
                {
                    window.location.href="centertab.html?type=shop&v="+Math.random();
                    return;
                }
            }

            if((parseInt(totalp.totbalcount.takeCount)+1)==4)
            {
                if(totalp.totbalcount.isCompleteCustomerInfo==0)
                {
                    window.location.href="centertab.html?type=info&v="+Math.random();
                    return;
                }
            }
            G$.ajax(data,sucess,error);

        }
    })


})();