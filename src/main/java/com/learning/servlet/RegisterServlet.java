package com.learning.servlet;

import com.learning.model.User;
import com.learning.util.CSVUtil;
import com.learning.util.JsonUtil;
import org.json.JSONObject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/api/register")
public class RegisterServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        try {
            JSONObject jsonRequest = JsonUtil.parseRequestJson(request);
            String username = jsonRequest.getString("username");
            String email = jsonRequest.getString("email");
            String password = jsonRequest.getString("password");

            if (CSVUtil.emailExists(email)) {
                jsonResponse.put("success", false);
                jsonResponse.put("message", "该邮箱已被注册");
            } else {
                User newUser = new User(username, email, password);
                CSVUtil.saveUser(newUser);
                
                jsonResponse.put("success", true);
                jsonResponse.put("message", "注册成功");
            }
        } catch (Exception e) {
            jsonResponse.put("success", false);
            jsonResponse.put("message", "注册失败: " + e.getMessage());
        }

        out.print(jsonResponse.toString());
        out.flush();
    }
} 