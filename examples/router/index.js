
const routes = [
  {
    path: '/',
    component: () => import('../views/Layout/src'),
    redirect: '/form',
    children: [
      {
        path: '/form',
        name: 'Form',
        component: () => import('../views/form'),
        meta: { title: '表单' }
      },
      {
        path: '/input-number',
        name: 'InputNumber',
        component: () => import('../views/input-number'),
        meta: { title: '数字输入框' }
      },
      {
        path: '/upload',
        name: 'Upload',
        component: () => import('../views/upload'),
        meta: { title: '文件上传' }
      },
      {
        path: '/table',
        name: 'Table',
        component: () => import('../views/table'),
        meta: { title: '表格' }
      },
      {
        path: '/table-pro',
        name: 'TablePro',
        component: () => import('../views/table-pro'),
        meta: { title: '高级表格' }
      },
      {
        path: '/cascader',
        name: 'Cascader',
        component: () => import('../views/cascader'),
        meta: { title: '级联选择器' }
      }
    ]
  }

]

module.exports = routes

