# Undoo
Undo/redo manager

<a href="https://travis-ci.org/fabioricali/undoo" target="_blank"><img src="https://travis-ci.org/fabioricali/undoo.svg?branch=master" title="Build Status"/></a>
<a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" title="License: MIT"/></a>

## Installation

### Node.js
```
npm install undoo --save
```

### Browser

#### Local
```html
<script src="node_modules/undoo/dist/undoo.min.js"></script>
```

#### CDN unpkg
```html
<script src="https://unpkg.com/undoo/dist/undoo.min.js"></script>
```

## Example

```javascript
const Undoo = require('undoo');

const myHistory = new Undoo();

myHistory.save('one');
myHistory.save('two');
myHistory.save('three');
myHistory.save('four');

myHistory.undo((item)=>{
    console.log(item); //=> three
});

myHistory.current(); //=> three

myHistory.redo((item)=>{
    console.log(item); //=> four
});

```

## Use provider

```javascript
const Undoo = require('undoo');

const myHistory = new Undoo({
    provider: () => document.getElementById('myTextArea').value
});

myHistory.save();

```

## API

<a name="Undoo"></a>

## Undoo
**Kind**: global class  

* [Undoo](#Undoo)
    * [new Undoo([opts])](#new_Undoo_new)
    * [.save([item])](#Undoo+save) ⇒ [<code>Undoo</code>](#Undoo)
    * [.clear()](#Undoo+clear) ⇒ [<code>Undoo</code>](#Undoo)
    * [.undo(callback)](#Undoo+undo) ⇒ [<code>Undoo</code>](#Undoo)
    * [.redo(callback)](#Undoo+redo) ⇒ [<code>Undoo</code>](#Undoo)
    * [.current()](#Undoo+current) ⇒ <code>\*</code>
    * [.count()](#Undoo+count) ⇒ <code>number</code>
    * [.onUpdate(callback)](#Undoo+onUpdate)

<a name="new_Undoo_new"></a>

### new Undoo([opts])
Create instance

<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[opts]</td><td><code>Object</code></td><td></td><td><p>configuration object</p>
</td>
    </tr><tr>
    <td>[opts.provider]</td><td><code>function</code></td><td><code></code></td><td><p>optional function called on save that returns new state for history</p>
</td>
    </tr><tr>
    <td>[opts.maxLength]</td><td><code>number</code></td><td><code>20</code></td><td><p>max length history</p>
</td>
    </tr>  </tbody>
</table>

<a name="Undoo+save"></a>

### undoo.save([item]) ⇒ [<code>Undoo</code>](#Undoo)
Save history

**Kind**: instance method of [<code>Undoo</code>](#Undoo)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[item]</td><td><code>*</code></td>
    </tr>  </tbody>
</table>

<a name="Undoo+clear"></a>

### undoo.clear() ⇒ [<code>Undoo</code>](#Undoo)
Clear history

**Kind**: instance method of [<code>Undoo</code>](#Undoo)  
<a name="Undoo+undo"></a>

### undoo.undo(callback) ⇒ [<code>Undoo</code>](#Undoo)
Undo

**Kind**: instance method of [<code>Undoo</code>](#Undoo)  
<table>
  <thead>
    <tr>
      <th>Param</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td>
    </tr>  </tbody>
</table>

<a name="Undoo+redo"></a>

### undoo.redo(callback) ⇒ [<code>Undoo</code>](#Undoo)
Redo

**Kind**: instance method of [<code>Undoo</code>](#Undoo)  
<table>
  <thead>
    <tr>
      <th>Param</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td>
    </tr>  </tbody>
</table>

<a name="Undoo+current"></a>

### undoo.current() ⇒ <code>\*</code>
Get current item in history

**Kind**: instance method of [<code>Undoo</code>](#Undoo)  
<a name="Undoo+count"></a>

### undoo.count() ⇒ <code>number</code>
Count history items

**Kind**: instance method of [<code>Undoo</code>](#Undoo)  
<a name="Undoo+onUpdate"></a>

### undoo.onUpdate(callback)
Triggered when history is updated

**Kind**: instance method of [<code>Undoo</code>](#Undoo)  
<table>
  <thead>
    <tr>
      <th>Param</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td>
    </tr>  </tbody>
</table>


## Changelog
You can view the changelog <a target="_blank" href="https://github.com/fabioricali/undoo/blob/master/CHANGELOG.md">here</a>

## License
Undoo is open-sourced software licensed under the <a target="_blank" href="http://opensource.org/licenses/MIT">MIT license</a>

## Author
<a target="_blank" href="http://rica.li">Fabio Ricali</a>