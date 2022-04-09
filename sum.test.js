const sum = require('./sum')

test('add 1 + 2 = 3', sumTest)

function sumTest() {
    expect(sum(1,2)).toBe(3);
}