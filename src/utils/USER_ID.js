// 利用uuid生成未登录用户临时标志服
import { v4 as uuid4 } from 'uuid';
// 封装函数：只能生成一次临时用户身份
let userId;
export const SET_USERID = () => {
    userId = localStorage.getItem('USERTEMPID');
    if (!userId) {
        userId = uuid4();
        localStorage.setItem('USERTEMPID', userId)
    }
    // 一定要有返回值
    return userId
}