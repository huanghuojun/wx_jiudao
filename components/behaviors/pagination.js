const pageinationBev = Behavior({
  data:{
    dataArray:[],
    pageNum:1,
    pages:0,
    loading: false,
    nullResult:false,
  },
  methods:{
    setNewData(data) {
      if (!data){
        return;
      }
      const tempArray = this.data.dataArray.concat(data.list);
      if(tempArray.length == 0){
        this.setData({
          nullResult: true,
        })
      }else{
        this.setData({
          nullResult:false,
        })
      }
      this.setData({
        dataArray: tempArray,
        pageNum: data.pageNum,
        pages: data.pages,
      })
    },

    initialize(){
      this.setData({
        dataArray:[],
        nullResult: false,
      })
      // this.data.dataArray = []
      this.data.pageNum = 1
    },

    getCurrentIndex(){
      return this.data.pageNum;
    },

    hasMore(){
      if(this.data.pageNum >= this.data.pages){
        return false;
      }
      return true;
    },
    
    isLocked() {
      return this.data.loading ? true : false;
    },

    locked() {
      this.setData({
        loading: true,
      })
      // this.data.loading = true
    },

    unLocked() {
      this.setData({
        loading: false,
      })
      // this.data.loading = false
    }
  }
})

export { pageinationBev }