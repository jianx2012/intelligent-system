import ajax from './ajax'
const BASE = ''
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    //登录
    reqLogin(username, password) {
        return ajax(BASE + '/login', { username, password }, 'POST')
    },
    //添加用户
    reqAddUser(data) {
        return ajax(BASE + '/manage/user/add', data, 'POST')
    },

    //获取分类的列表
    reqCategorys(parentId) {
        return ajax(BASE + '/manage/category/list', { parentId })
    },

    //添加分类
    reqAddCategory(parentId, categoryName) {
        return ajax(BASE + '/manage/category/add', { parentId, categoryName }, 'POST')
    },

    //更新分类
    reqUpdateCategory({ categoryId, categoryName }) {
        return ajax(BASE + '/manage/category/update', { categoryId, categoryName }, 'POST')
    },

    // 获取商品分页列表
    reqProducts(pageNum, pageSize) {
        return ajax(BASE + '/manage/product/list', { pageNum, pageSize })
    },

    /*
    搜索商品分页列表 (根据商品名称/商品描述)
    searchType: 搜索的类型, productName/productDesc
    */
    reqSearchProducts({ pageNum, pageSize, searchName, searchType }) {
        return ajax(BASE + '/manage/product/search', {
            pageNum,
            pageSize,
            [searchType]: searchName,
        })
    },
    // 更新商品的状态(上架/下架)
    reqUpdateStatus(productId, status) {
        return ajax(BASE + '/manage/product/updateStatus', { productId, status }, 'POST')
    },




    //添加审批表单
    reqAddwork(params) {
        return ajax(BASE + '/manage/workspeace/add', { workspeace: params }, 'POST')
    },
    //更新审批表
    reqUpdateWork( params ) {
        return ajax(BASE + '/manage/workspeace/update', { ...params }, 'POST')
    },
    //更新审批表
    reqUpdateList(params ) {
        return ajax(BASE + '/manage/listPage/update', { ...params }, 'POST')
    },
    // 获取审批中心分页列表
    reqworkList() {
        return ajax(BASE + '/manage/workspeace/list', { pageNum: 1, pageSize: 10 })
    },

    //获取审批详情
    reqworkDetails(id) {
        return ajax(BASE + '/manage/workspeace/details', { id })
    },


    //添加列表表单
    reqAddlistPage(params) {
        return ajax(BASE + '/manage/listPage/add', { workspeace: params }, 'POST')
    },

    // 获取列表
    reqlistPage() {
        return ajax(BASE + '/manage/listPage/list', { pageNum: 1, pageSize: 10 })
    },

    //获取列表详情
    reqlistPageDetails(id) {
        return ajax(BASE + '/manage/listPage/details', { id })
    },


    //添加审批项目
    reqAddapproval(params) {
        return ajax(BASE + '/manage/approval/add', { approval: params }, 'POST')
    },
    //查询审批项列表
    reqApprovalList(id) {
        return ajax(BASE + '/manage/approval/details', { id })
    },
    // 更新审批项的状态
    reqUpdateStatus(params) {
        return ajax(BASE + '/manage/approval/update', { ...params }, 'POST')
    },
    // 查询
    reqSearchWork({ pageNum, pageSize, searchName, searchType }) {
        return ajax(BASE + '/manage/workspeace/search', {
            pageNum,
            pageSize,
            [searchType]: searchName,
        })
    },
    // 查询
    reqSearchList({ pageNum, pageSize, searchName, searchType }) {
        return ajax(BASE + '/manage/listPage/search', {
            pageNum,
            pageSize,
            [searchType]: searchName,
        })
    },
    //新增公告
    reqAddAnnouncement(params) {
        return ajax(BASE + '/manage/announcement/add', { params }, 'POST')
    },
    //查询公告列表
    reqAnnouncementList() {
        return ajax(BASE + '/manage/announcement/list', { pageNum: 1, pageSize: 10 })
    },
    //获取公告详情
    reqAnnouncementDetails(id) {
        return ajax(BASE + '/manage/announcement/details', { id })
    },
    // 更新公告的状态
    reqUpdateAnnounce(params) {
        return ajax(BASE + '/manage/announcement/update', { ...params }, 'POST')
    },
    // 删除公告的状态
    reqDeleteAnnounce(params) {
        return ajax(BASE + '/manage/announcement/delete', { ...params }, 'POST')
    },
    // 获取所有角色的列表
    reqRoles() {
        return ajax(BASE + '/manage/role/list')
    },
    // 添加角色
    reqAddRole(roleName) {
        return ajax(BASE + '/manage/role/add', { roleName }, 'POST')
    },
    // 获取所有用户的列表
    reqUsers() {
        return ajax(BASE + '/manage/user/list')
    },
    // 删除指定用户
    reqDeleteUser(userId) {
        return ajax(BASE + '/manage/user/delete', { userId }, 'POST')
    },
    //添加用户
    reqAddUser(user) {
        return ajax(BASE + '/manage/user/add', user, 'POST')
    },
    //编辑用户
    reqUpdateUser(user) {
        return ajax(BASE + '/manage/user/update', user, 'POST')
    },
}