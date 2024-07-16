import { expect, test } from 'vitest';
import { sum, createDateObject } from './utils';
import { extractUsername } from './utils';

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
})

test('createDateObject with no arguments', () => {
    expect(createDateObject()).toBeInstanceOf(Date)
})

test('createDateObject with day and month', () => {
    expect(createDateObject('1', 'January').toISOString()).toBe(new Date(`${new Date().getFullYear()}-January-1`).toISOString())
})

test('createDateObject with day and year', () => {
    expect(createDateObject('1', undefined, '2023').toISOString()).toBe(new Date(`2023-${new Date().getMonth()}-1`).toISOString())
})

test('createDateObject with month and year', () => {
    expect(createDateObject(undefined, 'January', '2023').toISOString()).toBe(new Date(`2023-1-${new Date().getDate()}`).toISOString())
})

test('createDateObject with day', () => {
    expect(createDateObject('1').toISOString()).toBe(new Date(`${new Date().getFullYear()}-${new Date().getMonth()}-1`).toISOString())
})

test('createDateObject with month', () => {
    expect(createDateObject(undefined, 'January').toISOString()).toBe(new Date(`${new Date().getFullYear()}-1-${new Date().getDate()}`).toISOString())
})

test('createDateObject with year', () => {
    expect(createDateObject(undefined, undefined, '2023').toISOString()).toBe(new Date(`2023-${new Date().getMonth()}-${new Date().getDate()}`).toISOString())
})

test('createDateObject with invalid day', () => {
    expect(createDateObject('32')).toBeInstanceOf(Date)
})

test('createDateObject with invalid month', () => {
    expect(createDateObject(undefined, 'Invalid')).toBeInstanceOf(Date)
})

test('createDateObject with invalid year', () => {
    expect(createDateObject(undefined, undefined, 'Invalid')).toBeInstanceOf(Date)
})

test('createDateObject with invalid day and month', () => {
    expect(createDateObject('32', 'Invalid')).toBeInstanceOf(Date)
})

test('createDateObject with invalid day and year', () => {
    expect(createDateObject('32', undefined, 'Invalid')).toBeInstanceOf(Date)
})

test('createDateObject with invalid month and year', () => {
    expect(createDateObject(undefined, 'Invalid', 'Invalid')).toBeInstanceOf(Date)
})

test('createDateObject with invalid day, month, and year', () => {
    expect(createDateObject('32', 'Invalid', 'Invalid')).toBeInstanceOf(Date)
})

test('extractUsername with gmail',() => {
    expect(extractUsername("abcd@gmail.com")).toBe("abcd");
} )

test('extractUsername with outlook',() => {
    expect(extractUsername("abcd@outlook.com")).toBe("abcd");
} )

test('extractUsername with random',() => {
    expect(extractUsername("abcd@blahblah@blahblah.com")).toBe("abcd");
} )

test('extractUsername with undefined',() => {
    expect(extractUsername(undefined)).toBe("");
} )