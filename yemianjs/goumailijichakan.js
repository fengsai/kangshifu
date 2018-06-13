(function () {

    function listlist(data) {
        var i=0,
            len=data.length,
            html="";
        for(;i<len;i++)
        {
            html+='<div class="simglist bx bxh borboxsize">';
            html+='<div class="h1 break_main" style="width:3.625rem;color: #3d3d3d">'+data[i].goodName+'</div>';
            html+='<div class="bxf1 h1 add_fs" style="color: #a7a7a7;text-align: center;">'+data[i].scanTime+'</div>';
            html+='<div class="bxf1 h1 add_fs" style="color: #a7a7a7;text-align: center;">'+data[i].amount+'元</div>';
            html+='</div>';
        }

        $(".listlishi").html(html);

    }

    var data={
        type: 'post',
        httpType: G$.sweetHttp + "imasterkong/customer/queryPurchaseHistory.do",
        reqData: {
            "openId":params.openId,
            "timestamp":+new Date()
        }
    }

    Mparams(data);
    
    function sucess(result) {
        if(result.responseCode=="200")
        {
            var _result=result.data;
            var i=0,
                len=_result.length,
                arrdata=[];

            for(;i<len;i++)
            {
                arrdata.push({
                    "goodName":_result[i].goodName,
                    "scanTime":_result[i].scanTime,
                    "amount":_result[i].amount
                })
            }
            listlist(arrdata);
        }
    }

    function error(er) {

    }
    G$.ajax(data,sucess,error);
})();