import fetch from 'isomorphic-fetch'
import apiDomain from 'src/constants/apiDomain'
import {isNull, isUndefined, isArray, isObject, forEach, forOwn} from 'lodash'
require('es6-promise').polyfill()

function serialize (params) {
  const parts = []
  forOwn(params, function (value, key) {
    if (isNull(value) || isUndefined(value)) return
    const valueList = !isArray(value) ? [value] : value
    forEach(valueList, function (v) {
      const valueStr = isObject(v) ? JSON.stringify(v) : v
      parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(valueStr))
    })
  })
  return parts.join('&')
}

function buildUrl (url, serializedParams) {
  let newUrl = url
  if (serializedParams.length) {
    newUrl += (newUrl.indexOf('?') === -1) ? '?' : '&'
    newUrl += serializedParams
  }
  return newUrl
}

function basicConfig (params) {
  return {
    credentials: 'include',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }
}

function genFetchJSONPromise (url, config) {
  return new Promise((resolve, reject) => {
    fetch(url, config).then(response => {
      if (response.ok && response.status >= 200 && response.status < 300) {
        resolve(response.json())
      } else {
        response.text().then(data => {
          let res = {}
          try {
            res = JSON.parse(data)
          } catch (e) {
            res = {'description': '网络错误'}
          }
          reject(res)
        })
      }
    })
  })
}

const fetchApi = {
  get (url, params, config = {}) {
    const domainUrl = `${apiDomain}${url}`
    const finalUrl = isUndefined(params) ? domainUrl : buildUrl(domainUrl, serialize(params))
    const headers = {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
    return genFetchJSONPromise(finalUrl, Object.assign({
      headers,
      method: 'GET',
      credentials: 'include'
    }, config))
  },
  post (url, params, config = {}) {
    const finalUrl = `${apiDomain}${url}`
    return genFetchJSONPromise(finalUrl, Object.assign({method: 'POST'}, basicConfig(params), config))
  },
  put (url, params, config = {}) {
    const finalUrl = `${apiDomain}${url}`
    return genFetchJSONPromise(finalUrl, Object.assign({method: 'PUT'}, basicConfig(params), config))
  },
  delete (url, params, config = {}) {
    const finalUrl = `${apiDomain}${url}`
    return genFetchJSONPromise(finalUrl, Object.assign({method: 'DELETE'}, basicConfig(params), config))
  }
}

export default fetchApi
