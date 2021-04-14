import axios from "axios";
import {message} from 'antd';
export default function ajax(url, data={},type='GET'){
    //执行异步ajax请求
    return new Promise((resolve,reject)=>{
        let promise
        if(type === 'GET'){ //发送GET请求
            promise = axios.get(url, {
                params:data
            })
        }else{
            promise = axios.post(url,data)
        }
        promise.then(response =>{
            resolve(response.data)
        }).catch(error=>{
            message.error('请求错误：'+ error)
        })
    })

}

// ajax('/login',{username:'Tom',password:'123'},'POST').then()