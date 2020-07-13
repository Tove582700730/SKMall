package com.qianfeng.controller;

import com.qianfeng.pojo.Users;
import com.qianfeng.service.UserService;
import com.qianfeng.util.ResultVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/regist")
    public ResultVo regist(@RequestBody Users users){
        ResultVo resultVo = userService.regist(users);
        return resultVo;
    }
    @RequestMapping("/login")
    public ResultVo login(@RequestBody Users users, HttpSession session){
        ResultVo resultVo = userService.login(users,session);
        return resultVo;
    }
    @RequestMapping("/exit")
    public ResultVo exit(HttpSession session){
        session.removeAttribute("loginUser");
        return ResultVo.success("退出成功");
    }

    @RequestMapping("/check")
    public ResultVo check(HttpSession session){
        Users loginUser = (Users) session.getAttribute("loginUser");
        if(loginUser==null){
            return ResultVo.error("未登录");
        }else{
            return ResultVo.success("登录成功");
        }
    }
}
