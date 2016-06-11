'use strict';

/**
 * PouchModel
 * @return {function} will return all public functions of the PouchModel
 */
var PouchModel = function() {
    var self = this,
        db = {
            todo: new PouchDB('todo'),
            group: new PouchDB('group')// ,settings: new PouchDB('settings')
        },
        syncDatabase = {};

    self.initializeCouchDBSync = function (doc) {

        var allDBs = Object.keys(db),
            domain = doc['couchdb-url'].split('/'),
            userName = doc['couchdb-user-name'],
            password = doc['couchdb-password'],
            prefix = doc['couchdb-prefix'],
            url,
            dbName;

        for (var i = allDBs.length; i--;) {
            dbName = allDBs[i];

            // url = domain[0] + '//' + userName + ':' + password + '@' + domain[2] + '/' + prefix + dbName;
            url = domain[0] + '//' + userName + ':' + password + '@' + domain[2] + '/' + prefix + dbName;
            console.log(url);

            // http://pouchdb.com/guides/replication.html
            syncDatabase[dbName] = new PouchDB(url);

            db[dbName].sync(syncDatabase[dbName], {
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

    self.get = function (type, id, callback) {
        db[type].get(id)
        .then(callback)
        .catch( function(err) { return err; } );
    };

    self.getAll = function (type, callback) {
        /* eslint-disable camelcase */
        db[type].allDocs({ include_docs: true, attachments: false })
        .then(callback)
        .catch( function(err) { return err; } );
        /* eslint-enable camelcase */
    };

    self.save = function (type, Obj, callback) {
        // write unixtime as id
        Obj._id = ~~(new Date().getTime() / 1000) + ''; // cast to string

        callback = (typeof callback === undefined) ? function(doc){ return doc; } : callback;

        db[type].put(Obj)
        .then(callback)
        .then ( function() { // show notify
            vm.setStatus(type + ' has been saved', 2000);
        }).catch( function(err) { return err; } );
    };

    self.removeId = function (type, id, callback) {
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
        db.todo.destroy().then( function() { console.log('pay has been deleted'); });
        db.group.destroy().then( function() { console.log('inpay has been deleted'); });
        // db.settings.destroy().then( function() { console.log('settings has been deleted'); });
    };

    return self;
};
/* eslint-disable no-unused-vars */
var pm = new PouchModel();
/* eslint-enable no-unused-vars */
