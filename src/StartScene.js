var StartLayer = cc.Layer.extend({
      ctor:function () {
          this._super();
          var size = cc.winSize;
         // var size = cc.director.getWinSize();
         // 
          var bgsprite = cc.Sprite.create(res.BackGround_jpg);
          bgsprite.setPosition(size.width / 2, size.height / 2);
          bgsprite.setScale(0.8);
          this.addChild(bgsprite, 0);


           //add start menu
           var startItem = new cc.MenuItemImage(
                   res.StartBtn_png,
                   res.StartBtn_png,
                   function () {
                        // 发送 进入房间 消息
                        ws.send(JSON.stringify({EnterRoom: {
                            Name: '游客'+uid,
                            Roomid:1,
                            Uid :uid
                        }}));
                   }, this);
           startItem.attr({
               x: size.width -120,
               y: 120,
               anchorX: 0.5,
               anchorY: 0.5,
               scale :0.2
           });

           var menu = new cc.Menu(startItem);
           menu.x = 0;
           menu.y = 0;
           this.addChild(menu, 1);


          return true;
      }
  });

  var StartScene = cc.Scene.extend({
      onEnter:function () {
          this._super();
          var layer = new StartLayer();
          this.addChild(layer);
      }
  });