package com.example.demo.Repository;

import com.example.demo.model.TodoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<TodoEntity, String> {

    // JpaRepository에서는 findById 메서드를 자동 제공한다.
    List<TodoEntity> findByUserId(String userId);

}
