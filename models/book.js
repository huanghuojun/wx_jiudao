import { Http } from '../utils/http-promise.js'
class BookModel extends Http {
  getHotList() {
    return this.request({
      url: '/book/hot_list'
    })
  }
  getDetail(bid) {
    var params = {
      url: `/book/${bid}/detail`
    }
    return this.request(params);
  }

  getLikeStatus(bid) {
    var params = {
      url: `/book/${bid}/favor`
    }
    return this.request(params);
  }

  getComments(bid) {
    var params = {
      url: `/comment/${bid}/short_comment`
    }
    return this.request(params);
  }

  getBookCount() {
    var params = {
      url: '/book/favor/count'
    }
    return this.request(params);
  }

  addComments(bid, comment) {
    var params = {
      url: `/comment/add/short_comment`,
      method: 'POST',
      data: {
        book_id: bid,
        content:comment
      }
    }
    return this.request(params);
  }
}
export { BookModel }