package com.example.demo;

import lombok.Builder;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Builder
@RequiredArgsConstructor // 생성자가 자동 생성
public class DemoModel {

    @NonNull // 프로그램 동작하면서 null 안댐
    private String id;
}
