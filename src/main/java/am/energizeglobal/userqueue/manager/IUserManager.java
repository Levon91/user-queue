package am.energizeglobal.userqueue.manager;

import am.energizeglobal.userqueue.model.User;

import java.util.Set;

public interface IUserManager {

    User addUser(User user);

    Set<User> getAllUsers();

    boolean removeUserById(long id);

    User getUserById(long id);
}
