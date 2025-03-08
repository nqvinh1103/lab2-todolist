package swt301.lab2.mapper;

import org.springframework.stereotype.Component;
import swt301.lab2.dto.response.ToDoListResponse;
import swt301.lab2.entity.ToDoList;

@Component
public class ToDoListMapperImpl implements ToDoListMapper {
    @Override
    public ToDoListResponse toResponse(ToDoList toDoList) {
        ToDoListResponse response = new ToDoListResponse();
        response.setText(toDoList.getText());
        response.setCompleted(toDoList.isCompleted());
        return response;
    }
} 