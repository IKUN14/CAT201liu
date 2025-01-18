package com.learning.util;

import javax.servlet.http.HttpServletRequest;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.IOException;

public class JsonUtil {
    public static JSONObject parseRequestJson(HttpServletRequest request) throws IOException {
        StringBuilder sb = new StringBuilder();
        String line;
        try (BufferedReader reader = request.getReader()) {
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        }
        return new JSONObject(sb.toString());
    }
} 