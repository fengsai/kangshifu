/**
 * Created by Administrator on 2018/4/16.
 */
(function () {
    document.getElementsByClassName("shosvg")[0].style.height=document.getElementsByClassName("shosvg")[0].clientWidth+"px";
    var fontsize_fs=window.getComputedStyle(document.documentElement,null).fontSize;
    var currYear = (new Date()).getFullYear();
    var opt={};
    var pandunqita=false;
    var panduandianji=true;
    opt.date = {preset : 'date'};
    opt.datetime = {preset : 'datetime'};
    opt.time = {preset : 'time'};
    opt.default = {
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: true,
        nowText: "今天",
        startYear: currYear - 10, //开始年份
        endYear: currYear + 10 //结束年份
    };

    $("#start_date").mobiscroll($.extend(opt['date'], opt['default']));
    $("#end_date").mobiscroll($.extend(opt['date'], opt['default']));
    var radius=94.5/320*document.documentElement.clientWidth-20;
    var duration=1;
    //创建舞台
    //创建层

   $("input").each(function (index,item) {
       $(item).on("change",function () {
           if($(this).attr("id")=="end_date")
           {
               if($("#start_date").val()!="")
               {
                   draw.init($("#start_date").val(),$(this).val());

               }else {

               }
           }else if($(this).attr("id")=="start_date") {
               if($("#end_date").val()!="")
               {
                   draw.init($(this).val(),$("#end_date").val())
               }else {

               }
           }
       })
    })

    function GouMailishi() {
        this.data=[];
        this.otherdata=[];
        this.qianwu=[];
        this.appendHtml=null;
    }
    GouMailishi.prototype={
        init:function (startdate,enddate) {
             if(typeof startdate=="undefined"&&typeof enddate=="undefined")
             {
                 this.getData("","");
             }else {
                 this.getData(startdate,enddate);
             }

        },
        getData:function (startdate,enddate) {
            var self=this;
           var data= {
               type: 'post',
               httpType: G$.sweetHttp + "imasterkong/customer/ queryGoodsPercentage.do",
               reqData: {
                   "openId":params.openId,
                   "start_time":startdate,
                   "end_time":enddate,
                   "timestamp":+new Date()
               }
           };

            Mparams(data);

           function sucess(result) {
              if(result.responseCode=="200")
              {
                  var _result=result.data;
                  //?result.data:[{value:"1",number:"0",title:'暂无数据',color:"#BB55DD"}]
                  //var _result= [{value:"1",number:"0",title:'暂无数据数据数据数据',color:"#BB55DD"}]
                  if(_result.otherList.length>0)
                  {
                      pandunqita=true;
                      self.data=[].concat(_result.preFiveList.slice(1),_result.otherList.slice(0,1));
                      self.qianwu=[].concat(_result.preFiveList,_result.otherList.slice(0,1));
                      self.otherdata=[].concat(_result.otherList.slice(1))
                  }else {
                      self.data=[].concat(_result.preFiveList.slice(1));
                      self.qianwu=[].concat(_result.preFiveList);
                      if(self.qianwu.length==1)
                      {
                          self.data=[].concat([{value:"1",number:"0",title:'暂无数据',color:"#BB55DD"}]);
                      }
                  }


                   //self.data[0].title="未签拉面味千拉面方便面"
                   self.draw();
                   self.datalist();
              }
           }

            function error(er) {

            }

            G$.ajax(data,sucess,error);
        },
        draw:function () {
            var self=this;
            var textwidth="";
            if(stage)
           {
               stage.destroy();
           }
            var stage=new Konva.Stage({
                container:".shosvg",
                width:document.getElementsByClassName("shosvg")[0].clientWidth,
                height:document.getElementsByClassName("shosvg")[0].clientWidth
            })
            var layer=new Konva.Layer({

            });
            stage.add(layer);
            //创建扇形的组
            var wedgeGroup=new Konva.Group({
                x:stage.getWidth()/2,
                y:stage.getHeight()/2
            });

            //创建文字的组
            var textGroup=new Konva.Group({
                x:stage.getWidth()/2,
                y:stage.getHeight()/2
            })

            //创建百分比分组

            var textpacerGroup=new Konva.Group({
                x:stage.getWidth()/2,
                y:stage.getHeight()/2
            })

            //矩形区域

            var ReactGroup=new Konva.Group({
                x:stage.getWidth()/2,
                y:stage.getHeight()/2
            })

            //小圆
            var titleGroup=new Konva.Group({
                x:stage.getWidth()/2,
                y:stage.getHeight()/2
            })
            var neiyuan=new Konva.Group({
                x:stage.getWidth()/2,
                y:stage.getHeight()/2
            });
            var cicle=new Konva.Circle({
                radius: radius/2,
                fill: '#ffffff'
            })
            neiyuan.add(cicle);
            var startAngle=0;
            self.data.forEach(function(item,index){
                var angle=item.value*360;
                console.log(angle)
                //绘制扇形
              //  console.log(radius-textwidth)
                var wedgeShape=new Konva.Wedge({
                    x:0,
                    y:0,
                    radius:radius,
                    angle:0,
                    rotation:startAngle,
                    fill:item.color,
                    name:angle+""
                });

                wedgeGroup.add(wedgeShape);

                //绘制文字
                var textAngle=startAngle+angle/2;//文字对应的角度
                var textX=Math.cos(textAngle/180*Math.PI)*(radius+15);
                var textY=Math.sin(textAngle/180*Math.PI)*(radius+20);
                var text=new Konva.Text({
                    text:item.title,
                    name:item.title,
                    wrap:'none',
                    width:(document.documentElement.clientWidth-radius*2)*0.5,
                    ellipsis:true,
                    x:textX,
                    y:textY-15,
                    fill:item.color,
                    fontSize:0.8791208791208791*parseFloat(fontsize_fs),
                    visible:false
                });
                text.ellipsis(true);
               // text.align("right");

                var textpa=new Konva.Text({
                    text:item.value*100+"%",
                    name:item.title,
                    x:textX,
                    y:textY+8,
                    fill:item.color,
                    fontSize:0.8791208791208791*parseFloat(fontsize_fs),
                    visible:false
                });

                var randiotitle=new Konva.Circle({
                    x:textX-6,
                    y:textY,
                    radius:4,
                    fill:item.color,
                    visible:false,
                    name:item.title
                })

                var innerRect=new Konva.Rect({
                    x:randiotitle.x(),
                    y:randiotitle.y(),
                    width:text.getWidth()+20,
                    height:2,
                    opacity:.7,
                    fill:item.color,
                    cornerRadius:2/3,
                    visible:false,
                    name:item.title
                });

                if(textAngle>90&&textAngle<270){
                    text.x(text.x()-text.getWidth()-10);
                    textpa.x(textpa.x()-textpa.getWidth());
                    innerRect.rotate(180);
                    text.align("right");
                }else {
                    text.align("left");
                }
                textGroup.add(text);
                titleGroup.add(randiotitle);
                textpacerGroup.add(textpa);
                ReactGroup.add(innerRect)
                startAngle+=angle;
            });

            layer.add(wedgeGroup);
            layer.add(textGroup);
            layer.add(titleGroup);
            layer.add(textpacerGroup);
            layer.add(ReactGroup);
            layer.add(neiyuan);
            layer.draw();

            var wedgeList=wedgeGroup.getChildren();
            var xiaoyuan=titleGroup.getChildren();
            var baifenbi=textpacerGroup.getChildren();
            var juxing=ReactGroup.getChildren();
            stage.on("touchstart",function () {
                if(this.tapStartShape.className){
                    if(this.tapStartShape.className=="Text"||this.tapStartShape.className=="Circle"||this.tapStartShape.className=="Rect")
                    {
                        console.log(this.tapStartShape.name())
                    }
                }
            })
            var animateIndex=0;
            playAnimate();//调用函数执行动画
            function playAnimate(){
                if(animateIndex>=self.data.length){
                    return;
                }
                var wedge=wedgeList[animateIndex];
                var angle=Number(wedge.name());
                var animateDuration=duration*(angle/360);
                wedge.to({
                    angle:angle,
                    duration:animateDuration,
                    onFinish:function(){
                        textGroup.getChildren()[animateIndex].show();
                        titleGroup.getChildren()[animateIndex].show();
                        textpacerGroup.getChildren()[animateIndex].show();
                        ReactGroup.getChildren()[animateIndex].show();
                        animateIndex++;
                        playAnimate();
                    }
                })
            }
        },
        datalist:function () {
            var slef=this,
                i=0,
                len=slef.qianwu.length,
                html="";
            for(;i<len;i++)
            {
                if(i==0)
                {
                    html+='<div class="listlishijilu bx bxh">'
                    html+='<div class=" borboxsize" style="word-break: break-all;width: 25%;font-size: 0.5860805860805861rem;border-right: 1px solid #D4D4D4;">'+slef.qianwu[i].title+'</div>';
                    html+='<div class="borboxsize" style="width: 25%;font-size: 0.5860805860805861rem;border-right: 1px solid #D4D4D4;">'+slef.qianwu[i].number+'</div>';
                    html+='<div class="borboxsize" style="width: 25%;font-size: 0.5860805860805861rem;border-right: 1px solid #D4D4D4;">'+(slef.qianwu[i].value)+'%</div>';
                    html+='<div class="borboxsize" style="width: 25%;font-size: 0.5860805860805861rem;">'+(slef.qianwu[i].amount)+'元</div>';
                    html+='</div>'
                }else {
                    if(pandunqita&&i==len-1)
                    {
                        html+='<div class="listlishijilu bx bxh" data-panduan="qita">'
                        html+='<div class=" borboxsize" data-panduan="qita" style="word-break: break-all;width: 25%;font-size: 0.5860805860805861rem;border-right: 1px solid #D4D4D4;color: #0299e0;">'+slef.qianwu[i].title+'</div>';
                        html+='<div class="borboxsize" data-panduan="qita" style="width: 25%;font-size: 0.5860805860805861rem;border-right: 1px solid #D4D4D4;">'+slef.qianwu[i].number+'</div>';
                        html+='<div class="borboxsize" data-panduan="qita" style="width: 25%;font-size: 0.5860805860805861rem;border-right: 1px solid #D4D4D4;">'+(slef.qianwu[i].value*100)+'%</div>';
                        html+='<div class="borboxsize" data-panduan="qita" style="width: 25%;font-size: 0.5860805860805861rem;">'+(slef.qianwu[i].amount)+'元</div>';
                        html+='</div>'
                    }else {
                        html+='<div class="listlishijilu bx bxh">'
                        html+='<div class=" borboxsize" style="word-break: break-all;width: 25%;font-size: 0.5860805860805861rem;border-right: 1px solid #D4D4D4;">'+slef.qianwu[i].title+'</div>';
                        html+='<div class="borboxsize" style="width: 25%;font-size: 0.5860805860805861rem;border-right: 1px solid #D4D4D4;">'+slef.qianwu[i].number+'</div>';
                        html+='<div class="borboxsize" style="width: 25%;font-size: 0.5860805860805861rem;border-right: 1px solid #D4D4D4;">'+(slef.qianwu[i].value*100)+'%</div>';
                        html+='<div class="borboxsize" style="width: 25%;font-size: 0.5860805860805861rem;">'+(slef.qianwu[i].amount)+'元</div>';
                        html+='</div>'
                    }

                }

            }

            $(".lishidatalist").html(html);
            $(".listlishijilu").on("click",function (e) {
                var html="";
                if(e.target.dataset["panduan"]=="qita")
                {
                    if(panduandianji)
                    {
                        panduandianji=false;
                        if(!slef.appendHtml){
                            for(var i=0,len=slef.otherdata.length;i<len;i++)
                            {
                                html+='<div class="listlishijilu bx bxh xinzes">'
                                html+='<div class=" borboxsize"  style="word-break: break-all;width: 25%;font-size: 0.5860805860805861rem;border-right: 1px solid #D4D4D4;">'+slef.otherdata[i].title+'</div>';
                                html+='<div class="borboxsize"  style="width: 25%;font-size: 0.5860805860805861rem;border-right: 1px solid #D4D4D4;">'+slef.otherdata[i].number+'</div>';
                                html+='<div class="borboxsize"  style="width: 25%;font-size: 0.5860805860805861rem;border-right: 1px solid #D4D4D4;">'+(slef.otherdata[i].value*100)+'%</div>';
                                html+='<div class="borboxsize"  style="width: 25%;font-size: 0.5860805860805861rem;">'+(slef.otherdata[i].amount)+'元</div>';
                                html+='</div>'
                            }
                            slef.appendHtml=html;
                        }else {
                            html=slef.appendHtml;
                        }

                        $(".lishidatalist").append(html);

                    }else {
                         slef.datalist();
                         panduandianji=true;

                    }
                }
            })
        }
    }
    var draw=new GouMailishi();
    draw.init()
    $(".lijichakan").on("click",function () {
       location.href="goumailijichakan.html?v="+Math.random();
    });

    $(".clearall").on("click",function () {

        if($("#start_date").val()==""||$("#end_date").val()=="")
        {
            $("#start_date").val("");
            $("#end_date").val("");
             return;
        }else {
            $("#start_date").val("");
            $("#end_date").val("");
            draw.init();
        }
    })
})();