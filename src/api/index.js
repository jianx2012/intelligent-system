import ajax from './ajax'
const BASE = ''
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
    reqSearchProducts({ pageNum, pageSize, searchName, searchType }){
        return ajax(BASE + '/manage/product/search', {
        pageNum,
        pageSize,
        [searchType]: searchName,
    })
    },
    // 更新商品的状态(上架/下架)
    reqUpdateStatus(productId, status) {
        return ajax(BASE + '/manage/product/updateStatus', { productId, status }, 'POST')
    }
}