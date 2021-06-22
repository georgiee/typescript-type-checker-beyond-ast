# Typescript Type Checker

Demonstration how the type checker gets you beyond the AST. This demonstration goes into a given file `file-with-types.ts` and finds all involved types so you can export them for your documentation purposes.

## Get started

You can open this repository directly in [code sandbox](https://githubbox.com/georgiee/typescript-type-checker-beyond-ast) or clone this repo and follow the few steps locally.

Run `yarn start` to execute `main.ts` and watch for changes, so you can easily tinker around with the input file `file-with-types.ts`
and watch the console output.

```
yarn start
```

The involved script will process the following file, starting at the type `MainObjectType` and walk through all properties.

```
type MainObjectType = {
  propertyWithTypeAlias: NestedObjectType;
};

type NestedObjectType = {
  value1: string;
  value2: number;
  value3: Date;
};
```

Once the processing is completed, the console will show you the list of properties, their types, if applicable nested properties and purposely halting at standard libraries like `Date` and primitives like `string`.

```
.
└──Processing 'MainObjectType'
    └── propertyWithTypeAlias: NestedObjectType
      ├── value1: string
      ├── value2: number
      ├── value3: Date
```
