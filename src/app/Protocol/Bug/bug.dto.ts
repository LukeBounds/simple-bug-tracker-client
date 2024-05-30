import { BugPriority } from "./bug-priority.enum";
import { UserDto } from "../User/user.dto";

export interface BugDto {
    bugId: number;
    title: string;
    description: string;
    priority: BugPriority;
    assignedUser: UserDto;
    dateCreated: Date;
    dateClosed: Date | null;
}