// pages/bindgroup/bindgroup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isbind:0,
    applea:[
      {img:'/pages/source/images/error-red.png',title:'审核未通过',info:'经审核您并非本群群主',color:'#ff0100'},
      { img: '/pages/source/images/passed.png', title: '审核已通过', info: '您可以在重新在在群内打开页面进行群主绑定', color: '#38adff' },
      { img: '/pages/source/images/ing.png', title: '正在审核中', info: '你提交的申诉正在审核', color: '#999' },
    ],
    status:2,
    appleaing:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  isModel:function(){
    var that = this;
    that.setData({
      isModel:1
    })
  },
  close:function(){
    this.setData({
      isModel:0
    })
  }
})