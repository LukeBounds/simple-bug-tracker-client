import { Pipe, PipeTransform } from '@angular/core';
import { BugPriority } from '../Protocol/Bug/bug-priority.enum';

@Pipe({
  name: 'bugPriority',
  standalone: true
})
export class BugPriorityPipe implements PipeTransform {

  transform(value: BugPriority, ...args: unknown[]): unknown {
    if (value == BugPriority.Low) {
      return 'Low';
    }
    else if (value == BugPriority.Medium) {
      return 'Medium';
    }
    else if (value == BugPriority.High) {
      return 'High';
    }
    else {
      return 'Unknown';
    }
  }

}
