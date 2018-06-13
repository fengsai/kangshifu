/**
 * Created by qibao on 2018/6/12.
 */
;(function () {

    //单选组件

     function SingalCheck(data) {
         this.ajxdata=data;
         this.checkData=null;
     }

    SingalCheck.prototype={
        init:function (data) {
            
        },
        html:function () {
            var self=this,
                html="",
                i=0,
                len=self.ajxdata.length;

            for(;i<len;i++)
            {
                html+='<div>';
                html+="<label for='name'>"
                html+="<input type='radio' id='name'>"
                html+="</div>";
            }
        }
    }

     

    //多选组件
    
    $("#sss").on("click",function () {
        console.log($('input[type=radio][name=first]:checked').val())
    })

})();