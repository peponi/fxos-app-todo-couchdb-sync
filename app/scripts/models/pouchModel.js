'use strict';

/**
 * PouchModel
 * @return {function} will return all public functions of the PouchModel
 */
var PouchModel = function() {
    var self = this,
        db = {
            todo: new PouchDB('todo'),
            group: new PouchDB('group'),
            settings: new PouchDB('settings')
        },
        syncDatabase = {};

    var checkCallback = function(c) {
        return (typeof c === undefined) ? function(doc){ return doc; } : c;
    };

    self.initializeCouchDBSync = function(settings) {

        var allDBs = ['todo', 'group'],//Object.keys(db), // don't want to sync settings
            domain = settings.couchdbUrl.split('/'),
            userName = settings.couchdbUserName,
            password = settings.couchdbPassword,
            prefix = settings.couchdbPrefix,
            url,
            dbName,
            remoteDB = {},
            //isApp = w.location.protocol === "app:" ? { mozSystem: true, mozAnon: true } : { mozSystem: false, mozAnon: false },
            isApp = window.location.protocol === "app:";

        var appXHR = function () {
            return new XMLHttpRequest({
                mozSystem: isApp,
                mozAnon: isApp
            });
        };

        var remoteDbOpts = {
            ajax: {
                xhr: appXHR,
                headers: { cookie: 'no' }
            }
        };

        for (var i = allDBs.length; i--;) {
            dbName = allDBs[i];

            url = domain[0] + '//' + userName + ':' + password + '@' + domain[2] + '/' + prefix + dbName;
            console.log(url);

            // https://github.com/pouchdb/pouchdb/issues/4256
            // http://pouchdb.com/guides/replication.html
            remoteDB[dbName] = new PouchDB(url, remoteDbOpts);

            db[dbName].sync(remoteDB[dbName], {
            //     live: true,
            //     retry: true
            }).on('complete', function() {
                vm.setStatus(dbName + ' has been synct', 2000);
                console.log(dbName + ' has been synct', 2000);
            }).on('error', function() {
                vm.setStatus(dbName + ' could not be synct', 2000);
                console.log(dbName + ' could not be synct', 2000);
            });
        }
    };

    self.get = function(type, id, callback) {
        db[type].get(id)
        .then(callback)
        .catch( function(err) { return err; } );
    };

    self.getAll = function(type, callback) {
        /* eslint-disable camelcase */
        db[type].allDocs({ include_docs: true, attachments: false })
        .then(callback)
        .catch( function(err) { return err; } );
        /* eslint-enable camelcase */
    };

    self.save = function(type, obj, callback) {
        // write unixtime as id
        obj._id = ~~(new Date().getTime() / 1000) + ''; // cast to string

        callback = checkCallback(callback);

        db[type].put(obj)
        .then(callback)
        .then ( function() { // show notify
            vm.setStatus(type + ' has been saved', 2000);
        }).catch( function(err) { return err; } );
    };

    self.saveList = function(type, list, callback) {
        callback = checkCallback(callback);

        db[type].bulkDocs(list)
        .then(callback)
        .catch( function(err) { return err; } );
    };

    self.removeId = function(type, id, callback) {
        db[type].get(id)
        .then( function(doc) { // remove object from db
            db[type].remove(doc);
        })
        .then(callback)
        .then ( function() { // show notify
            vm.setStatus(type + ' has been deleted', 2000);
        }).then ( function() { // reload all documents to  viewmodel state
            self.getAll(type, function(doc) {
                vm.loadAll(type, doc);
            });
        }).catch( function(err) { return err; } );
    };

    self.removeAll = function(type, callback) {
        callback = checkCallback(callback);

        db[type].allDocs()
        .then(function (result) {
            // Promise isn't supported by all browsers; you may want to use bluebird
            return Promise.all(result.rows.map(function (row) {
                return db.remove(row.id, row.value.rev);
            }));
        })
        .then(callback)
        .catch( function(err) { return err; } );
    };

    self.update = function(type, id, callback) {
        db[type].get(id)
        .then(callback)
        .then( function(doc) { return db[type].put(doc); })
        .then ( function() { // show notify
            vm.setStatus(type + ' has been updated', 2000);
        }).then ( function() { // reload all documents to  viewmodel state
            self.getAll(type, function(doc) {
                vm.loadAll(type, doc);
            });
        }).catch( function(err) { return err; } );
    };

    self.nukeAllDataBases = function() {
        db.todo.destroy().then( function() { console.log('pay DB has been deleted'); } );
        db.group.destroy().then( function() { console.log('inpay DB has been deleted'); } );
        db.settings.destroy().then( function() { console.log('settings has been deleted'); });
    };

    return self;
};
/* eslint-disable no-unused-vars */
var pm = new PouchModel();
/* eslint-enable no-unused-vars */
