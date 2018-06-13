(function () {

    $(".tab").on("click",function () {
         if($(this).hasClass("sleect"))
         {
             return;
         }
         $(".tab").each(function (index,item) {
              $(item).removeClass("sleect");
              $(".tabshow"+$(item).data("tabs")).css("display","none");
         });

         $(this).addClass("sleect")
         $(".tabshow"+$(this).data("tabs")).css("display","-webkit-box");
    });

    var weichulidata=[

    ];

    var yichulidata=[
    ]



    function weichilishow(data) {
            var html="";
            var i=0,len=data.length;
            for(;i<len;i++)
            {
                html+='<div class="liuyanlist bx bxv borboxsize">';
                html+='<div class="fontall datefont">'+data[i].date+'</div>';
                html+='<div class="bxf1 borboxsize contentfont">'+data[i].content+'</div>';
                html+='</div>';
                html+='<div class="linekexia"></div>';
            }
           $(".tabshow1").html(html);
    }
    
    function yichulishow(data) {
        var html="";
        var i=0,len=data.length;
        for(;i<len;i++)
        {
            html+='<div class="yichulilist bx bxv">';
            html+='<div class="fontall  datefont">'+data[i].date+'</div>';
            html+='<div class="contentfont" style="padding-bottom: 0;">'+data[i].content+'</div>';
            html+='<div class="pingtaihuifu"> 平台回复：'+data[i].yichuli+'';
            html+='</div>';
            html+='</div>';
            html+='<div class="linekexia"></div>';
        }

        $(".tabshow2").html(html)

    }

    function geshihuaDta(date) {
        var year=date.getFullYear();
        var ri=date.getDate();
        var yue=date.getDay()+1;
        var hour=date.getHours().toString().length==1?"0"+date.getHours():date.getHours();
        var fen=date.getMinutes().toString().length==1?"0"+date.getMinutes():date.getMinutes();
        var miao=date.getSeconds().toString().length==1?"0"+date.getSeconds():date.getSeconds();
        return year+"年"+yue+"月"+ri+"日"+" "+hour+":"+fen+":"+miao;
    }

    $(".xinzengbtn").on("click",function () {
        window.location.href="kefucenter.html";
    })

    function huoqudata() {

        var data={
            type: 'post',
            httpType: G$.sweetHttp + "imasterkong/customer/queryMsgLeave.do",
            reqData: {
                "appId":params.appId,
                "openId":params.openId,
                "timestamp":+new Date()
            }
        }

        Mparams(data);

        function sucess(result) {
            if(result.responseCode=="200")
            {
                if(result.data.not_processe)
                {
                    for(var i=0,len=result.data.not_processe.length;i<len;i++)
                    {
                        weichulidata.push(
                            {
                                "date":geshihuaDta(new Date(result.data.not_processe[i].leaveDate)),
                                content:result.data.not_processe[i].detail,
                            }
                        );
                    }

                    weichilishow(weichulidata);

                }

                if(result.data.have_processe)
                {
                    for(i=0,len=result.data.have_processe.length;i<len;i++)
                    {
                        yichulidata.push(
                            {
                                "date":geshihuaDta(new Date(result.data.have_processe[i].replyDate)),
                                content:result.data.have_processe[i].detail,
                                yichuli:result.data.have_processe[i].replyContent
                            }
                        )
                    }

                    yichulishow(yichulidata)
                }
            }

        }
        
        function error(e) {
            
        }

        G$.ajax(data,sucess,error);

    }

    huoqudata();

})();