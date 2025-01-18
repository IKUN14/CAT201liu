package com.learning.servlet;

import com.learning.model.User;
import com.learning.util.CSVUtil;
import com.learning.util.JsonUtil;
import org.json.JSONObject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/api/login")
public class LoginServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        try {
            JSONObject jsonRequest = JsonUtil.parseRequestJson(request);
            String email = jsonRequest.getString("email");
            String password = jsonRequest.getString("password");

            User user = CSVUtil.findUserByEmail(email);
            
            if (user != null && user.getPassword().equals(password)) {
                // 创建session
                HttpSession session = request.getSession();
                session.setAttribute("user", user);
                
                jsonResponse.put("success", true);
                jsonResponse.put("message", "登录成功");
                jsonResponse.put("username", user.getUsername());
            } else {
                jsonResponse.put("success", false);
                jsonResponse.put("message", "邮箱或密码错误");
            }
        } catch (Exception e) {
            jsonResponse.put("success", false);
            jsonResponse.put("message", "登录失败: " + e.getMessage());
        }

        out.print(jsonResponse.toString());
        out.flush();
    }
} 