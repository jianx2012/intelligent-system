//配置菜单
const menuList = [
    {
        title: '首页', // 菜单标题名称
        key: '/home', // 对应的 path
        icon: 'iconhome', // 图标名称
    },
    {
        title: '权限',
        key: '/asset',
        icon: 'iconuser',
        children: [ // 子菜单列表
            {
                title: '用户管理',
                key: '/asset/user',
                // icon: 'bars'
            },
            {
                title: '角色管理',
                key: '/asset/role',
                // icon: 'tool'
            },
        ]
    },
    {
        title: '公告',
        key: '/category',
        icon: 'iconsound'
    },
    {
        title: '列表库',
        key: '/product',
        icon: 'iconlayers',
    },
    {
        title: '文件库',
        key: '/product1',
        icon: 'iconfolder-close',
    },
]
export default menuList