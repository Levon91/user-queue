package am.energizeglobal.userqueue.controller;

import am.energizeglobal.userqueue.manager.IUserManager;
import am.energizeglobal.userqueue.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private IUserManager userManager;

    @RequestMapping(method = RequestMethod.GET)
    public String loadAllUsers(Model model) {
        Set<User> users = userManager.getAllUsers();
        model.addAttribute("users", users);
        return "users";
    }

    @RequestMapping(value = "/_add", method = RequestMethod.POST)
    public @ResponseBody User addUser(@Valid @RequestBody User user) {
        User result;
        if (user.getFirstName() == null && user.getLastName() == null) {
            return null;
        }
        result = userManager.addUser(user);
        System.out.println("user added");
        return result;
    }

    @RequestMapping(value = "/{id}/_info", method = RequestMethod.GET)
    public @ResponseBody User userInfo(@PathVariable(value = "id") long id, Model model) {
        User user = userManager.getUserById(id);
        model.addAttribute("user", user);
        return user;
    }

    @RequestMapping(value = "/_update", method = RequestMethod.POST)
    public @ResponseBody User userInfoUpdate(@RequestBody User user) {
        if (user.getFirstName() == null || user.getFirstName().isEmpty()) {
            return null;
        }
        if (user.getLastName() == null || user.getLastName().isEmpty()) {
            return null;
        }
        User dbUser = userManager.getUserById(user.getId());
        if (dbUser != null) {
            dbUser.setFirstName(user.getFirstName());
            dbUser.setLastName(user.getLastName());
            userManager.addUser(dbUser);
        }
        return dbUser;
    }

    @RequestMapping(value = "/{id}/_delete", method = RequestMethod.GET)
    public @ResponseBody String addUser(@PathVariable(value = "id") long id, Model model) {
        if (id > 0) {
            boolean removed = userManager.removeUserById(id);
            if (!removed) {
                return "error";
            }
            model.addAttribute("response", removed);
        }
        return "success";
    }
}
