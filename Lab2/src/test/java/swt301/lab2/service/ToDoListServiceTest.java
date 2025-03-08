package swt301.lab2.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import swt301.lab2.dto.request.ToDoListRequest;
import swt301.lab2.dto.request.ToDoListUpdateRequest;
import swt301.lab2.dto.response.ToDoListResponse;
import swt301.lab2.entity.ToDoList;
import swt301.lab2.mapper.ToDoListMapper;
import swt301.lab2.repository.ToDoListRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class ToDoListServiceTest {

    @Mock
    private ToDoListRepository toDoListRepository;

    @Mock
    private ToDoListMapper toDoListMapper;

    @InjectMocks
    private ToDoListService toDoListService;

    private ToDoList toDoList;
    private ToDoListResponse toDoListResponse;

    @BeforeEach
    void setUp() {
        toDoList = new ToDoList();
        toDoList.setId(1);
        toDoList.setText("Test Todo");
        toDoList.setCompleted(false);

        toDoListResponse = new ToDoListResponse();
        toDoListResponse.setText("Test Todo");
        toDoListResponse.setCompleted(false);
    }

    @Test
    void whenCreateToDoList_thenReturnToDoListResponse() {
        // Given
        ToDoListRequest request = new ToDoListRequest();
        request.setText("Test Todo");

        given(toDoListRepository.save(any(ToDoList.class))).willReturn(toDoList);
        //given(toDoListMapper.toResponse(any(ToDoList.class))).willReturn(toDoListResponse);

        // When
        ToDoListResponse savedTodo = toDoListService.create(request);

        // Then
        assertThat(savedTodo).isNotNull();
        assertThat(savedTodo.getText()).isEqualTo("Test Todo");
        verify(toDoListRepository).save(any(ToDoList.class));
    }

    @Test
    void whenGetAllToDoList_thenReturnToDoListResponseList() {
        // Given
        given(toDoListRepository.findAll()).willReturn(Arrays.asList(toDoList));
        //given(toDoListMapper.toResponse(any(ToDoList.class))).willReturn(toDoListResponse);

        // When
        List<ToDoListResponse> todoList = toDoListService.getAll();

        // Then
        assertThat(todoList).isNotNull();
        assertThat(todoList.size()).isEqualTo(1);
    }

    @Test
    void whenUpdateToDoList_thenReturnUpdatedToDoListResponse() {
        // Given
        ToDoListUpdateRequest request = new ToDoListUpdateRequest();
        request.setText("Updated Todo");
        request.setCompleted(true);

        given(toDoListRepository.findById(1)).willReturn(Optional.of(toDoList));
        given(toDoListRepository.save(any(ToDoList.class))).willReturn(toDoList);
        //given(toDoListMapper.toResponse(any(ToDoList.class))).willReturn(toDoListResponse);

        // When
        ToDoListResponse updatedTodo = toDoListService.update(1, request);

        // Then
        assertThat(updatedTodo).isNotNull();
        verify(toDoListRepository).save(any(ToDoList.class));
    }

    @Test
    void whenDeleteToDoList_thenNothing() {
        // Given
        given(toDoListRepository.findById(1)).willReturn(Optional.of(toDoList));

        // When
        toDoListService.delete(1);

        // Then
        verify(toDoListRepository).delete(toDoList);
    }
}