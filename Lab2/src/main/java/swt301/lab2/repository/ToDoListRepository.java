package swt301.lab2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swt301.lab2.entity.ToDoList;

@Repository
public interface ToDoListRepository extends JpaRepository<ToDoList, Integer> {
}
