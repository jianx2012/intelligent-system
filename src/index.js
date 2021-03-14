/*
入口js
*/
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react';
import * as stores from './config/Stores';
import App from './App'
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'
// 设置全局app对象
window.app = { stores };
const user = storageUtils.getUser()
memoryUtils.user = user

ReactDOM.render(<Provider {...stores}><App/></Provider>,document.getElementById('root'))