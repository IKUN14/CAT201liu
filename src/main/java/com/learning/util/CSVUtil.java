package com.learning.util;

import com.learning.model.User;
import java.io.*;
import java.nio.file.*;
import java.util.*;

public class CSVUtil {
    private static final String CSV_FILE = "src/main/resources/users.csv";
    
    public static void saveUser(User user) throws IOException {
        String line = String.format("%s,%s,%s%n", 
            user.getUsername(), 
            user.getEmail(), 
            user.getPassword()
        );
        Files.write(
            Paths.get(CSV_FILE), 
            line.getBytes(), 
            StandardOpenOption.CREATE, 
            StandardOpenOption.APPEND
        );
    }
    
    public static User findUserByEmail(String email) throws IOException {
        List<String> lines = Files.readAllLines(Paths.get(CSV_FILE));
        for (String line : lines) {
            String[] parts = line.split(",");
            if (parts.length == 3 && parts[1].equals(email)) {
                return new User(parts[0], parts[1], parts[2]);
            }
        }
        return null;
    }
    
    public static boolean emailExists(String email) throws IOException {
        return findUserByEmail(email) != null;
    }
} 