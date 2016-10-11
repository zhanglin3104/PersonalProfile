//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    p.createGameScene = function () {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var Page1 = new Page(); //页面一
        this.addChild(Page1);
        Page1.touchEnabled = true;
        pagemove(Page1);
        var sky1 = this.createBitmapByName("bg2_jpg");
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky1.width = stageW;
        sky1.height = stageH;
        Page1.addChild(sky1);
        var mainText = new egret.TextField(); //第二页文字主体
        mainText.text = "Ode to the West Wind\n\n\n"
            + "My spirit! Be thou me, impetuous one!\n\n"
            + "Drive my dead thoughts over the universe\n\n"
            + "Like wither'd leaves to quicken a new birth!\n\n"
            + "And, by the incantation of this verse\n\n"
            + "Scatter, as from an unextinguish'd hearth\n\n"
            + "Ashes and sparks, my words among mankind!\n\n"
            + "Be through my lips to unawaken'd earth\n\n"
            + "The trumpet of a prophecy78! Oh Wind,\n\n"
            + "If Winter comes, can Spring be far behind?";
        //mainText.text = "My PersonalProfile";
        mainText.textColor = 0xFFFFFF;
        mainText.alpha = 1;
        mainText.size = 24;
        mainText.x = 100;
        mainText.y = 550;
        //mainText.textAlign = egret.HorizontalAlign.CENTER; 居中
        Page1.addChild(mainText);
        var Page2 = new Page(); //页面二
        this.addChild(Page2);
        Page2.touchEnabled = true;
        pagemove(Page2);
        var sky2 = this.createBitmapByName("bg1_jpg");
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky2.width = stageW;
        sky2.height = stageH;
        Page2.addChild(sky2);
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        Page2.addChild(topMask);
        var icon = this.createBitmapByName("avatar_jpg"); //头像
        this.addChild(icon);
        icon.x = 26;
        icon.y = 43;
        Page2.addChild(icon);
        var line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        Page2.addChild(line);
        var textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;
        var title = new egret.TextField(); //标题
        title.text = "My PersonalProfile";
        title.textColor = 0xFFFFFF;
        title.alpha = 1;
        title.size = 24;
        title.x = 280;
        title.y = 80;
        Page2.addChild(title);
        /* function changescale(icon:egret.Bitmap,sX:number,sY:number):void {
                   var n = 0;
                   icon.anchorOffsetX = icon.width/2;
                   icon.anchorOffsetY = icon.height/2;//改变锚点位置
                   icon.addEventListener( egret.Event.ENTER_FRAME, ( evt:egret.Event )=>{
                   icon.scaleX = icon.scaleY = 0.5*sX + 0.5*sY* Math.abs( Math.sin( n += Main.STEP_SCALE ) );
                   },this);             /// 仅缩放，缩放范围
             }//自身放大缩小
             */
        function pagemove(p) {
            p.addEventListener(egret.TouchEvent.TOUCH_BEGIN, p.mouseDown, p);
            p.addEventListener(egret.TouchEvent.TOUCH_END, p.mouseUp, p);
        } //页面翻动     
        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    p.startAnimation = function (result) {
        var self = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = [];
        for (var i = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }
        var textfield = self.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];
            self.changeDescription(textfield, lineArr);
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, self);
        };
        change();
    };
    /**
     * 切换描述内容
     * Switch to described content
     */
    p.changeDescription = function (textfield, textFlow) {
        textfield.textFlow = textFlow;
    };
    p.createMask = function (x, y, w, h) {
        var Mask = new egret.Shape();
        Mask.graphics.beginFill(0x000000, 0.5);
        Mask.graphics.drawRect(x, y, w, h);
        Mask.graphics.endFill();
        return Mask;
    }; //生成黑框
    /*private createsky(filename:string,w:number,h:number):egret.Bitmap {
        var sky:egret.Bitmap = this.createBitmapByName(filename,0,0,1,1);
        sky.width = w;
        sky.height = h;
        return sky;
    */ //生成页面背景
    p.createText = function (x, y, s) {
        var nomalText = new egret.TextField();
        nomalText.width = this.stage.stageWidth - 172;
        nomalText.textAlign = "left";
        nomalText.bold = true;
        nomalText.fontFamily = "Microsoft YaHei";
        nomalText.x = x;
        nomalText.y = y;
        nomalText.size = s;
        nomalText.cacheAsBitmap = true;
        return nomalText;
    }; //格式化生成文字（具有相同特点）
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
var Page = (function (_super) {
    __extends(Page, _super);
    function Page() {
        _super.apply(this, arguments);
        this._touchStatus = false; //当前触摸状态，按下时，值为true
        this._distance = new egret.Point(); //鼠标点击时，鼠标全局坐标与_bird的位置差
    }
    var d = __define,c=Page,p=c.prototype;
    p.mouseDown = function (evt) {
        this._touchStatus = true;
        this._distance.y = evt.stageY - this.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    };
    p.mouseMove = function (evt) {
        if (this._touchStatus) {
            this.y = evt.stageY - this._distance.y;
            if (this.y < -500) {
                egret.Tween.get(this).to({ x: 0, y: -1136 }, 400, egret.Ease.sineIn)
                    .wait(300).to({ x: 0, y: 0 }, 100, egret.Ease.sineIn);
                this.parent.addChildAt(this, 0);
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }
            if (this.y > 500) {
                egret.Tween.get(this).to({ x: 0, y: -1136 }, 400, egret.Ease.sineIn)
                    .wait(300).to({ x: 0, y: 0 }, 100, egret.Ease.sineIn);
                this.parent.addChildAt(this, 0);
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }
        }
    };
    p.mouseUp = function (evt) {
        this._touchStatus = false;
        if (this.y >= -500) {
            egret.Tween.get(this).to({ x: 0, y: 0 }, 300, egret.Ease.sineIn);
        }
        if (this.y <= 500) {
            egret.Tween.get(this).to({ x: 0, y: 0 }, 300, egret.Ease.sineIn);
        }
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    };
    return Page;
}(egret.DisplayObjectContainer));
egret.registerClass(Page,'Page');
 //页面类
var AnimModes = (function () {
    function AnimModes() {
    }
    var d = __define,c=AnimModes,p=c.prototype;
    AnimModes.Anim_0 = 0;
    AnimModes.Anim_1 = 1;
    return AnimModes;
}());
egret.registerClass(AnimModes,'AnimModes');
 //按钮模式类
//# sourceMappingURL=Main.js.map