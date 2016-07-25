import {
  quan,
  typeScale,
  unpackAllGrouped,
  unpackAll,
  mapValues,
  groupBy
} from '../../src/aurelia-charts';

describe('utils', () => {
  let obj;

  beforeEach(() => {
    obj = [{a: 1, b: 2}, {a: 1, b: 3}, {a: 2, b: 4}];
  });

  it('groupBy', () => {
    expect(
      groupBy('a', [{
        a: 1,
        b: 2
      }, {
        a: 1,
        b: 3
      }, {
        a: 2,
        b: 4
      }])
    ).toEqual([
      {
        key: 1,
        values: [{a: 1, b: 2}, {a: 1, b: 3}]
      }, {
        key: 2,
        values: [{a: 2, b: 4}]
      }
    ]);
  });

  it('mapValues', () => {
    expect(mapValues(v => v + 1, {a:1, b: 2, c: 3})).toEqual({a: 2, b: 3, c: 4});
  });

  it('unpackAll', () => {
    expect(
      unpackAll(obj)
    ).toEqual({
      a: [1, 1, 2],
      b: [2, 3, 4]
    });
  });

  it('unpackAllGrouped', () => {
    expect(unpackAllGrouped(groupBy('a', obj)))
      .toEqual([
        {
          key: 1,
          values: {a: [1, 1], b: [2, 3]}
        }, {
          key: 2,
          values: {a: [2],    b: [4]}}
      ]);
  });

  it('typeScale', () => {
    expect(typeScale('number')).toBe(quan);
  });
});
