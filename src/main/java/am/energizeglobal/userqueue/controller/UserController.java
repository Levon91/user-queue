package am.energizeglobal.userqueue.controller;

import am.energizeglobal.userqueue.manager.IUserManager;
import am.energizeglobal.userqueue.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Locale;
import java.util.Set;

@Controller
public class UserController {

    @Autowired
    private IUserManager userManager;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String loadAllUsers(Model model) {
        Set<User> users = userManager.getAllUsers();
        model.addAttribute("users", users);
        return "users";
    }

    @RequestMapping(value = "/add-user", method = RequestMethod.POST)
    public @ResponseBody User addUser(@Valid @RequestBody User user) {
        User result;
        if (user.getFirstName() == null && user.getLastName() == null) {
            return null;
        }
        result = userManager.addUser(user);
        System.out.println("user added");
        return result;
    }

    @RequestMapping(value = "/{id}/_delete", method = RequestMethod.GET)
    public @ResponseBody String addUser(@PathVariable(value = "id") long id, Model model) {
        if (id > 0) {
            boolean removed = userManager.removeUserById(id);
            if (!removed){
                return "error";
            }
            model.addAttribute("response", removed);
        }
        return "success";
    }
}
