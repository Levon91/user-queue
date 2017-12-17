package am.energizeglobal.userqueue.repository;

import am.energizeglobal.userqueue.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface UserRepository extends CrudRepository<User, Integer> {

    User save(User user);

    User findById(long id);

    User findById(long id);

    User findTopByOrderByIdDesc();

    @Query("SELECT u FROM User u WHERE u.id = (SELECT MIN(u.id) FROM User u WHERE u.id > :uid)")
    User findNextRecord(@Param(value = "uid") long id);

    Set<User> findAll();

    int deleteById(long id);

}
