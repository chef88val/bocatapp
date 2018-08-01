import { SizePipe } from './size.pipe';

describe('SizePipe', () => {
  it('create an instance', () => {
    const pipe = new SizePipe();
    expect(pipe).toBeTruthy();
  });
  it('transform', () => {
    const pipe = new SizePipe();
    expect(pipe.transform('p')).toEqual('Pequeño');
    expect(pipe.transform('g')).toEqual('Grande');
    expect(pipe.transform('z')).toBeNull();
  });
});
