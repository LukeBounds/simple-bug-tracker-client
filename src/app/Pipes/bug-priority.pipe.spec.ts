import { BugPriorityPipe } from './bug-priority.pipe';

describe('BugPriorityPipe', () => {
  it('create an instance', () => {
    const pipe = new BugPriorityPipe();
    expect(pipe).toBeTruthy();
  });
});
