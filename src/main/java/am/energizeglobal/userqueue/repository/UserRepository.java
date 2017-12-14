package am.energizeglobal.userqueue.repository;

import am.energizeglobal.userqueue.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface UserRepository extends CrudRepository<User, Integer> {

    User save(User user);

    Set<User> findAll();

    User findTopByOrderByIdDesc();

    int deleteById(long id);

}
