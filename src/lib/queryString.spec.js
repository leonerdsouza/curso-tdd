import { queryString, parse } from './querystring';

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Leo',
      profession: 'QA',
    };

    expect(queryString(obj)).toBe('name=Leo&profession=QA');
  });

  it('create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Leo',
      profession: 'QA',
      abilities: ['JS', 'TDD'],
    };
    expect(queryString(obj)).toBe('name=Leo&profession=QA&abilities=JS,TDD');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Leo',
      profession: 'QA',
      abilities: { first: 'JS', second: 'TDD' },
    };
    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert query string to object', () => {
    const qs = 'name=Leo&profession=QA';

    expect(parse(qs)).toEqual({
      name: 'Leo',
      profession: 'QA',
    });
  });

  it('should convert query string of a single key-value to object', () => {
    const qs = 'name=Leo';
    expect(parse(qs)).toEqual({
      name: 'Leo',
    });
  });

  it('should convert query string to object taking care of comma separeted values', () => {
    const qs = 'name=Leo&abilities=JS,TDD';
    expect(parse(qs)).toEqual({
      name: 'Leo',
      abilities: ['JS', 'TDD'],
    });
  });
});
