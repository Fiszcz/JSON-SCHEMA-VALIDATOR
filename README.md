# JSON-Schema Walidator

### Wymagane technologie do uruchomienia walidatora

- Node.js

### Uruchomienie skryptu

```
node dist/index.js test.json
```

Zamiast *test.json* może być użyty dowolnie inny plik.

### Kompilacja projektu

Będzie Ci na pewno potrzebny przynajmniej zainstalowany ``npm``.

1. Pobierz wszystkie paczki poprzez komendę ``yarn install`` lub ewentualnie ``npm install``

2. Po zainstalowaniu przeszedł czas na skompilowanie kodu źródłowego: poprzez uruchomienie komendy ``tsc .``, która skompiluje wszystkie pliki TypeScript do JavaScript.

3. Tak skompilowany projekt można uruchomić poprzez komendę ``node index.js test.json``

## Reguły EBNF

Poniżej prezentuję wykorzystane w projekcie reguły EBNF określające gramatykę plików json-schema:

#### Podstawowe wartości JSON Schema
```
<JSDoc> := { ( <id>, )? ( <defs>, )? <JSch> }

<id> := "$id": "<uri>"
<defs> := "definitions": { <kSch> (, <kSch>)*}
<kSch> := <kword>: { <JSch> }
<JSch> := <res> (, <res>)*
<res> := <type> | <strRes> | <numRes> | <objRes> | <refSch> | <title> | <description> | <enum>
<type> := "type" : ([<typename> (, <typename>)*] | <typename>)
<typename> := "string" | "integer" | "number" | "boolean" | "null" | "array" | "object"
<title> := "title":  <string>
<description> := "description":  <string>
```

#### Reprezentacja własności typu Object
```
<objRes> := <prop> | <req> 
<prop> := "properties": { <kSch> (, <kSch>)*}
<kSch> := <kword>: { <JSch> }
<req> := "required": [ <kword> (, <kword>)*]
```

#### Reprezentacja własności typu Number
```
<numRes> := <min> | <max>
<min> := "minimum": <number>
<max> := "maximum": <number>
```

### Reprezentacja własności typu String
```
<strRes> :=  <minLen> | <maxLen>
<minLen> := "minLength": <number>
<maxLen> := "maxLength": <number>
```

### Reprezentacja własności typu Enum
```
<enum> := "enum": [<Jval> (, <Jval>)*]
```

### Własności podstawowe
```
<Jval> := <string> | <number> | <array> | <object> | <bool> | <null>
<string> := "([a-zA-Z0-9<symbols>])*"
<number> := (-)?([0-9])*(.)?([0-9])*
<array> := [(<Jval> (, <Jval>)*)?]
<object> := {("<string>": <Jval> (,"<string>": <Jval>)*)?}
<bool> := true | false
<null> := "null"
```

#### Referencja JSON Schema
```
<refSch> := "$ref": "<uriRef>" 
```

#### Schemat JSON Schema
```
<schema> := "$schema": "<uri>" 
```
