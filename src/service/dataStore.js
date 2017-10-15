import fetchApi from 'src/service/fetchApi'
import eventHub from 'src/eventHub'
import {ERRORMSG_SHOW} from 'src/constants/events'

function basicFetch (method) {
  return function (url, config = {}) {
    return function (params) {
      return new Promise((resolve, reject) => {
        fetchApi[method](url, params, config).then(
          data => {
            resolve(data.data)
          },
          data => {
            errorInfo(config.infoType, data)
            reject(data)
          }
        )
      })
    }
  }
}

class ErrMsgProcessor {
  constructor (msgType) {
    this.stack = []
    this.msgType = msgType
  }

  add (data, infoType) {
    const isSameTypeExist = this.stack.some(item => data.code === item.code)
    if (!isSameTypeExist) {
      this.stack.push({
        data,
        infoType
      })
    }
  }

  emit () {
    for (let i = 0; i < this.stack.length; i++) {
      eventHub.$emit(this.msgType, this.stack.shift())
    }
  }
}

const msgProcessor = new ErrMsgProcessor(ERRORMSG_SHOW)

function errorInfo (infoType, data) {
  msgProcessor.add(data, infoType)
  setTimeout(msgProcessor.emit.bind(msgProcessor), 500)
}

const context = '/test'
const basicGet = basicFetch('get')
// const basicPost = basicFetch('post')
// const basicPut = basicFetch('put')
// const basicDelete = basicFetch('delete')

export default {
  getMenus: basicGet(`${context}/menus/tree`)
}
