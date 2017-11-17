// pages/orders/orders.js
Page({
  data: {
    status:['全部','待付款','待成团','待收货','待评价','已完成'],
    status1: [ '待付款', '拼团中', '待收货', '待评价','已完成'], 
    more: [
      [], ['立即付款','取消订单'], ['邀请好友拼团'], [], [], ['再次购买','删除订单']
    ],
    coindex:'0',
  },
  onLoad: function (e) {
    var that = this;
    //设置进入页面内指针
    if(!e.current){
      that.setData({
        current:0
      })
    }else{
      var current = parseInt(e.current);
      that.setData({
        current: current,
      })
    }
    //请求所有订单
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/user/getOrder',
      data: { user_id: getApp().globalData.userid ,admin_user_id:getApp().globalData.shopId},
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        that.setData({
          order:res.data,
        })

        /*
          0:未支付
          1:待成团
          2:待收货
          3:待评价
         */
        //控制每个swiper-item长度,确认高度
        var order = that.data.order;
        var sta1 = 0, sta2 = 0, sta3 = 0, sta4 = 0, sta5 = 0;
        var length = [];
        order.forEach(function (val, index) {
          switch (val.status) {
            case '0':
              sta1++;
              break;
            case '1':
              sta2++;
              break;
            case '2':
              sta3++;
              break;
            case '3':
              sta4++;
              break;
            case '4':
              sta5++;
              break;
            default:
              break;
          }
        })
        length.push(order.length * 443 + 80, sta1 * 443 + 80, sta2 * 443 + 80, sta3 * 443 + 80, sta4 * 443 + 80, sta5 * 443 + 80);
        //获得每个item高度
        that.setData({
          height: length,
          heightCurrent: '0',
        })
      },
    })
  },
  //上方banner导航栏,点击切换
  nav:function(e){
    var navIndex = e.currentTarget.dataset.index;
    var coindex = this.data.coindex;
    if(navIndex>coindex){
      this.setData({
        navPos:'120rpx',
        heightCurrent:navIndex,
      })
    }else{
      this.setData({
        navPos: '-120rpx',
        heightCurrent: navIndex,        
      })
    }
    this.setData({
      current:navIndex,
      coindex:navIndex,
    })
  },
  //轮播图滑动切换,逆向数据渲染
  swiper:function(e){
    var that = this;
    var swiperCurrent = e.detail.current;
    setTimeout(function(){
      that.setData({
        current: swiperCurrent,
        heightCurrent:swiperCurrent,
      })
    },200)
  }
})