package com.qianfeng.service;

import com.qianfeng.pojo.Users;
import com.qianfeng.util.ResultVo;

import javax.servlet.http.HttpSession;

public interface UserService {

    /**
     * 注册
     * @param users
     * @return
     */
    ResultVo regist(Users users);

    /**
     * 登录
     * @param users
     * @return
     */
    ResultVo login(Users users,HttpSession session);
}
