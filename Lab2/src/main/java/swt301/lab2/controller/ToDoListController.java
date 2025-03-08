package swt301.lab2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import swt301.lab2.dto.request.ToDoListRequest;
import swt301.lab2.dto.request.ToDoListUpdateRequest;
import swt301.lab2.dto.response.ToDoListResponse;
import swt301.lab2.service.ToDoListService;

import java.util.List;

@RestController
@RequestMapping("/list")
public class ToDoListController {
    @Autowired
    private ToDoListService toDoListService;

    @PostMapping()
    private ResponseEntity<ToDoListResponse> create (@RequestBody ToDoListRequest request) {
        var result = toDoListService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @GetMapping()
    private ResponseEntity<List<ToDoListResponse>> getAll() {
        var result = toDoListService.getAll();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PutMapping("/{id}")
    private ResponseEntity<ToDoListResponse> update(@PathVariable int id, @RequestBody ToDoListUpdateRequest request) {
        try {
            var result = toDoListService.update(id, request);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (Exception e) {
            if (e.getMessage().contains("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            throw e;
        }
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<Object> delete(@PathVariable int id) {
        try {
            toDoListService.delete(id);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } catch (Exception e) {
            if (e.getMessage().contains("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            throw e;
        }
    }



}
