import * as ts from "typescript";

// relative to your root
const files: string[] = ['file-with-types.ts']
const program: ts.Program = ts.createProgram(files, {});
const checker: ts.TypeChecker = program.getTypeChecker();

const myComponentSourceFile = program.getSourceFile(files[0])!;

if(myComponentSourceFile) {
  ts.forEachChild(myComponentSourceFile, node => {
    if (ts.isTypeAliasDeclaration(node) && node.name.escapedText === "MainObjectType") {
      const mainObjectType = checker.getTypeAtLocation(node.name);
      processProperty(mainObjectType, node);
    }
  });
}else {
  console.log('Given source file not found')
}


/**
 * Typescript can help us to spot types from outside of our local source files
 * which we don't want to process like literals string (think of trim(), length etc) or entire classes like Date.
 */
function isTypeLocal(symbol: ts.Symbol) {
  const sourceFile = symbol?.valueDeclaration?.getSourceFile();
  const hasSource = !!sourceFile;
  const isStandardLibrary = hasSource && program.isSourceFileDefaultLibrary(sourceFile!)
  const isExternal = hasSource && program.isSourceFileFromExternalLibrary(sourceFile!);
  const hasDeclaration = !!symbol?.declarations?.[0];

  return !(isStandardLibrary || isExternal) && hasDeclaration;
}

function processProperty(type: ts.Type, node: ts.Node, level = 0) {
  if(level === 0) {
    console.group(`.\n└──Processing '${checker.typeToString(type)}'`)
  }

  for (const property of type.getProperties()) {
    const propertyType = checker.getTypeOfSymbolAtLocation(property, node);
    const propertySymbol = propertyType.getSymbol()!;
    const propertyTypeName = checker.typeToString(propertyType);

    /**
     * If it's a local type belonging to our sources we are interested in
     * further analysis, so we process all properties again like we did for the current given property.
     */
    if(isTypeLocal(propertySymbol)) {
      console.group(`  └── ${property.name}: ${propertyTypeName}`)

      processProperty(propertyType, node, level + 1)
    }else {
      console.log(`  ├── ${property.name}: ${propertyTypeName}`)
    }

  }
  console.groupEnd();

}


