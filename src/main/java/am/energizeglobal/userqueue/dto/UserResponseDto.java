package am.energizeglobal.userqueue.dto;

import am.energizeglobal.userqueue.model.User;

public class UserResponseDto extends ResponseDto {

    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
