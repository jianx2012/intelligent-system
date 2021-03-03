import store from 'store'
const USER_KEY = 'user_key'
export default{
    //保存用户
    saveUser(user){
        // localStorage.setItem(USER_KEY,JSON.stringify(user))
        store.set(USER_KEY,user)
    },

    //读取用户
    getUser(){
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}') 
        return store.get(USER_KEY) || {}
    },

    //删除用户
    removeUser(){
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    },
}