# Typescript Type Checker

Demonstration how the type checker gets you beyond the AST. This demonstrations goes into a given file `my.component.ts` and finds all involved types so you can export them for your documentation purposes.

## Get started

You can open this repository directly in [code sandbox](https://githubbox.com/georgiee/typescript-type-checker-beyond-ast) or clone this repo and follow the few steps locally.

Run `yarn start` to execute `src/main.ts` and watch for changes
so you can easily tinker around with the input file `my.component.ts`
and watch the console output.

```

yarn start
```

The involved script will process the following file, starting at the type `Output` and walk through all properties.

```
type ImportantValue = {
  value1: string;
  value2: number;
  value3: Date;
};

type Output = {
  collectedValue: ImportantValue;
};

```

Once the processing is completed, the console will show you the list of properties, their types, if applicable nested properties and purposely halting at standard libraries like `Date` and primitives liek `string`.

```
.
└──Processing 'Output'
    └── collectedValue: ImportantValue
      ├── value1: string
      ├── value2: number
      ├── value3: Date
```
