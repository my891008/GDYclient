var PlayLayer = cc.Layer.extend({
      bgSprite:null,
      Players :[],
      positions:[],
      ctor:function (players) {
          this._super();

          this.Players = players;

          var size = cc.winSize;

          var pos =  [size.width / 2, 60];
          this.positions.push(pos);
          pos =  [60, size.height / 2-60];
          this.positions.push(pos);
          pos =  [60, size.height / 2+60];
          this.positions.push(pos);

          pos =  [size.width / 2, size.height-60];
          this.positions.push(pos);

          pos =  [size.width -60, size.height / 2+60];
          this.positions.push(pos);
          pos =  [size.width -60, size.height / 2-60];
          this.positions.push(pos);

          positions=this.positions;
          


          // add bg
          this.bgSprite = new cc.Sprite(res.PlayBG_jpg);
          this.bgSprite.attr({
              x: size.width / 2,
              y: size.height / 2,
              //scale: 0.5,
              rotation: 90
          });
          this.addChild(this.bgSprite, 0);

          console.log(this.bgSprite);

          for (var i = 0;i<this.Players.length;i++) {
              var p= this.positions[(6-this.Players.length+1+i)%6]
              var player = cc.LabelTTF.create(this.Players[i].Name, "Arial", 20);
              player.setPosition(p[0], p[1]);
              this.addChild(player, 1);

              if (uid == this.Players[i].Uid && this.Players[i].IsFZ == 1){
                      //add start menu
                       var startItem = new cc.MenuItemImage(
                               res.StartBtn_png,
                               res.StartBtn_png,
                               function () {
                                    // 发送 进入房间 消息
                                    ws.send(JSON.stringify({GameRequest: {
                                        Roomid:1,
                                        Type :1
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
              }
          }


          return true;
      },
      addClient : function(name) {
        var p= this.positions[posindex];
        var player = cc.LabelTTF.create(name, "Arial", 20);
        player.setPosition(p[0], p[1]);
        this.addChild(player, 1);
        posindex++;
      },
      addPoke : function(val,index,isOthers) {

        if(isOthers){
          for (var i = 0;i<this.Players.length;i++) {
              if (uid != this.Players[i].Uid ){
                 var k = (6-this.Players.length+1+i)%6;
                    var p= this.positions[k];
                    for (var j = 0;j<5;j++) {
                      var sushi = new PokeSprite("../resources/poke/00.jpg");
                      
                      if(k==3){
                          sushi.attr({
                          x: p[0]-j*10,
                          y: p[1],
                          scale:0.4
                        });
                      }else{
                          sushi.attr({
                          x: p[0],
                          y: p[1]-j*10,
                          scale:0.4,
                          rotation: 90
                        });
                      }
                      this.addChild(sushi, 5);
                    }
              }
          }
        }else{
          var sushi = new PokeSprite("../resources/poke/"+val+".jpg");
          //var sushi = new cc.Sprite("#sushi_1n.png");
          var size = cc.winSize;

          var x = (size.width-50*5)/2;

         
          sushi.attr({
            x: x+index*50,
            y: 100,
            scale:0.6
          });
          
          this.addChild(sushi,5);
        }
        
        
        
       /* var dorpAction = cc.MoveTo.create(4, cc.p(sushi.x,-30));
        sushi.runAction(dorpAction);*/
      },
  });

  var PlayScene = cc.Scene.extend({
      Players :[],
      Layers:[],
      onEnter:function () {
          this._super();
          var layer = new PlayLayer(this.Players);
          this.Layers.push(layer);
          this.addChild(layer);
      }
  });