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

myHistory
    .save('one')
    .save('two')
    .save('three')
    .save('four');

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
    * _instance_
        * [.canUndo()](#Undoo+canUndo) ⇒ <code>boolean</code>
        * [.canRedo()](#Undoo+canRedo) ⇒ <code>boolean</code>
        * [.import(history)](#Undoo+import) ⇒ [<code>Undoo</code>](#Undoo)
        * [.history()](#Undoo+history) ⇒ <code>Array</code>
        * [.save([item])](#Undoo+save) ⇒ [<code>Undoo</code>](#Undoo)
        * [.suspendSave([state])](#Undoo+suspendSave) ⇒ [<code>Undoo</code>](#Undoo)
        * [.allowedSave()](#Undoo+allowedSave) ⇒ <code>boolean</code>
        * [.clear()](#Undoo+clear) ⇒ [<code>Undoo</code>](#Undoo)
        * [.undo([callback])](#Undoo+undo) ⇒ [<code>Undoo</code>](#Undoo)
        * [.redo([callback])](#Undoo+redo) ⇒ [<code>Undoo</code>](#Undoo)
        * [.current()](#Undoo+current) ⇒ <code>\*</code>
        * [.count()](#Undoo+count) ⇒ <code>number</code>
        * [.initialState()](#Undoo+initialState) ⇒ <code>\*</code>
        * [.onUpdate(callback)](#Undoo+onUpdate) ⇒ [<code>Undoo</code>](#Undoo)
        * [.onMaxLength(callback)](#Undoo+onMaxLength) ⇒ [<code>Undoo</code>](#Undoo)
        * [.onBeforeSave(callback)](#Undoo+onBeforeSave) ⇒ [<code>Undoo</code>](#Undoo)
    * _inner_
        * [~undoCallback](#Undoo..undoCallback) : <code>function</code>
        * [~redoCallback](#Undoo..redoCallback) : <code>function</code>
        * [~updateCallback](#Undoo..updateCallback) : <code>function</code>
        * [~maxLengthCallback](#Undoo..maxLengthCallback) : <code>function</code>
        * [~beforeSaveCallback](#Undoo..beforeSaveCallback) : <code>function</code>

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

<a name="Undoo+canUndo"></a>

### undoo.canUndo() ⇒ <code>boolean</code>
Check if undo is available

**Kind**: instance method of [<code>Undoo</code>](#Undoo)  
<a name="Undoo+canRedo"></a>

### undoo.canRedo() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Undoo</code>](#Undoo)  
**Check**: if redo is available  
<a name="Undoo+import"></a>

### undoo.import(history) ⇒ [<code>Undoo</code>](#Undoo)
Import external history

**Kind**: instance method of [<code>Undoo</code>](#Undoo)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>history</td><td><code>Array</code></td>
    </tr>  </tbody>
</table>

<a name="Undoo+history"></a>

### undoo.history() ⇒ <code>Array</code>
Get history

**Kind**: instance method of [<code>Undoo</code>](#Undoo)  
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

<a name="Undoo+suspendSave"></a>

### undoo.suspendSave([state]) ⇒ [<code>Undoo</code>](#Undoo)
Suspend save method

**Kind**: instance method of [<code>Undoo</code>](#Undoo)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[state]</td><td><code>boolean</code></td><td><code>true</code></td>
    </tr>  </tbody>
</table>

<a name="Undoo+allowedSave"></a>

### undoo.allowedSave() ⇒ <code>boolean</code>
Check if save is allowed

**Kind**: instance method of [<code>Undoo</code>](#Undoo)  
<a name="Undoo+clear"></a>

### undoo.clear() ⇒ [<code>Undoo</code>](#Undoo)
Clear history

**Kind**: instance method of [<code>Undoo</code>](#Undoo)  
<a name="Undoo+undo"></a>

### undoo.undo([callback]) ⇒ [<code>Undoo</code>](#Undoo)
Undo

**Kind**: instance method of [<code>Undoo</code>](#Undoo)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[callback]</td><td><code><a href="#Undoo..undoCallback">undoCallback</a></code></td><td><p>callback function</p>
</td>
    </tr>  </tbody>
</table>

<a name="Undoo+redo"></a>

### undoo.redo([callback]) ⇒ [<code>Undoo</code>](#Undoo)
Redo

**Kind**: instance method of [<code>Undoo</code>](#Undoo)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[callback]</td><td><code><a href="#Undoo..redoCallback">redoCallback</a></code></td><td><p>callback function</p>
</td>
    </tr>  </tbody>
</table>

<a name="Undoo+current"></a>

### undoo.current() ⇒ <code>\*</code>
Get current item in history

**Kind**: instance method of [<code>Undoo</code>](#Undoo)  
<a name="Undoo+count"></a>

### undoo.count() ⇒ <code>number</code>
Count history items, the first element is not considered

**Kind**: instance method of [<code>Undoo</code>](#Undoo)  
<a name="Undoo+initialState"></a>

### undoo.initialState() ⇒ <code>\*</code>
Get initial state history

**Kind**: instance method of [<code>Undoo</code>](#Undoo)  
<a name="Undoo+onUpdate"></a>

### undoo.onUpdate(callback) ⇒ [<code>Undoo</code>](#Undoo)
Triggered when history is updated

**Kind**: instance method of [<code>Undoo</code>](#Undoo)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td><td><code><a href="#Undoo..updateCallback">updateCallback</a></code></td><td><p>callback function</p>
</td>
    </tr>  </tbody>
</table>

<a name="Undoo+onMaxLength"></a>

### undoo.onMaxLength(callback) ⇒ [<code>Undoo</code>](#Undoo)
Triggered when maxLength is exceeded

**Kind**: instance method of [<code>Undoo</code>](#Undoo)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td><td><code><a href="#Undoo..maxLengthCallback">maxLengthCallback</a></code></td><td><p>callback function</p>
</td>
    </tr>  </tbody>
</table>

<a name="Undoo+onBeforeSave"></a>

### undoo.onBeforeSave(callback) ⇒ [<code>Undoo</code>](#Undoo)
Triggered before save

**Kind**: instance method of [<code>Undoo</code>](#Undoo)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td><td><code><a href="#Undoo..beforeSaveCallback">beforeSaveCallback</a></code></td><td><p>callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// If callback returns `false` the save command will not be executedmyHistory.onBeforeSave(()=>false)// You can overwrite item before savemyHistory.onBeforeSave((item)=>{     return item.toUpperCase();})
```
<a name="Undoo..undoCallback"></a>

### Undoo~undoCallback : <code>function</code>
undo callback

**Kind**: inner typedef of [<code>Undoo</code>](#Undoo)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>item</td><td><code>*</code></td><td><p>current history item</p>
</td>
    </tr>  </tbody>
</table>

<a name="Undoo..redoCallback"></a>

### Undoo~redoCallback : <code>function</code>
redo callback

**Kind**: inner typedef of [<code>Undoo</code>](#Undoo)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>item</td><td><code>*</code></td><td><p>current history item</p>
</td>
    </tr>  </tbody>
</table>

<a name="Undoo..updateCallback"></a>

### Undoo~updateCallback : <code>function</code>
onUpdate callback

**Kind**: inner typedef of [<code>Undoo</code>](#Undoo)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>item</td><td><code>*</code></td><td><p>current history item</p>
</td>
    </tr><tr>
    <td>action</td><td><code>string</code></td><td><p>action that has called update event. Can be: redo, undo, save, clear</p>
</td>
    </tr><tr>
    <td>history</td><td><code>Array</code></td><td><p>history array</p>
</td>
    </tr><tr>
    <td>istance</td><td><code><a href="#Undoo">Undoo</a></code></td><td></td>
    </tr>  </tbody>
</table>

<a name="Undoo..maxLengthCallback"></a>

### Undoo~maxLengthCallback : <code>function</code>
onMaxLength callback

**Kind**: inner typedef of [<code>Undoo</code>](#Undoo)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>item</td><td><code>*</code></td><td><p>current history item</p>
</td>
    </tr><tr>
    <td>history</td><td><code>Array</code></td><td><p>history array</p>
</td>
    </tr><tr>
    <td>istance</td><td><code><a href="#Undoo">Undoo</a></code></td><td></td>
    </tr>  </tbody>
</table>

<a name="Undoo..beforeSaveCallback"></a>

### Undoo~beforeSaveCallback : <code>function</code>
onBeforeSave callback

**Kind**: inner typedef of [<code>Undoo</code>](#Undoo)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>item</td><td><code>*</code></td><td><p>current history item</p>
</td>
    </tr><tr>
    <td>istance</td><td><code><a href="#Undoo">Undoo</a></code></td><td></td>
    </tr>  </tbody>
</table>


## Changelog
You can view the changelog <a target="_blank" href="https://github.com/fabioricali/undoo/blob/master/CHANGELOG.md">here</a>

## License
Undoo is open-sourced software licensed under the <a target="_blank" href="http://opensource.org/licenses/MIT">MIT license</a>

## Author
<a target="_blank" href="http://rica.li">Fabio Ricali</a>
