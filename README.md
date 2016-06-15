![screenshot](_assets/just-do-it.jpg)

# Wallet WebApp

It's a WebApp optimzed for [Firefox OS 1.0 up to 2.5](https://www.mozilla.org/de/firefox/os/) 

Goal is to build a todo app who provide sever synchronization, dependencies and prioritization


Build with 
 * [Mozilla buildingfirefoxos.com](http://buildingfirefoxos.com), [github](https://github.com/buildingfirefoxos/Building-Blocks)
 * [KnockoutJS](http://knockoutjs.com)
 * [PouchDB](https://pouchdb.com)
 * [fecha](https://github.com/taylorhakes/fecha)
 * [google-webfonts-helper](https://google-webfonts-helper.herokuapp.com/fonts) <- thx for this tool

## Screenshots

![screenshot](_assets/screenshot.png)

## User story

As a **FirefoxOS user** I want to have a todo app to who rember me on noticed stuff
so that I can outsource my brain capacity to the phone

### Acceptance criteria

- [x] groups can be saved and deleted
- [x] todos can be saved, toggeled and deleted
- [x] todos will be shown in a list
- [x] todos will be shown filtered by group
- [x] todos can be ordered by priority
- [x] and by date (<strike>show date as header group</strike> if date is in the future and order by priority all todos with this date under the date header group) 
- [x] priority will be signaled by color
- [x] start screen, when first start
- [ ] todos can be edit
- [ ] links in the todo description will be shown as html link in the edit mode
- [ ] it will show a message if a todo has been toggle with an unsolved dependency (other todo is not done)
- [ ] settings will be loaded on startup (language/couchdb)
- [ ] synchronization to a CouchDB works
- [ ] sharing lists with other user via couchdb accounts
- [ ] group delete will show a confirm message and delete all dependet todos 
- [ ] transaltion can be added
- [ ] it will prefer the system default language
- [ ] LTR/RTL works
- [ ] app will run on FXOS 1.1
- [ ] app will run on android and ios

### Bugs

- [ ] viewModel.js:75 Uncaught TypeError: Cannot set property 'className' of null

## Install
```
npm install
gulp build
```
and run a webserver
```
npm run web
```
then click on [http://127.0.0.1:8000](http://127.0.0.1:8000)

## CouchDB setup (if you want to sync your data to your [CouchDB](https://couchdb.apache.org))

you need to enable [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)

[github.com/pouchdb/add-cors-to-couchdb](https://github.com/pouchdb/add-cors-to-couchdb#what-it-does)

*CouchDB doesn't come with CORS enabled by default. This is a problem for libraries like PouchDB, which depend on being able to access CouchDB ...*