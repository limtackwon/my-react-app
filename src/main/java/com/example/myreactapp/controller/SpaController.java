package com.example.myreactapp.controller;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * React Router history mode 지원
 * /api/*, 정적 파일(.js/.css 등)을 제외한 모든 요청을 /index.html 로 forward
 */
@Component
public class SpaController implements Filter {

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request  = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        String path = request.getRequestURI();

        boolean isApi    = path.startsWith("/api/");
        boolean isStatic = path.contains(".");

        if (!isApi && !isStatic) {
            request.getRequestDispatcher("/index.html").forward(request, response);
            return;
        }
        chain.doFilter(req, res);
    }
}
