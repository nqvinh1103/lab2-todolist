package swt301.lab2.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import swt301.lab2.dto.request.ToDoListRequest;
import swt301.lab2.dto.request.ToDoListUpdateRequest;
import swt301.lab2.dto.response.ToDoListResponse;
import swt301.lab2.service.ToDoListService;

import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class ToDoListControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ToDoListService toDoListService;

    @InjectMocks
    private ToDoListController toDoListController;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(toDoListController).build();
    }

    @Test
    void whenCreateToDoList_thenReturnCreated() throws Exception {
        // Given
        ToDoListRequest request = new ToDoListRequest();
        request.setText("Test Todo");

        ToDoListResponse response = new ToDoListResponse();
        response.setText("Test Todo");
        response.setCompleted(false);

        given(toDoListService.create(any(ToDoListRequest.class))).willReturn(response);

        // When & Then
        mockMvc.perform(post("/list")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.text").value("Test Todo"))
                .andExpect(jsonPath("$.completed").value(false));
    }

    @Test
    void whenGetAllToDoList_thenReturnList() throws Exception {
        // Given
        ToDoListResponse response = new ToDoListResponse();
        response.setText("Test Todo");
        response.setCompleted(false);

        given(toDoListService.getAll()).willReturn(Arrays.asList(response));

        // When & Then
        mockMvc.perform(get("/list"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].text").value("Test Todo"))
                .andExpect(jsonPath("$[0].completed").value(false));
    }

    @Test
    void whenUpdateToDoList_thenReturnUpdated() throws Exception {
        // Given
        ToDoListUpdateRequest request = new ToDoListUpdateRequest();
        request.setText("Updated Todo");
        request.setCompleted(true);

        ToDoListResponse response = new ToDoListResponse();
        response.setText("Updated Todo");
        response.setCompleted(true);

        given(toDoListService.update(eq(1), any(ToDoListUpdateRequest.class))).willReturn(response);

        // When & Then
        mockMvc.perform(put("/list/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.text").value("Updated Todo"))
                .andExpect(jsonPath("$.completed").value(true));
    }

    @Test
    void whenDeleteToDoList_thenReturnNoContent() throws Exception {
        // Given
        doNothing().when(toDoListService).delete(1);

        // When & Then
        mockMvc.perform(delete("/list/1"))
                .andExpect(status().isOk());
    }

    @Test
    void whenUpdateNonExistingToDoList_thenReturnNotFound() throws Exception {
        // Given
        ToDoListUpdateRequest request = new ToDoListUpdateRequest();
        request.setText("Updated Todo");

        given(toDoListService.update(eq(999), any(ToDoListUpdateRequest.class)))
                .willThrow(new RuntimeException("not found"));

        // When & Then
        mockMvc.perform(put("/list/999")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound());
    }
} 