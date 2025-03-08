package swt301.lab2.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import swt301.lab2.dto.request.ToDoListRequest;
import swt301.lab2.dto.request.ToDoListUpdateRequest;
import swt301.lab2.dto.response.ToDoListResponse;
import swt301.lab2.entity.ToDoList;
import swt301.lab2.mapper.ToDoListMapper;
import swt301.lab2.repository.ToDoListRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ToDoListService {
    @Autowired
    private ToDoListRepository toDoListRepository;
    @Autowired
    private ToDoListMapper toDoListMapper;

    @Transactional
    public ToDoListResponse create(ToDoListRequest request) {
        ToDoList toDoList = new ToDoList();
        toDoList.setText(request.getText());
        toDoListRepository.save(toDoList);
        ToDoListResponse toDoListResponse = new ToDoListResponse();
        toDoListResponse.setId(toDoList.getId());
        toDoListResponse.setText(toDoList.getText());
        toDoListResponse.setCompleted(toDoList.isCompleted());
        return toDoListResponse;
    }

    public List<ToDoListResponse> getAll() {
        List<ToDoList> toDoList = toDoListRepository.findAll();
        List<ToDoListResponse> listResponses = new ArrayList<>();
        for (ToDoList todo : toDoList) {
            ToDoListResponse toDoListResponse = new ToDoListResponse();
            toDoListResponse.setId(todo.getId());
            toDoListResponse.setText(todo.getText());
            toDoListResponse.setCompleted(todo.isCompleted());
            listResponses.add(toDoListResponse);
        }
        return listResponses;
    }

    @Transactional
    public ToDoListResponse update(int id, ToDoListUpdateRequest request) {
        ToDoList toDoList = toDoListRepository.findById(id).orElseThrow(() -> new RuntimeException("not found"));
        toDoList.setText(request.getText());
        toDoList.setCompleted(request.isCompleted());
        toDoListRepository.save(toDoList);
        ToDoListResponse toDoListResponse = new ToDoListResponse();
        toDoListResponse.setId(toDoList.getId());
        toDoListResponse.setText(toDoList.getText());
        toDoListResponse.setCompleted(toDoList.isCompleted());
        return toDoListResponse;
    }
    @Transactional
    public void delete(int id) {
        ToDoList toDoList = toDoListRepository.findById(id).orElseThrow(() -> new RuntimeException("not found"));
        toDoListRepository.delete(toDoList);
    }
}
