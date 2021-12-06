<!-- # Add support for new array syntax type -->

```ts
type Vec3 = [number * 3];
type Vec3 = [number, number, number];

type SomeArray = [string, number * 2, ...boolean[]];
type SomeArray = [string, number, number, ...boolean[]];


const createArray = <T extends number>(itemsToAdd: number, )
```
