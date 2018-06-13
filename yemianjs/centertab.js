/**
 * Created by Administrator on 2018/4/3.
 */
(function ($) {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;

    if(GetQueryString("type")=="dzi")
    {
        $(".tabshow1").css("display","none");
        $(".tab1").removeClass("selected");
        $(".tab3").addClass("selected");
    }else if(GetQueryString("type")=="shop")
    { $(".tabshow1").css("display","none");
        $(".tab1").removeClass("selected");
        $(".tab2").addClass("selected");
    }else {
        $(".tab1").addClass("selected");
        $(".tabshow1").css("display","-webkit-box");

    }

    var weekdayArr=['老板','老板娘','店小二','理货员'];

    var xinzenglist=[];

    var dellist=[];

    var deldizhilist=[];

    var bianjilist=[];

    var bjtop=null;

    var bjshuohuotop=null;

    var gerenzliliaodata=JSON.parse(window.sessionStorage.getItem("gerenziliao"))?JSON.parse(window.sessionStorage.getItem("gerenziliao")):{};

    $(".headtab>div").each(function (inex,item) {
            if($(item).hasClass("selected"))
            {
                var id=$(item).data("id");
                $(".tabshow").each(function (index,item) {
                    var regs=new RegExp(" +tabshow"+id+" +","i");
                    if(regs.test($(item)[0].className))
                    {
                        $(item).css("display","-webkit-box");
                        if(id==3)
                        {
                            $(".addshuohuo").css("display","-webkit-box");
                        }else if(id==2)
                        {
                            $(".addsp").css("display","-webkit-box");
                        }
                    }else {
                        $(item).css("display","none");
                    }
                })
            }
    })
    if(gerenzliliaodata.age=="first")
    {
        $(".btninfosub_s").html("编辑信息");
    }else {
        $(".nld_s > div").each(function (index,item) {
            if($(item).html()==gerenzliliaodata.age)
            {
                if($(item).hasClass("nlselect_w"))
                {
                    return;
                }else {
                    $(".nld_s > div").each(function (index,item) {
                        console.log(item)
                        $(item).removeClass("nlselect_w");
                        // $(item).css("text-align","left");
                    })

                    $(item).addClass("nlselect_w");
                    // $(item).css("text-align","center");
                }
            }
        });

        $(".zwinfo_s > div").each(function (index,item) {
            if($(item).html()==gerenzliliaodata.position)
            {
                if($(item).hasClass("nlselect_w"))
                {
                    return;
                }else {
                    $(".zwinfo_s > div").each(function (index,item) {
                        $(item).removeClass("nlselect_w");
                        // $(item).css("width","1.59375rem");
                    })

                    if(gerenzliliaodata.position.length==3)
                    {
                        // $(this).css("width","2.125rem");
                    }

                    $(item).addClass("nlselect_w");
                }
            }
        })
        gerenzliliaodata.gender==1?$(".fsnn>div").css("display","block"):$(".fsnv>div").css("display","block");
        gerenzliliaodata.haveChildren==1?$(".you>div").css("display","block"):$(".meiyou>div").css("display","block");

    }

    $('.fs-zlphone').html(gerenzliliaodata.phone);
    // if(gerenzliliaodata.age!="first")
    // {
    //     $(".btninfosub").html("修改")
    // }
    //tab切换代码

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
             if($(".mydizhi1").length==0){
                 $(".addsp").css("display","-webkit-box");
                 $(".addshuohuo").css("display","none");
             }else {
                 $(".addsp").css("display","none");
                 $(".addshuohuo").css("display","none");
             }

        }else if($(this).data("id")==3) {
            if($(".mydizhifs").length==0)
            {
                $(".addshuohuo").css("display","-webkit-box");
                $(".addsp").css("display","none");
            }else {
                $(".addsp").css("display","none");
                $(".addshuohuo").css("display","none");
            }
        }else {
            $(".addsp").css("display","none");
            $(".addshuohuo").css("display","none");
        }

    });

    $(".nld >div").on("click",function () {
         if($(this).hasClass("nlselect"))
         {
             //$(this).removeClass("nlselect");
             return;
         }

        $(".nld >div").each(function (index,item) {
            $(item).removeClass('nlselect');
            //$(this).css("text-align","left");
        })

        $(this).addClass("nlselect");
        //$(this).css("text-align","center");
    })

    $(".zwinfo>div").on("click",function () {
        if($(this).hasClass("nlselect"))
        {
            //$(this).removeClass("nlselect");
            return;
        }

        $(".zwinfo >div").each(function (index,item) {
            $(item).removeClass('nlselect');
            //$(item).css("width","1.59375rem");
        })

        if($(this).html().length==3)
        {
            //$(this).css("width","2.125rem");
        }

        $(this).addClass("nlselect");
    });
    //ge个人资料编辑

    function messageInfo() {
    var html="";
            html+='<div class="bxf1 w1  bx bxv">';
            html+='<div class="listinfo borboxsize bx bxv">';
            html+='<div class="xbfont">性别</div>';
            html+='<div class="w1 bx bxh" style="">';
            html+='<div class="bx bxc bxf1" style="width: 5rem;height: 0.703125rem;">';
            html+='<input class="xbxb" type="radio"  name="male" id="nan" value="1">';
            html+='<label for="nan" class="nx borboxsize" style="padding-left:3.296875rem;">';
            html+='</label>';
            html+='</div>';
            html+='<div class="bx bxc bxf1" style="width: 5rem;height: 0.703125rem;">';
            html+='<input class="xbxb" type="radio" name="male" id="nv" value="2">';
            html+='<label for="nv" class="vx borboxsize">';
            html+='</label>';
            html+='</div>';
            html+='</div>';
            html+='<div style="width: 100%;height: 0.5625rem;"></div>';
            html+='</div>';
            html+='<div class="listinfo borboxsize bx bxv">';
            html+='<div class="xbfont" style="padding-top: 0.59375rem;">年龄(必选)</div>';
            html+='<div class="bx bxh nld bxc fontall" style="height: 0.8125rem;">';
            html+='<div class="" style="text-align: center;">70前</div>';
            html+='<div style="margin-left: 0.609375rem;text-align: center;">70后</div>';
            html+='<div style="margin-left: 0.609375rem;text-align: center;">80后</div>';
            html+='<div style="margin-left: 0.609375rem;text-align: center;">90后</div>';
            html+='</div>';
            html+='</div>';
            html+='<div class="listinfo borboxsize bx bxv">';
            html+='<div class="xbfont" style="padding-top: 0.59375rem;">职位(必选)</div>';
            html+='<div class="bx bxh w1 zwinfo" style="height: 0.8125rem;">';
            html+='<div style="margin-left: 0.54375rem;width: 1.59375rem;" class="">老板</div>';
            html+='<div style="margin-left:0.309375rem;width: 2.125rem">老板娘</div>';
            html+='<div style="margin-left:0.309375rem;width: 2.125rem">店小二</div>';
            html+='<div style="margin-left:0.309375rem;width: 2.125rem">理货员</div>';
            html+='</div>';
            html+='</div>';
            html+='<div class="listinfo borboxsize bx bxv">';
            html+='<div class="xbfont" style="padding-top: 0.59375rem;">是否有孩子</div>';
            html+='<div class="w1 bx bxh" style="">';
            html+='<div class="bx bxc bxf1" style="width: 5rem;height: 0.703125rem;">';
            html+='<input class="shengyu" type="radio"  name="haizi" id="yes" value="1">';
            html+='<label for="yes" class="you borboxsize" style="padding-left:3.296875rem;">';
            html+='</label>';
            html+='</div>';
            html+='<div class="bx bxc bxf1" style="width: 5rem;height: 0.703125rem;">';
            html+='<input class="shengyu" type="radio" name="haizi" id="no" value="0">';
            html+='<label for="no" class="meiyou borboxsize">';
            html+='</label>';
            html+='</div>';
            html+='</div>';
            html+='<div style="width: 100%;height: 0.5625rem;"></div>';
            html+='</div>';
            html+='<div class="bx bxh w1 borboxsize" style="padding-left: 1.03125rem;margin-top:1.15625rem;height: 0.5625rem;">';
            html+='<div style="font-size: 100%;color: #9d9d9d;padding-top:0.078125rem">手机号</div>';
            html+='<div class="fs-zlphone" style="font-size: 141.6666666666667%;color: #5c5c5c;margin-left:0.375rem;"></div>';
            html+='<div class="fs-edphone" style="font-size: 141.6666666666667%;color: #eb122c;margin-left:0.75rem;border-bottom: 1px solid #eb122c;">更改手机号</div>';
            html+='</div>';
            html+='<div class="btninfo bx bxc">';
            html+='<div class="btninfosub">保存</div>';
            html+='</div>';
            html+='</div>';
            return html;
    }

    //没有店铺代码

    function addShopshow(data) {
        var html="",i=0,len=data.length;
            html+='<div class="bxf1 w1 bx scroll bxv" id="conmain">';
            if(len>0)
            {
                for (;i<len;i++)
                {
                    if(data[i]==null)
                    {
                        continue;
                    }
                    html+='<div class="w1 list-dp" id="listShop'+i+'">';
                    html+='<div class="mydianlist1 borboxsize bx bxh lintest" style="-webkit-box-align: center;">';
                    html+='<div style="font-size: 116.6666666666667%;color: #3d3d3d;padding-left: 0.3125rem;height: 1rem;line-height: 1rem;">店铺名称</div>';
                    html+='<div class="bxf1" style="color:#c8c8c8;">';
                    html+='<input class="inputdianpu" value="'+data[i].shopname+'" readonly type="text" placeholder="请输入店铺名称 (例红辣椒徐汇店)">';
                    html+='</div>';
                    html+='</div>';
                    html+='<div class="mydianlist1 lintest borboxsize bx bxh" style="-webkit-box-align: center;">';
                    html+='<div style="font-size: 116.6666666666667%;color: #3d3d3d;padding-left: 0.3125rem;height: 1rem;line-height: 1rem;">店铺地址</div>';
                    html+='<div class="bxf1" style="color:#c8c8c8;">';
                    html+='<input class="inputdianpu" value="'+data[i].address+""+data[i].detailaddress+'" readonly type="text" placeholder="填写详细店铺地址">';
                    html+='</div>';
                    html+='</div>';
                    html+='<div class="mydianlist1 lintest borboxsize bx bxh" style="-webkit-box-align: center;">';
                    html+='<div style="font-size: 116.6666666666667%;color: #3d3d3d;padding-left: 0.3125rem;height: 1rem;line-height: 1rem;">姓名</div>';
                    html+='<div class="bxf1" style="color:#c8c8c8;">';
                    html+='<input class="inputdianpu" value="'+data[i].name+'" readonly type="text" placeholder="请输入您的姓名">';
                    html+='</div>';
                    html+='</div>';
                    html+='<div class="mydianlist1 lintest borboxsize bx bxh" style="-webkit-box-align: center;">';
                    html+='<div style="font-size: 116.6666666666667%;color: #3d3d3d;padding-left: 0.3125rem;height: 1rem;line-height: 1rem;">职位</div>';
                    html+='<div class="bxf1" style="color:#c8c8c8;">';
                    html+='<input class="inputdianpu" readonly value="'+data[i].postation+'" type="text" placeholder="请输选择您的职位">';
                    html+='</div>';
                    html+='</div>';
                    html+='<div class="bianjiaqu borboxsize bx bxh">';
                    html+='<div class="h1" style="width:6.15625rem;"></div>';
                    html+='<div class="bxf1 h1 bx bxh borboxsize bjcontrol" style=" -webkit-box-align:center;">';
                    html+='<div class="bianji f1s" data-index="'+i+'" data-shopid="'+data[i].id+'"></div>';
                    html+='<div class="bjfont f1s" data-index="'+i+'" data-shopid="'+data[i].id+'">编辑</div>';
                    html+='<div class="delshanchu f2s" data-index="'+i+'" data-shopid="'+data[i].id+'"></div>';
                    html+='<div class="delfont f2s" data-index="'+i+'" data-shopid="'+data[i].id+'">删除</div>';
                    html+='</div>';
                    html+='</div>';
                    html+='</div>';
                }
            }
            html+='</div>';
            html+='<div class="judibtn"></div>';

            $(".tabshow2").html(html);
            $("#conmain")[0].onscroll=function (e) {
                    bjtop=$("#conmain")[0].scrollTop
            }
            $("#conmain")[0].scrollTop=bjtop?bjtop:0;
             $(".bjcontrol").on("click",function (e) {
                 if($(e.target).hasClass("f1s"))
                 {
                       bjshaop($(e.target).data("index"));

                 }else if($(e.target).hasClass("f2s"))
                 {
                       delshop($(e.target).data("index"));
                 }
             })

    }

    //收获地址
    
    function addShowshuohuo(data) {
        var html="",i=0,len=data.length;
        html+='<div class="bxf1 w1 bx scroll bxv" id="conmainshuohuo">';
        if(len>0)
        {
            for (;i<len;i++)
            {
                if(data[i]==null)
                {
                    continue;
                }
                html+='<div class="w1 list-dp" id="listshuohuo'+i+'">';
                html+='<div class="mydianlist1 lintest borboxsize bx bxh" style="-webkit-box-align: center;">';
                html+='<div style="font-size: 116.6666666666667%;color: #3d3d3d;padding-left: 0.3125rem;height: 1rem;line-height: 1rem;">收货人</div>';
                html+='<div class="bxf1" style="color:#c8c8c8;">';
                html+='<input class="inputdianpu" value="'+data[i].name+'" readonly type="text" placeholder="请输入收货人姓名">';
                html+='</div>';
                html+='</div>';
                html+='<div class="mydianlist1 lintest borboxsize bx bxh" style="-webkit-box-align: center;">';
                html+='<div style="font-size: 116.6666666666667%;color: #3d3d3d;padding-left: 0.3125rem;height: 1rem;line-height: 1rem;">联系方式</div>';
                html+='<div class="bxf1" style="color:#c8c8c8;">';
                html+='<input class="inputdianpu" value="'+data[i].phone+'" readonly type="number" placeholder="请输入联系方式">';
                html+='</div>';
                html+='</div>';
                html+='<div class="mydianlist1 lintest borboxsize bx bxh" style="-webkit-box-align: center;">';
                html+='<div style="font-size: 116.6666666666667%;color: #3d3d3d;padding-left: 0.3125rem;height: 1rem;line-height: 1rem;">所在地区</div>';
                html+='<div class="bxf1" style="color:#c8c8c8;">';
                html+='<input class="inputdianpu" value="'+data[i].address+'" readonly type="text" placeholder="请填写地区">';
                html+='</div>';
                html+='</div>';
                html+='<div class="mydianlist1 lintest borboxsize bx bxh" style="-webkit-box-align: center;">';
                html+='<div style="font-size: 116.6666666666667%;color: #3d3d3d;padding-left: 0.3125rem;height: 1rem;line-height: 1rem;">详细地址</div>';
                html+='<div class="bxf1" style="color:#c8c8c8;">';
                html+='<input class="inputdianpu" readonly value="'+data[i].detailaddress+'" type="text" placeholder="请输入详细地址">';
                html+='</div>';
                html+='</div>';
                html+='<div class="bianjiaqu borboxsize bx bxh">';
                html+='<div class="h1 bx bxv" style="width:6.15625rem;-webkit-box-pack: center;">';
                html+="<label class='moren borboxsize'>";
                if(data[i].isDefault=="1")
                {
                    html+="<input data-shopid='"+data[i].id+"' data-index='"+i+"' type='radio' checked='checked'  class='mozhezhixuanze' name='morenfs' style='display: none;'>";
                }else {
                    html+="<input data-shopid='"+data[i].id+"' data-index='"+i+"' type='radio'  class='mozhezhixuanze' name='morenfs' style='display: none;'>";
                }
                html+="<span>默认地址<span>";
                html+="</label>";
                html+='</div>';
                html+='<div class="bxf1 h1 bx bxh borboxsize bjcontrolsh" style=" -webkit-box-align:center;">';
                html+='<div class="bianji f1s" data-index="'+i+'" data-shopid="'+data[i].id+'"></div>';
                html+='<div class="bjfont f1s" data-index="'+i+'" data-shopid="'+data[i].id+'">编辑</div>';
                html+='<div class="delshanchu f2s" data-index="'+i+'" data-shopid="'+data[i].id+'"></div>';
                html+='<div class="delfont f2s" data-index="'+i+'" data-shopid="'+data[i].id+'">删除</div>';
                html+='</div>';
                html+='</div>';
                html+='</div>';
            }
        }
        html+='</div>';
        html+='<div class="judibtn"></div>';
        $(".tabshow3").html(html);
        $("#conmainshuohuo")[0].onscroll=function (e) {
            bjshuohuotop=$("#conmainshuohuo")[0].scrollTop
        }
        $("#conmainshuohuo")[0].scrollTop=bjshuohuotop?bjshuohuotop:0;
        $(".bjcontrolsh").on("click",function (e) {
            if($(e.target).hasClass("f1s")||$(e.target).html()=="编辑")
            {
                bjshuohuodizhi($(e.target).data("index"));

            }else if($(e.target).hasClass("f2s")||$(e.target).html()=="删除")
            {
                delshuohuo($(e.target).data("index"))
            }
        })
        
        $(".mozhezhixuanze").each(function (index,item) {
             $(item).on("change",function () {
                  totallcontroll.bijimorendizhi($(this).data("index"),GetQueryString("type"))
             })
        })

    }

    function addShop(obj,bj,index) {
        obj= obj||{};
        var html="";
            html+='<div class="bxf1 w1 bx scroll bxv" id="conmain">';
            html+='<div style="width: 100%;height: 0.421875rem;"></div>';
            html+='<div class="w1 list-dp">';
            html+='<div class="mydianlist1 borboxsize bx bxh lintest" style="-webkit-box-align: center;">';
            html+='<div style="font-size: 116.6666666666667%;color: #3d3d3d;padding-left: 0.3125rem;height: 1rem;line-height: 1rem;">*店铺名称</div>';
            html+='<div class="bxf1" style="color:#c8c8c8;">';
            html+='<input class="inputdianpu" id="shopname" value="'+(obj.shopname?obj.shopname:"")+'" type="text" placeholder="请输入店铺名称 (例红辣椒徐汇店)">';
            html+='</div>';
            html+='</div>';
            html+='<div class="listdianpu borboxsize bx bxv">';
            html+='<div style="padding-left: 0.34375rem;padding-top: 0.65625rem;font-size: 116.6666666666667%;color: #3d3d3d;">*所在区域</div>';
            html+='<div  style="height: 0.625rem;margin-top:0.5rem;padding: 0 0.8125rem;" class="bx bxh borboxsize">';
            html+='<div class="bxf1 h1 sheng bx bxh" style="text-align: center;">';
            html+='<div class="bxf1 h1 shengshiqu">';
            html+='<input type="text" readonly="" value="'+(obj.address?obj.address:"")+'" placeholder="选择省市区" style="" id="city">';
            html+='<input id="value2" type="hidden" />';
            html+='</div>';
            html+='<div class="zjt"></div>';;
            html+='</div>';
            html+='</div>';
            html+='</div>';
            html+='<div style="padding-left: 0.34375rem;padding-top: 0.65625rem;font-size: 116.6666666666667%;color: #3d3d3d;">*详细地址</div>';
            html+='<textarea  class="texta" placeholder="请输入详细地址" style="font-size: 108.3333333333333% !important;">'+(obj.detailaddress?obj.detailaddress:"")+'</textarea>';
            html+='<div class="mydianlist1 lintest borboxsize bx bxh" style="-webkit-box-align: center;">';
            html+='<div style="font-size: 116.6666666666667%;color: #3d3d3d;padding-left: 0.3125rem;height: 1rem;line-height: 1rem;">*姓名</div>';
            html+='<div class="bxf1" style="color:#c8c8c8;">';
            html+='<input class="inputdianpu" value="'+(obj.name?obj.name:"")+'" id="xingming" type="text" placeholder="请输入您的姓名">';
            html+='</div>';
            html+='</div>';
            html+='<div class="mydianlist1 lintest borboxsize bx bxh" style="-webkit-box-align: center;">';
            html+='<div style="font-size: 116.6666666666667%;color: #3d3d3d;padding-left: 0.3125rem;height: 1rem;line-height: 1rem;">*职位</div>';
            html+='<div class="bxf1" style="color:#c8c8c8;position: relative;">';
            html+='<input class="inputdianpu" readonly id="nidezhiwei" value="'+(obj.postation?obj.postation:"")+'" type="text" placeholder="请输选择您的职位">';
            html+='<input id="value3" type="hidden" />';
            html+='</div>';
            html+="<div class='xjjxxxxtt'></div>";
            html+='</div>';
            html+='</div>';
            html+='<div class="mydizhi1">保存</div>';
            html+='<div style="height: 3rem;"></div>';
            html+='</div>';
            $(".tabshow2").html(html);
           var area2 = new LArea();
               area2.init({
            'trigger': '#city',
            'valueTo': '#value2',
            'keys': {
                id: 'value',
                name: 'text'
            },
            'type': 2,
            'data': [provs_data, citys_data, dists_data],
        },function (e) {});
        var morenweizhi=0;
        for(var jjfs=0;jjfs<weekdayArr.length;jjfs++)
        {
            if(weekdayArr[jjfs]== $("#nidezhiwei").val())
            {
                morenweizhi=jjfs;
                break;
            }
        }
        //console.log(morenweizhi)
        var mobileSelect1 = new MobileSelect({
            trigger: '#nidezhiwei',
            title: '职业',
            wheels: [
                {data: weekdayArr}
            ],
            position:[morenweizhi], //初始化定位 打开时默认选中的哪个 如果不填默认为0
            transitionEnd:function(indexArr, data){
                //console.log(data);
            },
            callback:function(indexArr, data){
                $("#nidezhiwei").val(data[0])
            }
        });

             $(".mydizhi1").on("click",function () {
                 if(bj=="bj")
                 {
                     if(typeof index !="undefined")
                     {
                         totallcontroll.edShop(obj,index);
                     }

                 }else {
                     totallcontroll.addShop();
                 }

             })

    }

    //添加收获地址

    function addShdz(obj,bj,index) {
        obj= obj||{};
        var html="";
        html+='<div class="bxf1 w1 bx scroll bxv" id="conmainshuohuo">';
        html+='<div style="width: 100%;height: 0.421875rem;"></div>';
        html+='<div class="w1 list-dp">';
        html+='<div class="mydianlist1 borboxsize bx bxh lintest" style="-webkit-box-align: center;">';
        html+='<div style="font-size: 116.6666666666667%;color: #3d3d3d;padding-left: 0.3125rem;height: 1rem;line-height: 1rem;">*收货人</div>';
        html+='<div class="bxf1" style="color:#c8c8c8;">';
        html+='<input class="inputdianpu" id="shuohuoren" value="'+(obj.name?obj.name:"")+'" type="text" placeholder="请输入收货人姓名">';
        html+='</div>';
        html+='</div>';
        html+='<div class="mydianlist1 lintest borboxsize bx bxh" style="-webkit-box-align: center;">';
        html+='<div style="font-size: 116.6666666666667%;color: #3d3d3d;padding-left: 0.3125rem;height: 1rem;line-height: 1rem;">*联系方式</div>';
        html+='<div class="bxf1" style="color:#c8c8c8;">';
        html+='<input class="inputdianpu" value="'+(obj.phone?obj.phone:"")+'" id="phones" type="number" placeholder="请输入手机号码">';
        html+='</div>';
        html+='</div>';
        html+='<div class="listdianpu borboxsize bx bxv">';
        html+='<div style="padding-left: 0.34375rem;padding-top: 0.65625rem;font-size: 116.6666666666667%;color: #3d3d3d;">*所在区域</div>';
        html+='<div  style="height: 0.625rem;margin-top:0.5rem;padding: 0 0.8125rem;" class="bx bxh borboxsize">';
        html+='<div class="bxf1 h1 sheng bx bxh" style="text-align: center;">';
        html+='<div class="bxf1 h1 shengshiqu">';
        html+='<input type="text" readonly="" value="'+(obj.address?obj.address:"")+'" placeholder="选择省市区" style="" id="city1">';
        html+='<input id="value4" type="hidden" />';
        html+='</div>';
        html+='<div class="zjt"></div>';;
        html+='</div>';
        html+='</div>';
        html+='</div>';
        html+='<div style="padding-left: 0.34375rem;padding-top: 0.65625rem;font-size: 116.6666666666667%;color: #3d3d3d;">*详细地址</div>';
        html+='<textarea  class="textas" placeholder="请输入详细地址" style="font-size: 108.3333333333333% !important;">'+(obj.detailaddress?obj.detailaddress:"")+'</textarea>';
        html+='</div>';
        html+='<div class="mydizhifs">保存</div>';
        html+='<div style="height: 3rem;"></div>';
        html+='</div>';
        $(".tabshow3").html(html);
        var area3 = new LArea();
        area3.init({
            'trigger': '#city1',
            'valueTo': '#value4',
            'keys': {
                id: 'value',
                name: 'text'
            },
            'type': 2,
            'data': [provs_data, citys_data, dists_data],
        },function (e) {});

        $(".mydizhifs").on("click",function () {
            if(bj=="bj")
            {
                if(typeof index !="undefined")
                {
                  totallcontroll.eddizhi(obj,index);
                }

            }else {
                totallcontroll.adddizhi();
            }
        })

    }
    
    function bjshaop(e) {
             $(".addsp").css("display","none");
             var arrobj=totallcontroll.mendianlist[e];
             addShop(arrobj,"bj",e);
        }

        function bjshuohuodizhi(e) {
            $(".addshuohuo").css("display","none");
            var arrobj=totallcontroll.shouhuodizhi[e];
            addShdz(arrobj,"bj",e)
        }

        function delshop(e) {
            totallcontroll.delShop(e);
        }

        function delshuohuo(e) {
            totallcontroll.deldizhi(e);
        }

        //
        //addShopshow(mendianlist);
        $(".addsp").on("click",function () {
            $(this).css("display","none");
            addShop();
        })
        $(".addshuohuo").on("click",function () {
            $(this).css("display","none");
            addShdz();
        })

        function GetRadioValue(RadioName){
            var obj;
            obj=document.getElementsByName(RadioName);
            if(obj!=null){
                var i;
                for(i=0;i<obj.length;i++){
                    if(obj[i].checked){
                        return obj[i].value;
                    }
                }
            }
            return null;
        }
        function GetSlect(ele,callback) {
            var flag=false;
           $("."+ele+">div").each(function (index,item) {
               if($(item).hasClass("nlselect"))
               {
                    flag=true;
                   callback(item);

               }
            })

            if(!flag)
            {
                return "wx";
            }

        }


        $(".btninfosub_s").on("click",function () {
            $(".tabshow1").html(messageInfo());
            $(".fs-edphone").on("click",function () {
                window.location.href="gerenziliaophone.html?v="+Math.random()
            });
            $(".btninfosub").one("click",function () {
                var argscallback=arguments.callee;
                var jishou="";
                var data={
                    type: 'post',
                    httpType: G$.sweetHttp + "imasterkong/customer/editCustomerInfo.do",
                    reqData: {
                        "appId":params.appId,
                        "openId":params.openId,
                        "phone":$(".fs-zlphone").html(),
                        "gender":GetRadioValue("male"),
                        "haveChildren":GetRadioValue("haizi"),
                        "timestamp":+new Date()
                    }
                };

                if(!GetRadioValue("male"))
                {
                    tipcaozuo("性别必选",function () {
                        $(".btninfosub").one("click",argscallback);
                    })

                    return;
                }

                if(!GetRadioValue("haizi"))
                {
                    tipcaozuo("是否有孩子必选",function () {
                        $(".btninfosub").one("click",argscallback);
                    })

                    return;
                }

                jishou=GetSlect("nld",function (item) {
                    data.reqData.age=$(item).html()
                });

                if(jishou=="wx")
                {
                    tipcaozuo("年龄必选",function () {
                        $(".btninfosub").one("click",argscallback);
                    })

                    return;
                }


                jishou=GetSlect("zwinfo",function (item) {
                    data.reqData.position=$(item).html()
                });

                if(jishou=="wx")
                {
                    tipcaozuo("职位必选",function () {
                        $(".btninfosub").one("click",argscallback);
                    })

                    return;
                }

                Mparams(data);

                function sucess(result) {
                    if(result.responseCode=="200")
                    {
                        window.sessionStorage.setItem("gerenziliao",JSON.stringify({
                            gender:data.reqData.gender,
                            haveChildren:data.reqData.haveChildren,
                            phone:data.reqData.phone,
                            position:data.reqData.position,
                            age:data.reqData.age
                        }));
                        tipcaozuo("保存成功",function () {
                            //$(".btninfosub").one("click",argscallback);
                            window.location.href=window.location.href;
                        })

                       // $(".btninfosub").html("修改");
                    }else{
                        tipcaozuo(result.responseDesc,function () {
                            $(".btninfosub").one("click",argscallback);
                        })
                    }
                }

                function error(err) {

                }

                G$.ajax(data,sucess,error);


            })
            $(".nld> div").each(function (index,item) {
                if($(item).html()==gerenzliliaodata.age)
                {
                    if($(item).hasClass("nlselect"))
                    {
                        return;
                    }else {
                        $(".nld > div").each(function (index,item) {
                            console.log(item)
                            $(item).removeClass("nlselect");
                            // $(item).css("text-align","left");
                        })

                        $(item).addClass("nlselect");
                        // $(item).css("text-align","center");
                    }
                }
            });

            $(".zwinfo> div").each(function (index,item) {
                if($(item).html()==gerenzliliaodata.position)
                {
                    if($(item).hasClass("nlselect"))
                    {
                        return;
                    }else {
                        $(".zwinfo> div").each(function (index,item) {
                            $(item).removeClass("nlselect");
                            // $(item).css("width","1.59375rem");
                        })

                        if(gerenzliliaodata.position.length==3)
                        {
                            // $(this).css("width","2.125rem");
                        }

                        $(item).addClass("nlselect");
                    }
                }
            })
            $(".nld >div").on("click",function () {
                if($(this).hasClass("nlselect"))
                {
                    //$(this).removeClass("nlselect");
                    return;
                }

                $(".nld >div").each(function (index,item) {
                    $(item).removeClass('nlselect');
                    //$(this).css("text-align","left");
                })

                $(this).addClass("nlselect");
                //$(this).css("text-align","center");
            })

            $(".zwinfo>div").on("click",function () {
                if($(this).hasClass("nlselect"))
                {
                    //$(this).removeClass("nlselect");
                    return;
                }

                $(".zwinfo >div").each(function (index,item) {
                    $(item).removeClass('nlselect');
                    //$(item).css("width","1.59375rem");
                })

                if($(this).html().length==3)
                {
                    //$(this).css("width","2.125rem");
                }

                $(this).addClass("nlselect");
            });
            $('.fs-zlphone').html(gerenzliliaodata.phone);

            gerenzliliaodata.gender==1?$("input[name='male']").get(0).checked=true:(gerenzliliaodata.gender==0?$("input[name='male']").get(1).checked=true:null);
            gerenzliliaodata.haveChildren==1?$("input[name='haizi']").get(0).checked=true:(gerenzliliaodata.haveChildren==0?$("input[name='haizi']").get(1).checked=true:null);

        })



        //保存成功提示

        function tipcaozuo(txt,callback) {
            tipcaozuo.time=30;
            clearInterval(tipcaozuo.timer);
            $(".tipyincang").html(txt);
            $(".tipyincang").css('display',"block");

            tipcaozuo.timer=setInterval(function () {
                if(tipcaozuo.time>0)
                {
                  //  console.log(tipcaozuo.time)
                }else{
                    $(".tipyincang").css('display',"none");
                    tipcaozuo.time=30;
                    clearInterval(tipcaozuo.timer);
                    if(callback)
                    {
                        callback()
                    }
                    return;
                }
                tipcaozuo.time--;

            },30);
        }

        function Edaddressandshop() {
            this.mendianlist=[];
            this.shouhuodizhi=[];
        }

        Edaddressandshop.prototype={
            init:function () {
              this.getAddress();
              this.getShop();
            },
            getAddress:function () {
                var self=this;
                var data={
                    type: 'post',
                    httpType: G$.sweetHttp + "imasterkong/customer/getAddressList.do",
                    reqData: {
                        "openId":params.openId,
                        "timestamp":+new Date()
                    }
                };

                Mparams(data);

                function sucess(result) {
                    if(result.responseCode=="200")
                    {
                        var _result=result.data?result.data:[],
                            i=0,
                            len=_result.length;
                        if(len==0) return;
                        for(;i<len;i++)
                        {
                            self.shouhuodizhi.push(
                                {
                                    id:_result[i].id,
                                    name:_result[i].name,
                                    "phone":_result[i].phone,
                                    "address":_result[i].area,
                                    "detailaddress":_result[i].detailAddress,
                                    "areaId":_result[i].areaId,
                                    "isDefault":_result[i].isDefault
                                }
                            )
                        }
                        addShowshuohuo(self.shouhuodizhi);
                        data=null;
                    }
                }

                function error(e) {

                }

                G$.ajax(data,sucess,error)

            },
            getShop:function () {
                var self=this;
                var data={
                    type: 'post',
                    httpType: G$.sweetHttp + "imasterkong/customer/getStoreInfos.do",
                    reqData: {
                        "appId":params.appId,
                        "openId":params.openId,
                        "timestamp":+new Date()
                    }
                };

                function sucess(result) {
                    if(result.responseCode==200)
                    {
                        var _result=result.data.customerStorefrontsInfos;

                        var len=_result.length,i=0;

                        if(len==0) return;

                        for(;i<len;i++)
                        {
                            self.mendianlist.push(
                                {
                                    id:_result[i].id,
                                    shopname:_result[i].storeName,
                                    name:_result[i].employeeName,
                                    "postation":_result[i].position,
                                    "address":_result[i].area,
                                     "areaId":_result[i].areaId,
                                    "detailaddress":_result[i].detailAddress
                                }
                            )
                        }
                        addShopshow(self.mendianlist)
                        data=null;
                    }
                }

                function error(e) {

                }

                Mparams(data);

                G$.ajax(data,sucess,error)
            },
            delShop:function (e) {
                var self=this;
                var data={
                    type: 'post',
                    httpType: G$.sweetHttp + "imasterkong/customer/delectStoreInfo.do",
                    reqData: {
                        "id":self.mendianlist[e].id,
                        "openId":params.openId,
                        "timestamp":+new Date()
                    }
                };

                Mparams(data);
                if(self.mendianlist.length==1&&self.mendianlist[0]!=null||(self.mendianlist.length-dellist.length)==1){
                    tipcaozuo("删除失败")
                    return;
                }
                function sucess(result) {
                    if(result.responseCode==200)
                    {
                        $("#conmain")[0].removeChild($("#listShop"+e)[0]);
                        var delarr=self.mendianlist.splice(e,1,null);
                        dellist.push(delarr[0]);
                        tipcaozuo("删除成功");
                    }
                }

                function error(e) {

                }
                G$.ajax(data,sucess,error);
            },
            addShop:function () {
                var self=this;
                if($("#shopname").val()=="")
                {
                    tipcaozuo("店铺名不能为空");
                    return;
                }

                if($("#xingming").val()=="")
                {
                    tipcaozuo("姓名不能为空");
                    return;
                }

                if($("#nidezhiwei").val()=="")
                {
                    tipcaozuo("职位不能为空");
                    return;
                }

                if($("#city").val()=="")
                {
                    tipcaozuo("区域不能为空");
                    return;
                }

                if($(".texta").val()=="")
                {
                    tipcaozuo("详细地址不能为空");
                    return;
                }

                var _spinfo=JSON.parse(window.sessionStorage.getItem("xiaodianinfo"));

                var arrsd=($("#value2").val()).split(",");
                var rea_id=arrsd.length==3?arrsd[2]:arrsd[1];
                var data={
                    type: 'post',
                    httpType: G$.sweetHttp + "imasterkong/customer/addStoreInfo.do",
                    reqData: {
                        "appId":params.appId,
                        "openId":params.openId,
                        "storeName":$("#shopname").val(),
                        "areaId":rea_id,
                        "area":$("#city").val(),
                        "detailAddress":$(".texta").val(),
                        "position":$("#nidezhiwei").val(),
                        "employeeName":$("#xingming").val(),
                        "timestamp":+new Date()
                    }
                }

                function sucess(result) {
                    if(result.responseCode=="200")
                    {
                        self.mendianlist.unshift({
                            id:result.data.id,
                            shopname:data.reqData.storeName,
                            name:data.reqData.employeeName,
                            "postation":data.reqData.position,
                            "address":data.reqData.area,
                            "areaId":data.reqData.areaId,
                            "detailaddress":data.reqData.detailAddress
                        });

                        var i=0,len=self.mendianlist.length;
                        for(;i<len;i++)
                        {
                            if(self.mendianlist[i]==null)
                            {
                                self.mendianlist.splice(i,1);
                                len--;
                                i--;
                            }

                        }
                        if(_spinfo.isFirstStore=="1")
                        {
                            tipcaozuo("保存成功,恭喜获取"+_spinfo.firstStoreScore+"积分",function () {
                                if($(".addsp").css("display")=="none")
                                {
                                    $(".addsp").css("display","-webkit-box");
                                }
                                addShopshow(self.mendianlist);
                                data=null;
                            });

                            _spinfo.isFirstStore=0;

                            window.sessionStorage.setItem("xiaodianinfo",JSON.stringify(_spinfo));
                            return;
                        }
                        tipcaozuo("保存成功",function () {
                            if($(".addsp").css("display")=="none")
                            {
                                $(".addsp").css("display","-webkit-box");
                            }
                            addShopshow(self.mendianlist);
                            data=null;
                        })
                    }
                }

                function error() {

                }

                G$.ajax(data,sucess,error);

            },
            edShop:function (obj,index) {
                var self=this;
                if($("#shopname").val()=="")
                {
                    tipcaozuo("店铺名不能为空");
                    return;
                }

                if($("#xingming").val()=="")
                {
                    tipcaozuo("姓名不能为空");
                    return;
                }

                if($("#nidezhiwei").val()=="")
                {
                    tipcaozuo("职位不能为空");
                    return;
                }

                if($("#city").val()=="")
                {
                    tipcaozuo("区域不能为空");
                    return;
                }

                if($(".texta").val()=="")
                {
                    tipcaozuo("详细地址不能为空");
                    return;
                }

                var _arrare_id="";
                if($("#value2").val()=="")
                {
                    _arrare_id=obj.areaId;
                }else {
                    var arrids=($("#value2").val()).split(",");
                    _arrare_id=arrids.length===3?arrids[2]:arrids[1];
                }

                var data={
                    type: 'post',
                    httpType: G$.sweetHttp + "imasterkong/customer/editStoreInfo.do",
                    reqData: {
                        "id":obj.id,
                        "appId":params.appId,
                        "openId":params.openId,
                        "storeName":$("#shopname").val(),
                        "areaId":_arrare_id,
                        "area":$("#city").val(),
                        "detailAddress":$(".texta").val(),
                        "position":$("#nidezhiwei").val(),
                        "employeeName":$("#xingming").val(),
                        "timestamp":+new Date()
                    }
                };

                function sucess(result) {
                    if(result.responseCode=="200")
                    {
                        self.mendianlist.splice(index,1,{
                            id:obj.id,
                            shopname:data.reqData.storeName,
                            name:data.reqData.employeeName,
                            "postation":data.reqData.position,
                            "address":data.reqData.area,
                            "areaId":data.reqData.areaId,
                            "detailaddress":data.reqData.detailAddress
                        });
                        var i=0,len=self.mendianlist.length;
                        for(;i<len;i++)
                        {
                            if(self.mendianlist[i]==null)
                            {
                                self.mendianlist.splice(i,1);
                                len--;
                                i--;
                            }

                        }
                        tipcaozuo("保存成功",function () {

                            if($(".addsp").css("display")=="none")
                            {
                                $(".addsp").css("display","-webkit-box");
                            }

                            addShopshow(self.mendianlist);
                            data=null;
                        })
                    }
                }

                function error(er) {

                }

                G$.ajax(data,sucess,error);
            },
            adddizhi:function () {
                var self=this;
                if($("#shuohuoren").val()=="")
                {
                    tipcaozuo("姓名不能为空");
                    return;
                }

                if($("#phones").val()=="")
                {
                    tipcaozuo("手机号码不能为空");
                    return;
                }

                if(!myreg.test($("#phones").val()))
                {
                    tipcaozuo("手机号码不正确");
                    return;
                }

                if($("#city1").val()=="")
                {
                    tipcaozuo("城市不能为空");
                    return;
                }

                if($(".textas").val()=="")
                {
                    tipcaozuo("详细地址不能为空");
                    return;
                }
                var arrsd=($("#value4").val()).split(",");
                var rea_id=arrsd.length==3?arrsd[2]:arrsd[1];
                var data={
                    type: 'post',
                    httpType: G$.sweetHttp + "imasterkong/customer/addAddressInfo.do",
                    reqData: {
                        "openId":params.openId,
                        "name":$("#shuohuoren").val(),
                        "phone":$("#phones").val(),
                        "areaId":rea_id,
                        "area":$("#city1").val(),
                        "detailAddress":$(".textas").val(),
                        "isDefault":"0",
                        "timestamp":+new Date()
                    }
                };

                Mparams(data);

                function sucess(result) {
                    if(result.responseCode=="200")
                    {
                        var _result=result.data;
                        self.shouhuodizhi.unshift(
                            {
                                id:_result.id,
                                name:_result.name,
                                "phone":_result.phone,
                                "address":_result.area,
                                "detailaddress":_result.detailAddress,
                                "areaId":_result.areaId,
                                "isDefault":_result.isDefault,
                            }
                        );

                        var i=0,len=self.shouhuodizhi.length;
                        for(;i<len;i++)
                        {
                            if(self.shouhuodizhi[i]==null)
                            {
                                self.shouhuodizhi.splice(i,1);
                                len--;
                                i--;
                            }

                        }

                        tipcaozuo("新增成功",function () {
                            if(GetQueryString("type")=="dzi")
                            {
                                window.sessionStorage.setItem("fsshouhuo",JSON.stringify(
                                    {
                                        id:_result.id,
                                        name:_result.name,
                                        "phone":_result.phone,
                                        "address":_result.area,
                                        "detailaddress":_result.detailAddress,
                                        "areaId":_result.areaId,
                                        "isDefault":_result.isDefault
                                    }
                                ));
                                window.location.href="shouhuolingqu.html?v="+Math.random();

                            }else {
                                if($(".addshuohuo").css("display")=="none")
                                {
                                    $(".addshuohuo").css("display","-webkit-box");
                                }
                                addShowshuohuo(self.shouhuodizhi);
                            }
                            data=null;
                        })
                    }
                }

                function error(e) {

                }

                G$.ajax(data,sucess,error)


            },
            eddizhi:function (obj,index) {
                var self=this;
                if($("#shuohuoren").val()=="")
                {
                    tipcaozuo("姓名不能为空");
                    return;
                }

                if($("#phones").val()=="")
                {
                    tipcaozuo("手机号码不能为空");
                    return;
                }

                if(!myreg.test($("#phones").val()))
                {
                    tipcaozuo("手机号码不正确");
                    return;
                }

                if($("#city1").val()=="")
                {
                    tipcaozuo("城市不能为空");
                    return;
                }

                if($(".textas").val()=="")
                {
                    tipcaozuo("详细地址不能为空");
                    return;
                }
                var _arrare_id="";
                if($("#value4").val()=="")
                {
                    _arrare_id=obj.areaId;
                }else {
                    var arrids=($("#value4").val()).split(",");
                    _arrare_id=arrids.length===3?arrids[2]:arrids[1];
                }
                var data={
                    type: 'post',
                    httpType: G$.sweetHttp + "imasterkong/customer/editAddressInfo.do",
                    reqData: {
                        "id":obj.id,
                        "openId":params.openId,
                        "name":$("#shuohuoren").val(),
                        "phone":$("#phones").val(),
                        "areaId":_arrare_id,
                        "area":$("#city1").val(),
                        "detailAddress":$(".textas").val(),
                        "isDefault":obj.isDefault,
                        "timestamp":+new Date()
                    }
                };

                Mparams(data);

                function sucess(result) {
                    if(result.responseCode=="200")
                    {
                        self.shouhuodizhi.splice(index,1,{
                            "id":obj.id,
                            "openId":params.openId,
                            "name":data.reqData.name,
                            "phone":data.reqData.phone,
                            "areaId":data.reqData.areaId,
                            "address":data.reqData.area,
                            "isDefault":obj.isDefault,
                            "detailaddress":data.reqData.detailAddress,
                        });

                        var i=0,len=self.shouhuodizhi.length;
                        for(;i<len;i++)
                        {
                            if(self.shouhuodizhi[i]==null)
                            {
                                self.shouhuodizhi.splice(i,1);
                                len--;
                                i--;
                            }

                        }
                        console.log(self.shouhuodizhi)
                        tipcaozuo("保存成功",function () {
                            if(GetQueryString("type")=="dzi")
                            {
                                window.sessionStorage.setItem("fsshouhuo",JSON.stringify(
                                    {
                                        "id": obj.id,
                                        "openId": params.openId,
                                        "name": data.reqData.name,
                                        "phone": data.reqData.phone,
                                        "areaId": data.reqData.areaId,
                                        "address": data.reqData.area,
                                        "isDefault": obj.isDefault,
                                        "detailaddress": data.reqData.detailAddress
                                    }
                                ));
                                window.location.href="shouhuolingqu.html?v="+Math.random();

                            }else {
                                if($(".addshuohuo").css("display")=="none")
                                {
                                    $(".addshuohuo").css("display","-webkit-box");
                                }
                                addShowshuohuo(self.shouhuodizhi);
                            }
                            data=null;
                        })
                    }
                }

                function error() {
                    
                }

                G$.ajax(data,sucess,error);

            },
            deldizhi:function (e) {
                var self=this;
                if(self.shouhuodizhi.length==1&&self.shouhuodizhi[0]!=null||(self.shouhuodizhi.length-deldizhilist.length)==1){
                    tipcaozuo("删除失败")
                    return;
                }
                var data={
                    type: 'post',
                    httpType: G$.sweetHttp + "imasterkong/customer/delectAddressInfo.do",
                    reqData: {
                        "id":self.shouhuodizhi[e].id,
                        "openId":params.openId,
                        "timestamp":+new Date()
                    }
                };

                Mparams(data);

                function sucess(result) {
                    if(result.responseCode=="200")
                    {
                        $("#conmainshuohuo")[0].removeChild($("#listshuohuo"+e)[0]);
                        var delarr=self.shouhuodizhi.splice(e,1,null);
                        deldizhilist.push(delarr[0]);
                        tipcaozuo("删除成功");
                    }
                }

                function error(e) {

                }

                G$.ajax(data,sucess,error);
            },
            bijimorendizhi:function (index,type) {
                var self=this;
                var obj=self.shouhuodizhi[index];
                var data={
                    type: 'post',
                    httpType: G$.sweetHttp + "imasterkong/customer/editAddressInfo.do",
                    reqData: {
                        "id":obj.id,
                        "openId":params.openId,
                        "name":obj.name,
                        "phone":obj.phone,
                        "areaId":obj.areaId,
                        "area":obj.address,
                        "detailAddress":obj.detailaddress,
                        "isDefault":1,
                        "timestamp":+new Date()
                    }
                };

                Mparams(data);
                
                function sucess(result) {
                    if(result.responseCode=="200")
                    {
                        var i=0,
                            len=self.shouhuodizhi.length;
                        for(;i<len;i++)
                        {
                            if(self.shouhuodizhi[i]){

                                if(self.shouhuodizhi[i].id==obj.id)
                                {
                                    self.shouhuodizhi[i].isDefault=1;
                                }else {
                                    self.shouhuodizhi[i].isDefault=0;
                                }
                            }

                        }
                    }

                    if(type=="dzi")
                    {
                        window.sessionStorage.setItem("fsshouhuo",JSON.stringify(
                            self.shouhuodizhi[index]
                        ))

                        window.location.href="shouhuolingqu.html?v="+Math.random();
                    }
                }
                
                function error(er) {
                    
                }

                G$.ajax(data,sucess,error)

            }
        }

   var totallcontroll =new Edaddressandshop();

    totallcontroll.init()



})($);