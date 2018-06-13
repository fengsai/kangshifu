/**
 * Created by Administrator on 2018/4/8.
 */
(function () {
    
    $(".headtip").on("click",function () {
        window.location.href="kefuchaxun.html";
    })
    
    $(".kflist").on("click",function () {
        window.location.href="kefu.html";
    })
    
    function template(data,url) {
        var html="",
            len=data.length,
            i=0;
        for(;i<len;i++)
        {
           html+='<div class="kflist borboxsize bx bxh bxc" data-lx="'+data[i].categoryId+'">';
            html+='<div class="imgs">';
            html+='<img src="'+url+""+data[i].picture+'" alt="">';
            html+='</div>';
            html+='<div class="bxf1 h1 bx bxv bxc" style="padding-left: 0.40625rem;">';
            html+='<div class="w1 fongtype borboxsize" style="height:0.9rem;padding-top:0.409375rem;">'+data[i].title+'</div>';
            html+='<div class="bxf1 w1 break_main fongtext">'+data[i].subTitle+'</div>';
            html+='</div>';
            html+='<div style="width: 1rem;height:100%;font-size: 125%;color: #b8b8b8;line-height:1.71875rem;text-align: center;">></div>';
            html+='</div>';
        }

        $(".scroll").html(html);

        $(".kflist").on("click",function () {
           window.location.href="kefu.html?lx="+$(this).data("lx")
        });
    }

    function kefucenter() {
        var data={
            type: 'post',
            httpType: G$.sweetHttp + "imasterkong/customer/getMsgCategory.do",
            reqData: {
                "appId":params.appId,
                "timestamp":+new Date()
            }
        };

        Mparams(data);

        function sucess(result) {
            var urls="https://qrcrmimg.masterkong.com.cn/crm-images/";
            if(result.responseCode="200")
            {
                var data_s=result.data;

                template(data_s,urls);
                data=null;
            }
        }
        
        function error(e) {
            
        }

        G$.ajax(data,sucess,error);
    }

    kefucenter()
    
    $(".headtip").on("click",function () {
        location.href="kefuchaxun.html?v="+Math.random();
    })

})();