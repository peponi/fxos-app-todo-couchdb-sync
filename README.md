# Wallet WebApp

Build with 
 * [Mozilla buildingfirefoxos.com](https://buildingfirefoxos.com/building-blocks)
 * [Mozilla X-Tags](http://x-tag.github.io/)
 * [PouchDB](https://pouchdb.com/)
 * [fecha](https://github.com/taylorhakes/fecha)

It's a WebApp optimzed for [Firefox OS 1.0 up to 2.5](https://www.mozilla.org/de/firefox/os/) 

Goal is to build a todo app who provide sever synchronization, dependencies and prioritization


## User story

As a **FirefoxOS user** I want to have a todo app to who rember me on noticed stuff
so that I can outsource my brain capacity to the phone

### Acceptance criteria

- [x] groups can be saved and deleted
- [x] todos can be saved, toggeled and deleted
- [x] todos will be shown in a list
- [x] todos will be shown filtered by group
- [x] todos can be ordered by priority
- [ ] and by date (show date as header group if date is in the future and order by priority all todos with this date under the date header group) 
- [x] priority will be signaled by color
- [ ] todos can be edit
- [ ] links in the todo description will be shown as html link in the edit mode
- [ ] it will show a message if a todo has been toggle with an unsolved dependency (other todo is not done)
- [ ] settings will be loaded on startup (language/couchdb)
- [ ] it will prefer the system default language
- [ ] synchronization to a CouchDB works
- [ ] group delete will show a confirm message and delete all dependet todos 
- [ ] synchronization to a CouchDB works
- [ ] transaltion can be added
- [ ] LTR/RTL works
- [ ] app will run on FXOS 1.1
- [ ] app will run on android and ios

### Bugs

- [] todo list is some times empty after some action

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