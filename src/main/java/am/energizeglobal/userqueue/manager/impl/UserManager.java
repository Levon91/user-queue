package am.energizeglobal.userqueue.manager.impl;

import am.energizeglobal.userqueue.manager.IUserManager;
import am.energizeglobal.userqueue.model.User;
import am.energizeglobal.userqueue.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Component
@Transactional(readOnly = true)
public class UserManager implements IUserManager {

    private UserRepository userRepository;

    @Autowired
    public UserManager(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = false, rollbackFor = Exception.class)
    public User addUser(User user) {
        User top = userRepository.findTopByOrderByIdDesc();
        if (top != null) {
            long id = top.getId();
            user.setAheadUser(id);
        } else {
            user.setAheadUser(null);
        }
        return userRepository.save(user);
    }

    @Override
    public Set<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional(readOnly = false, rollbackFor = Exception.class)
    public boolean removeUserById(long id) {
        boolean isDeleted = false;
        User toBeRemoved = userRepository.findById(id);
        User user = userRepository.findNextRecord(id);
        if (toBeRemoved != null) {
            if (user != null) {
                user.setAheadUser(toBeRemoved.getAheadUser());
            }
        }
        int byId = userRepository.deleteById(id);
        if (byId > 0) {
            isDeleted = true;
        }
        return isDeleted;
    }

    @Override
    public User getUserById(long id) {
        return userRepository.findById(id);
    }
}
