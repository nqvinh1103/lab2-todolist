package swt301.lab2.mapper;

import org.springframework.web.bind.annotation.Mapping;
import swt301.lab2.dto.response.ToDoListResponse;
import swt301.lab2.entity.ToDoList;

public interface ToDoListMapper {
    ToDoListResponse toResponse(ToDoList toDoList);
}
