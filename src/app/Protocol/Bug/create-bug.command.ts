import { BugDto } from "./bug.dto";

export interface CreateBugCommand { 
    bug: BugDto;
}