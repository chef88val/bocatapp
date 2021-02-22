import { ProfilePipe } from './profile.pipe';

describe('ProfilePipe', () => {
  it('create an instance', () => {
    const pipe = new ProfilePipe();
    expect(pipe).toBeTruthy();
  });
  it('transform', () => {
    const pipe = new ProfilePipe();
    expect(pipe.transform('SF')).toEqual('ECS');
    expect(pipe.transform('z')).toBeNull();
  });
});
