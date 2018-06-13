/**
 * Created by Administrator on 2018/4/28.
 */

(function () {
    var $imgss=(".imgsucess")[0];
    var map, geolocation;
    //加载地图，调用浏览器定位服务
    map = new AMap.Map('container', {
        resizeEnable: true
    });

    //解析定位结果
    function onComplete(data) {
        $(".Tcss_window_windows").css("display","-webkit-box");
        dingweishuju={
            adcode:data.addressComponent.adcode,
            lat:data.position.lat,
            lng:data.position.lng
        };
        index(data.position.lat,data.position.lng,data.addressComponent.adcode);
    }

    map.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,
            timeout: 108000,
            buttonOffset: new AMap.Pixel(10, 20),
            zoomToAccuracy: true,
            buttonPosition:'RB'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);
        AMap.event.addListener(geolocation, 'error', onError);
    });
    //解析定位错误信息
    function onError(data) {
        $(".Tcss_window_windows").css("display","none");
        if($(".towzhun").css("display")=="none")
        {
            $(".towzhun").css("display","-webkit-box");
            //$(".onebz").css("display","none");
        }
        //

    }

    var laqudata={};

    var onece=0;

    var failTipFlag=false;



    var dingweishuju=null;

    var options = {timeout: 900000,failTipFlag:true};
    var positionNum = 0;

    // var $btnlist=$(".btnqu >div");
    var $btnlitone=$(".btnqus >div");
    // $($btnlist[0]).on("click",function () {
    //     //$(".onebz").css("display","none");
    //     $(".towzhun").css("display","-webkit-box");
    // })

    $($btnlitone[0]).on("click",function () {
        wx.closeWindow()
    })

    $($btnlitone[2]).on("click",function () {
        window.location.href=window.location.href;
    })

    // $($btnlist[2]).on("click",function () {
    //    // $(".onebz").css("display","none");
    //     map.plugin('AMap.Geolocation', function() {
    //         geolocation = new AMap.Geolocation({
    //             enableHighAccuracy: true,
    //             timeout: 10000,
    //             buttonOffset: new AMap.Pixel(10, 20),
    //             zoomToAccuracy: true,
    //             buttonPosition:'RB'
    //         });
    //         map.addControl(geolocation);
    //         geolocation.getCurrentPosition();
    //         AMap.event.addListener(geolocation, 'complete', onComplete);
    //         AMap.event.addListener(geolocation, 'error', onError);
    //     });
    // })

    function index(lat,lng,aid) {

        var data={
            type: 'post',
            httpType: G$.sweetHttp + "imasterkong/crmPrize/scanCode",
            reqData: {
                open_id:params.openId,
                app_id:params.appId,
                sign_params:params.signParams,
                area_id:aid,
                lng:lng,
                lat:lat,
                "timestamp":+new Date()
            }
        };
        Mparams(data);
        function sucess(result) {
            var html="";

              if(result.ui_code=="200")
              {
                  var sssimg="https://qrcrmimg.masterkong.com.cn/crm-images/"+result.activeHomePageInfo.rulePicUrl;
                  cuseslingqu(result.activeHomePageInfo.homePicUrl,result.active_id,result.special_id,result.score,result.activeHomePageInfo.fitPicUrl,result.activeHomePageInfo.activityTemplate);
                  laqudata.picUrl="https://qrcrmimg.masterkong.com.cn/crm-images/"+result.activeHomePageInfo.picUrl;
                  laqudata.scene_qrcode_url=result.activeHomePageInfo.scene_qrcode_url;
                  $(".tczaozuos").css("background-image","url("+laqudata.picUrl+")");
                  $(".ermsucess>img").attr("src", laqudata.scene_qrcode_url);
                  $(".tczaozuo").css("background-image",'url('+sssimg+')')
                //  $(".desfs1").html(result.activeHomePageInfo.desc1);
                  var imgs=new Image();
                  imgs.src=laqudata.picUrl;
                  imgs.onload=function () {
                     setTimeout(function () {
                        $(".Tcss_window_windows").css("display","none");
                     },500);
                      $("img").on("click",function (e) {
                          e.preventDefault();
                          return false;
                      })
                  }

                  $("img").on("click",function (e) {
                      e.preventDefault();
                      return false;
                  })
                 // $(".desfs2").html(result.activeHomePageInfo.desc2);
                  return;
              }
            $(".Tcss_window_windows").css("display","none");
             if(result.ui_code=="3001")
             {
                html=err1_whd("该区域无活动",result.activeHomePageInfo.picUrl,result.activeHomePageInfo.scene_qrcode_url);
                $(".container").html(html);
                 $("img").on("click",function (e) {
                     e.preventDefault();
                     return false;
                 })
                 $(".errbtn").on("click",function () {
                     wx.scanQRCode({
                         desc: 'scanQRCode desc',
                         needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                         scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                         success: function (res) {
                             var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                         }
                     });
                 })
                 return;
             }

            if(result.ui_code=="3005")
            {
                html=err1_whd("哪里违规了吗？过会儿再试试",result.activeHomePageInfo.picUrl,result.activeHomePageInfo.scene_qrcode_url);
                $(".container").html(html);
                $("img").on("click",function (e) {
                    e.preventDefault();
                    return false;
                })
                $(".errbtn").on("click",function () {
                    wx.scanQRCode({
                        desc: 'scanQRCode desc',
                        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                        success: function (res) {
                            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                        }
                    });
                })
                return;
            }

            if(result.ui_code=="3003")
            {
                var txt="您已经扫过这个二维码了";
                var txt1="请不要重复扫码";
                html=err1_whd(txt,result.activeHomePageInfo.picUrl,result.activeHomePageInfo.scene_qrcode_url,txt1,3003);
                $(".container").html(html);
                $("img").on("click",function (e) {
                    e.preventDefault();
                    return false;
                })
                $(".errbtn").on("click",function () {
                    wx.scanQRCode({
                        desc: 'scanQRCode desc',
                        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                        success: function (res) {
                            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                        }
                    });
                })
                return;
            }

            if(result.ui_code=="3002")
            {
                var txt="抱歉！此二维码已经在";
                var txt1=result.scan_date+"被扫过了";
                html=err1_whd(txt,result.activeHomePageInfo.picUrl,result.activeHomePageInfo.scene_qrcode_url,txt1,3002);
                $(".container").html(html);
                $("img").on("click",function (e) {
                    e.preventDefault();
                    return false;
                })
                $(".errbtn").on("click",function () {
                    wx.scanQRCode({
                        desc: 'scanQRCode desc',
                        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                        success: function (res) {
                            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                        }
                    });
                })
                return;
            }

            if(result.ui_code=="3006")
            {
                html=err1_whd("该时间段无活动",result.activeHomePageInfo.picUrl,result.activeHomePageInfo.scene_qrcode_url);
                $(".container").html(html);
                $("img").on("click",function (e) {
                    e.preventDefault();
                    return false;
                })
                $(".errbtn").on("click",function () {
                    wx.scanQRCode({
                        desc: 'scanQRCode desc',
                        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                        success: function (res) {
                            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                        }
                    });
                })
                return;
            }

            if(result.ui_code=="3004")
            {
                html=tuwen_errcode(result.activeHomePageInfo.picUrl,result.activeHomePageInfo.scene_qrcode_url);
                $(".container").html(html);
                $("img").on("click",function (e) {
                    e.preventDefault();
                    return false;
                })
                $(".errbtn").on("click",function () {
                    wx.scanQRCode({
                        needResult: 1,
                        desc: 'scanQRCode desc',
                        success: function (res) {
                            //alert(JSON.stringify(res));
                        }
                    });
                })
                return;
            }

        }

        function error() {
            
        }

        G$.ajax(data,sucess,error);
    }

    index(31.22,121.48,310112)

    function tuwen_errcode(img,code_img) {
        var html="";
            img="https://qrcrmimg.masterkong.com.cn/crm-images/"+img;
            html+='<div class="tupianqu bx bxv bxc" style="height: auto;">';
            html+='<div style="width: 100%;height:0.5rem"></div>';
            html+='<div class="bxf1" style="width: 8.90625rem;">';
            html+='<img src="'+img+'" alt="" style="display: block;width: 100%;height: 3.8125rem;">';
            html+='</div>';
            html+='</div>';
            html+='<div style="height:0.703125rem;"></div>';
            html+='<div class="err1">抱歉,您当前扫描二维码的数量</div>';
            html+='<div class="err2">已达到最大值</div>';
            html+='<div style="height: 0.5625rem;"></div>';
            html+='<div class="err3">如要继续扫码领奖</div>';
            html+='<div class="err4">请致电：4000880325</div>';
            html+='<div class="err4">客服人员会协助你解决问题，谢谢合作</div>';
            html+='<div style="height: 0.5625rem;"></div>';
            html+='<div class="ererma bx bxc">';
            html+='<img src="'+code_img+'" alt="">';
            html+='</div>';
            html+='<div style="color: #B0B0B0;text-align: center;line-height: 1.5;font-size: 125%;">长按关注公众号</div>';
            html+='<div class="errbtn">继续扫码</div>';
        return html;
    }


    function err1_whd(txt,img,erimg,txt1,errcode) {
        var html="";
            img="https://qrcrmimg.masterkong.com.cn/crm-images/"+img;
            html+='<div class="tupianqu bx bxv bxc">';
            html+='<div style="width: 100%;height:1.90625rem"></div>';
            html+='<div class="bxf1" style="width: 8.90625rem;height: 3.8125rem;">';
            html+='<img src="'+img+'" alt="" style="display: block;width: 100%;height: 3.8125rem;">';
            html+='</div>';
            html+='</div>';
            html+='<div style="height:0.703125rem;"></div>';
            html+='<div class="err1">'+txt+'</div>';
            if(errcode)
            {
                if(errcode=="3003")
                {
                    html+='<div class="err2">'+txt1+'</div>';
                }else if(errcode=="3002")
                {
                    html+='<div class="err2">'+txt1+'</div>';
                }

            }
            html+='<div style="height: 0.5625rem;"></div>';
            html+='<div class="ererma bx bxc">';
            html+='<img src="'+erimg+'" alt="">';
            html+='</div>';
            html+='<div style="color: #B0B0B0;text-align: center;line-height: 1.5;font-size: 125%;">长按关注公众号</div>';
            html+='<div class="errbtn">继续扫码</div>';
        return html;
    }

    $(".tczaozuo").on("click",function () {
        $(".Tcss_window").css("display","none");
    })


    function cuseslingqu(bg,activeid,choujid,score,fitimg,mobanid) {
            var html="";
            bg="https://qrcrmimg.masterkong.com.cn/crm-images/"+bg,
            fitimg="https://qrcrmimg.masterkong.com.cn/crm-images/"+fitimg;
            html+='<div class="bx bxv imgsucess">';
            html+='<img class="bg111" src="'+bg+'" alt="">';
            html+='<div class="huodongguiazhi"></div>';
            if(mobanid==1)
            {
                html+='<div class="btnsucess btnsucess1"></div>';
            }else if(mobanid==2) {
                html+='<div class="btnsucess btnsucess2"></div>';
            }else if(mobanid==3) {
                html+='<div class="btnsucess btnsucess3"></div>';
            }else if(mobanid==4) {
                html+='<div class="btnsucess btnsucess4"></div>';
            }
            html+='<div class="shipeiimgss"></div>';
            html+='</div>';
            html+='<div class="shipeiimg bxf1 w1" style="background-image: url('+fitimg+')"></div>';

           $(".container").html(html);

        $("img").on("click",function (e) {
            e.preventDefault();
            return false;
        })

           $(".btnsucess").on("click",function () {
               console.log(111)
           });

           $(".huodongguiazhi").on("click",function () {
            $(".tcguize").css("display","-webkit-box");
           })

           $(".btnsucess").on("click",function () {
               var data={
                   type: 'post',
                   httpType: G$.sweetHttp + "/imasterkong/crmPrize/drawPrize",
                   reqData: {
                       open_id:params.openId,
                       app_id:params.appId,
                       area_id:dingweishuju.adcode,
                       lng:dingweishuju.lng,
                       lat:dingweishuju.lat,
                       special_id:choujid,
                       active_id:activeid,
                       score:score,
                       "timestamp":+new Date()
                   }
               };

               Mparams(data);

               function sucess(result) {
                   if(result.code=="200")
                   {
                       if(result.prize_uri)
                       {
                           window.location.href=result.prize_uri;
                       }else{
                            $(".tczhongj").css("display","-webkit-box");
                           $(".yuanfs").html('<span class="add_fs">'+result.prized_info_names+'</span>');
                           $(".scorefs").html('<span class="add_fs">'+result.win_score+'</span>');
                       }
                   }
               }
               
               function error(er) {
               }
               G$.ajax(data,sucess,error);
           })

    }

    $(".desfs2").on("click",function () {
        wx.scanQRCode({
            needResult: 1,
            desc: 'scanQRCode desc',
            success: function (res) {
                window.location.href=res.resultStr
            }
        });

    });


})()


