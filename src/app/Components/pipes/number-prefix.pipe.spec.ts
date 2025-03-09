import { NumberPrefixPipe } from './number-prefix.pipe';

describe('NumberPrefixPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberPrefixPipe();
    expect(pipe).toBeTruthy();
  });
});
