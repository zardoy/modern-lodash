# Strict Lodash

It meant to be stricted and lightweight version of [Lodash](http://lodash.com/).

Also, this ilb contains helpers, that I didn't manage to find in other places.

## What included

This methods are from lodash, they're doing the same thing, but has improved straightforward types.

- [ ] Array.findWithIndex
- [ ] Array.randomItem
- [ ] (cancelled) Array.removeItem - why not just `.remove`? To make sure, that coder understand that he can't use callback
- [ ] Array.mapAndFilter - Almost the same as `array.map()` but, it also removes all `undefined` values (T badge)
- [ ] Array.findWithIndex - Array.find and Array.findIndex combined into in method. Ex: `const [value, index] = [4, 5].findWithIndex(n => n === 5)
