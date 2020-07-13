package com.qianfeng.service;

import com.qianfeng.dao.UsersMapper;
import com.qianfeng.pojo.Users;
import com.qianfeng.util.Md5Util;
import com.qianfeng.util.ResultVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UsersMapper usersMapper;

    @Override
    public ResultVo regist(Users users) {
        //先根据username查询，数据库是否存在此用户
        Users getUser = usersMapper.getUserByName(users);
        if(getUser!=null){
            //返回手机号已被使用，请重新注册
            return ResultVo.error("手机号已被使用，请重新注册");
        }else{
            users.setPassword(Md5Util.secret(users.getUsername(), users.getPassword()));
            //插入到数据库
            usersMapper.regist(users);
            return ResultVo.success("注册成功");
        }
    }

    @Override
    public ResultVo login(Users users,HttpSession session) {
        //登录校验
        Users selectUser = usersMapper.getUserByName(users);
        if(selectUser==null || !selectUser.getPassword().equals(Md5Util.secret(users.getUsername(), users.getPassword()))){
            return ResultVo.error("账号或者密码输入错误，请重新输入");
        }else{
            //将登录之后的用户信息存放到session中
            session.setAttribute("loginUser",selectUser);
            return ResultVo.success("登录成功",selectUser);
        }
    }
}
