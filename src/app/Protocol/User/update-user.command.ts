import { UserDto } from "./user.dto";

export interface UpdateUserCommand { 
    user: UserDto;
}