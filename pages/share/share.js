// pages/start/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    joiner: '3',
    userheader: '/pages/source/images/detail1.jpg',
    childItem: [
    ],  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    console.log(e)
    if(e.share=='1'){
      that.setData({
        tip:'邀请好友参加团',
        share_type:'share'
      })
    }else if(e.share=='2'){
      that.setData({
        tip:'立即参加拼团',
        share_type:'none'
      })
    }else{
      that.setData({
        tip: '一键参团',
        share_type: 'none'
      })      
    }
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/product/getIdCart',
      data: { cart_id: 1619},
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: function (res) {
        console.log(res)
        that.setData({
          item:res.data.rows[0]
        })
      },
      complete:function(){
        wx.request({
          url: 'https://xcx.bjletusq.com/index.php/home/product/index',
          method: 'POST',
          data: { admin_user_id: getApp().globalData.shopId },
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          success: function (res) {
            that.setData({
              childItem: res.data,
            })
          },
        })
      }
    })
    //倒计时
    var endtimeStamp = 1510912400;
    var endtime = new Date().getTime();
    //剩余时间 秒
    var leftsecond = (endtimeStamp*1000-endtime)/1000;
    var d = parseInt(leftsecond / 3600 / 24);
    var h = parseInt((leftsecond / 3600) % 24);
    var m = parseInt((leftsecond / 60) % 60);
    var s = parseInt(leftsecond % 60);
    function isDouble(num){
      return num<10?'0'+num:num
    }
    that.setData({
      day: d,
      hour: isDouble(h),
      minute: isDouble(m),
      second: isDouble(s)
    })
    setInterval(function(){
      leftsecond--;
      var d = parseInt(leftsecond / 3600 / 24);
      var h = parseInt((leftsecond / 3600) % 24);
      var m = parseInt((leftsecond / 60) % 60);
      var s = parseInt(leftsecond % 60);
      that.setData({
        day: d,
        hour: isDouble(h),
        minute: isDouble(m),
        second: isDouble(s)
      })
    },1000)
  },
  onShow: function () {
    this.setData({
      tip: '立即参加拼团',
      share_type: ' '
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    if (that.data.share_type=='share'){
      return {
        title: '参与我的拼团',
        path: '/pages/start/start?cart_id=' + this.data.cart_id + '&uesr_id=' + userid
      }
    }else{
      return false;
    }
  }
})