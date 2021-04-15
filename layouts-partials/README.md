### Using handlebars

```bash
$ npm install hbs
```

```js
// app.js
app.set('view engine', 'hbs');
```

Instead of res.sendFile we now use res.render and refer to an hbs file in the views folder