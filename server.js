const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const context = '/test'
// get menulist

app.get(`${context}/menus/tree`, (req, res) => {
  const menus = [{
    name: '发行人',
    'id': 1,
    'leaf': '1',
    'parentId': null,
    'url': '/issuer'
  }, {
    'name': '公司债券',
    'id': 2,
    'leaf': '1',
    'parentId': null,
    'url': '/bond'
  }, {
    'name': '信用评级',
    'id': 3,
    'leaf': '1',
    'parentId': null,
    'url': '/credit'
  }, {
    'name': '风险监测',
    'id': 4,
    'leaf': '1',
    'parentId': null,
    'url': '/risk_rating'
  }, {
    'name': '风险分类核查',
    'id': 5,
    'leaf': '1',
    'parentId': null,
    'url': '/risk_review'
  }, {
    'name': '风险分类核查表',
    'id': 12,
    'leaf': '1',
    'parentId': null,
    'url': '/risk_summary'
  }, {
    'children': [{
      'name': '部门报告',
      'id': 14,
      'leaf': '1',
      'parentId': 13,
      'url': '/department_report'
    }, {
      'name': '公司报告',
      'id': 15,
      'leaf': '1',
      'parentId': 13,
      'url': '/company_report'
    }],
    'name': '报告管理',
    'id': 13,
    'leaf': '0',
    'parentId': null,
    'url': null
  }, {
    'name': '个人管理',
    'id': 17,
    'leaf': '1',
    'parentId': null,
    'url': '/account_manage'
  }, {
    'children': [{
      'name': '人员管理',
      'id': 10,
      'leaf': '1',
      'parentId': 6,
      'url': '/staff_manage'
    }, {
      'name': '部门管理',
      'id': 11,
      'leaf': '1',
      'parentId': 6,
      'url': '/department_manage'
    }, {
      'name': '系统时间管理',
      'id': 16,
      'leaf': '1',
      'parentId': 6,
      'url':
      '/system_setting'
    }],
    'name': '系统管理',
    'id': 6,
    'leaf': '0',
    'parentId': null,
    'url': null
  }]

  res.send({
    status: 200,
    data: menus
  })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Internal error in node server!')
})

app.listen('8081', '127.0.0.1', () => {
  console.log('server is listening on 127.0.0.1:8081')
})
