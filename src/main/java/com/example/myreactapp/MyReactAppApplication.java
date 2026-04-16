package com.example.myreactapp;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyReactAppApplication {

    public static void main(String[] args) {
        // .env 파일이 있으면 시스템 프로퍼티로 주입 (Spring 시작 전)
        // 이미 설정된 환경변수(Render 등)는 덮어쓰지 않음
        Dotenv.configure()
              .ignoreIfMissing()
              .load()
              .entries()
              .forEach(e -> {
                  if (System.getProperty(e.getKey()) == null
                          && System.getenv(e.getKey()) == null) {
                      System.setProperty(e.getKey(), e.getValue());
                  }
              });

        SpringApplication.run(MyReactAppApplication.class, args);
    }
}
