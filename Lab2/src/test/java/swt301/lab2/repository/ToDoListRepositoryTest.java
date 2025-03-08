package swt301.lab2.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import swt301.lab2.entity.ToDoList;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class ToDoListRepositoryTest {

    @Autowired
    private ToDoListRepository toDoListRepository;

    @Test
    void whenSaveToDoList_thenReturnSavedToDoList() {
        // Given
        ToDoList toDoList = new ToDoList();
        toDoList.setText("Test Todo");
        toDoList.setCompleted(false);

        // When
        ToDoList savedTodoList = toDoListRepository.save(toDoList);

        // Then
        assertThat(savedTodoList).isNotNull();
        assertThat(savedTodoList.getId()).isGreaterThan(0);
        assertThat(savedTodoList.getText()).isEqualTo("Test Todo");
        assertThat(savedTodoList.isCompleted()).isFalse();
    }

    @Test
    void whenFindById_thenReturnToDoList() {
        // Given
        ToDoList toDoList = new ToDoList();
        toDoList.setText("Test Todo");
        toDoList.setCompleted(false);
        ToDoList savedTodoList = toDoListRepository.save(toDoList);

        // When
        ToDoList foundTodoList = toDoListRepository.findById(savedTodoList.getId()).orElse(null);

        // Then
        assertThat(foundTodoList).isNotNull();
        assertThat(foundTodoList.getText()).isEqualTo("Test Todo");
    }

    @Test
    void whenDeleteById_thenToDoListShouldNotExist() {
        // Given
        ToDoList toDoList = new ToDoList();
        toDoList.setText("Test Todo");
        ToDoList savedTodoList = toDoListRepository.save(toDoList);

        // When
        toDoListRepository.deleteById(savedTodoList.getId());

        // Then
        assertThat(toDoListRepository.findById(savedTodoList.getId())).isEmpty();
    }
} 