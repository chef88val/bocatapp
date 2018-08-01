import { CapitalizeFirstPipe } from './capitalize-first.pipe';

describe('CapitalizeFirstPipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalizeFirstPipe();
    expect(pipe).toBeTruthy();
  });
  it('transform', () => {
    const pipe = new CapitalizeFirstPipe();
    expect(pipe.transform('javier')).toEqual('Javier');
    expect(pipe.transform('Javier')).not.toEqual('javier')
    expect(pipe.transform('Javier')).toEqual('Javier')
  });
});
