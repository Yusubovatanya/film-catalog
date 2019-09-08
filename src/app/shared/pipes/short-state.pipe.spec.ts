import { ShortStatePipe } from "./short-state.pipe";


const inputValue = 'United States of America';
const outputValue = 'USA';


describe('ShortStatePipe', () => {
  it('create an instance', () => {
    const pipe = new ShortStatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform', () => {
    const pipe = new ShortStatePipe();
    expect(pipe.transform(inputValue)).toBe(outputValue);
  });
});
