package com.example.demo.controller;


import com.example.demo.dto.ResponseDTO;
import com.example.demo.dto.TodoDTO;
import com.example.demo.model.TodoEntity;
import com.example.demo.service.TodoService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("todo")
public class TodoController {

    @Autowired
    private TodoService service;

    @GetMapping("/test")
    public ResponseEntity<?> testTodo(){
        // service의 testService() 함수를 호출해 제목을 받아옵니다.
        String str = service.testService();

        // 리스트를 생성하고 제목을 저장합니다.
        List<String> list = new ArrayList<>();
        list.add(str);

        // List의 자료형을 String로 설정했기 때문에, String 자료형으로 ResponseDTO의 자료형도 String으로 설정해야 한다.
        ResponseDTO<String> response = ResponseDTO.<String>builder().data(list).build();

        // ResponseDTO을 받아 ResponseEntity를 생성하고 상태를 반환합니다.
        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    public ResponseEntity<?> createTodo(@RequestBody TodoDTO dto) {
        try {
            String RealUserId = "SeYeonPark";

            TodoEntity entity = TodoDTO.toEntity(dto); // dto -> entity
            entity.setId(null); // id를 null로 초기화
            entity.setUserId(RealUserId);
            List<TodoEntity> entities = service.create(entity); // 서비스 계층에 entity 생성 요청
            // entity의 stream을 생성하고 엔티티 리스트를 DTO리스트로 변환
            List<TodoDTO> dtos = entities.stream().map(TodoDTO::new).collect(Collectors.toList());
            // 변환된 TodoDTO 리스트로 ResponseDTO 리스트 초기화
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().data(dtos).build();
            // ResponseDTO 반환
            return ResponseEntity.ok().body(response);

        }catch(Exception e){
            String error = e.getMessage();
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping
    public ResponseEntity<?> retrieveTodoList(){ // list get 하기
        String RealUserId = "SeYeonPark";
        List<TodoEntity> entities = service.retrieve(RealUserId);
        List<TodoDTO> dtos = entities.stream().map(TodoDTO::new).collect(Collectors.toList());
        ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().data(dtos).build();
        return ResponseEntity.ok().body(response);
    }

    @PutMapping
    public ResponseEntity<?> updateTodo(@RequestBody TodoDTO dto){
        String RealUserId = "SeYeonPark";

        TodoEntity entity = TodoDTO.toEntity(dto);
        entity.setUserId(RealUserId);
        List<TodoEntity> entities = service.update(entity);
        List<TodoDTO> dtos = entities.stream().map(TodoDTO::new).collect(Collectors.toList());
        ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().data(dtos).build();
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteTodo(@RequestBody TodoDTO dto){
        try{
            String RealUserId = "SeYeonPark";
            TodoEntity entity = TodoDTO.toEntity(dto);
            entity.setUserId(RealUserId);
            List<TodoEntity> entities = service.delete(entity);
            List<TodoDTO> dtos = entities.stream().map(TodoDTO::new).collect(Collectors.toList());
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().data(dtos).build();

            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            String error = e.getMessage();
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }


}
