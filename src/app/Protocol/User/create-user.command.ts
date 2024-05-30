import { UserDto } from "./user.dto";

export interface CreateUserCommand { 
    user: UserDto;
}