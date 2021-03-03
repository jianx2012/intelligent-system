import ajax from './ajax'
export default{
    //登录
    reqLogin(username,password){
        return ajax('/login',{username,password},'POST')
    },
    //添加用户
    reqAddUser(data){
        return ajax('/manage/user/add',data,'POST')
    }
}