import {shuffleArray, createOneToNArray} from "./index";

it('shufles filled array', () => {
    expect(shuffleArray([1,2,3,4])).not.toBe([1,2,3,4]);
});

it('shufles empty array', () => {
    expect(shuffleArray([])).toEqual([]);
});

it('creates N array of numbers', () => {
    expect(createOneToNArray(4)).toEqual([0,1,2,3]);
});
