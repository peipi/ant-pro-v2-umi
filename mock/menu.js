
const menuData = [
  {
    path: "/home",
    name: "首页",
    authority:undefined
  },
  {
    path: "/dashboard",
    name: "仪表板",
    Routes: ['src/pages/Authorized'],
    authority:['admin'],
    children: [
      {
        path: "/dashboard/analysis",
        name: "分析页",
        authority:['admin'],

      },
      {
        path: "/dashboard/monitor",
        name: "监控页",
        authority:['admin'],
      },
      {
        path: "/dashboard/workplace",
        name: "工作台",
        authority:['admin'],
      },
      
    ]
  },
  {
    path: "/todo",
    name: "测试",
    authority:['user'],
    children: [
      {
        path: "/todo/todolist",
        name: "测试页面",
        authority:['user'],
      },
    ]
  },
 
];

export default {
    'GET /api/getMenuData': menuData,
}