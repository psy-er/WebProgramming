package com.example.demo.service;

import com.example.demo.Repository.TodoRepository;
import com.example.demo.model.TodoEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// 서비스에서 비즈니스 로직 구현
@Slf4j
@Service
public class TodoService {

    @Autowired
    private TodoRepository repository;
    public String testService(){
        TodoEntity entity = TodoEntity.builder().title("My first todo item").build();

        // 엔티티를 리파지토리에 저장
        repository.save(entity); // save 함수는 repository 내장함수이다.
        TodoEntity savedEntity = repository.findById(entity.getId()).get();
        // 'get()'은 조회된 엔티티를 가져오는 메서드입니다. 이는 Optional을 반환합니다
        return savedEntity.getTitle();
        // 엔티티의 모든 속성에 대한 get함수가 생성된다. getTitle을 이용해 제목을 가지고 온다.
    }

    public List<TodoEntity> create(final TodoEntity entity){
        validate(entity); // 데이터가 유효한지 검증
        repository.save(entity); // 엔터티 리파지토리에 저장
        log.info("Entity Id: {} is saved", entity.getId());
        return repository.findByUserId(entity.getUserId()); // 저장된 엔터티 찾아서 리턴
    }

    public List<TodoEntity> retrieve(final String userId){
        return repository.findByUserId(userId); // userId의 엔티티가 리스트로 반환
    }

    public List<TodoEntity> update(final TodoEntity entity){
        validate(entity);
        // 리파지토리에서 ToDoEntity를 가지고 온다.
        final Optional<TodoEntity> original = repository.findById(entity.getId());
        original.ifPresent(todo -> { // 존재하면
            todo.setTitle(entity.getTitle());
            todo.setDone(entity.isDone());
            repository.save(todo); // 값 업데이트 후 저장
        });
        return retrieve(entity.getUserId()); // 모든 Todo리스트 반환
    }

    public List<TodoEntity> delete(final TodoEntity entity){
        validate(entity);
        try{
            repository.delete(entity);
        }catch(Exception e){
            log.error("error deleting entity", entity.getId(), e);
            throw new RuntimeException("error deleting entity" + entity.getId());
        }
        // 새 Todo리스트 가지고 와 리턴
        return retrieve(entity.getUserId());
    }

    public void validate(TodoEntity entity){
        if(entity == null){
            log.warn("Entity cannot be null.");
            throw new RuntimeException("Entity cannot be null.");
        }
        if(entity.getUserId() == null){
            log.warn("Unknown user.");
            throw new RuntimeException("Unknown user.");
        }
    }
}
