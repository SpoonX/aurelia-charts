import {quan, qual} from '../../src/aurelia-charts';

describe('Aurelia-charts', () => {
  it('has constants', () => {
    expect(quan).toBe('quantitative');
    expect(qual).toBe('qualitative');
  });
});
