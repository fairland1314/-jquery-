let scrollBody = {};
// 初始化标签高度  不建议设置100vh
scrollBody.init = function(boxName,contentListClass){  //(监听滚动事件的标签名，滚动标签的子box标签class名)例如("body",".box")

    scrollBody.indexNum = 1  // 当前页码位置
    scrollBody.pageHeight = window.innerHeight; //获取页面高度

    $(boxName).attr('style','height:'+scrollBody.pageHeight+'px;overflow-y:hidden;');
    $(contentListClass).each(function(i,e){
        let str = $(e).attr("style");
        if(str){
            str = $(e).attr("style")+'height:'+scrollBody.pageHeight+'px;width:100vw;';   //此处width设置滚动标签内部的子盒子宽度
        }else{
            str = 'height:'+scrollBody.pageHeight+'px;width:100vw;';
        }
        // let str = $(e).attr("style")+
        $(e).attr('style',str);
    });
};
scrollBody.scroll = function(boxName,contentBoxID,contentListClass,sumNumber){  //(boxName监听滚动事件的标签名，contentBoxID设置的滚动标签ID，contentListClass滚动标签的子box标签class名 sumNumber触发页面滚动事件的范围)
    
    if(boxName == undefined && contentBoxID == undefined){
        alert("至少绑定一个标签来触发滚动事件")
        return
    }
    // c的默认值为20
    if(sumNumber && typeof(sumNumber) != "number" ){
        alert("请输入number类型的数字");
        return
    }else{
        sumNumber = sumNumber?sumNumber:20
    }
    
    
    $(boxName).off('mousedown').on("mousedown",function(e){
        
        scrollBody.startHeight = e.clientY;
    })
    
    $(boxName).off("mouseup").on("mouseup",function(e){
        scrollBody.overHeight = e.clientY;
        
        if(scrollBody.startHeight > scrollBody.overHeight && scrollBody.startHeight-scrollBody.overHeight >= sumNumber && $(contentListClass).length > scrollBody.indexNum){ //滚动幅度足够切换页面时
            $(contentBoxID).attr("style","top:-"+scrollBody.pageHeight*scrollBody.indexNum+"px") 
            scrollBody.indexNum++;
        }else if(scrollBody.startHeight < scrollBody.overHeight && scrollBody.overHeight-scrollBody.startHeight > sumNumber && scrollBody.indexNum > 1){ //滚动幅度足够切换页面时
            scrollBody.indexNum--;
            $(contentBoxID).attr("style","top:-"+(scrollBody.pageHeight*scrollBody.indexNum-scrollBody.pageHeight)+"px");
        }
    })
}
// export {scrollBody}