import { YesNoActivePipe } from './yesno.pipe';

describe('YesNoActivePipe', () => {
  it('create an instance', () => {
    const pipe = new YesNoActivePipe();
    expect(pipe).toBeTruthy();
  });
});