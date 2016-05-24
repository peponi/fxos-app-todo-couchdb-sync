"use strict";

/**
 * PouchModel
 * @return {function} will return all public functions of the PouchModel
 */
const PouchModel = function() {
    var self = this,
        db = {
            todo: new PouchDB('todo'),
            group: new PouchDB('group')//,settings: new PouchDB('settings')
        },
        syncDatabase = {};

    self.initializeCouchDBSync = (doc) => {

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
            url = `${domain[0]}//${userName}:${password}@${domain[2]}/${prefix}${dbName}`;
            
            console.log(url);

            // http://pouchdb.com/guides/replication.html
            syncDatabase[dbName] = new PouchDB(url);

            db[dbName].sync(syncDatabase[dbName], {
            //     live: true,
            //     retry: true
            }).on('complete', () => {
              vm.setStatus(`${dbName} has been synct`, 2000);
              console.log(`${dbName} has been synct`, 2000);
            }).on('error', () => {
              vm.setStatus(`${dbName} could not be synct`, 2000);
              console.log(`${dbName} could not be synct`, 2000);
            });
        }
    };

    self.get = (type, id, callback) => {
        db[type].get(id)
        .then(callback)
        .catch( (err) => err );
    };

    self.getAll = (type, callback) => {
        /* eslint-disable camelcase */
        db[type].allDocs({ include_docs: true, attachments: false })
        .then(callback)
        .catch( (err) => err );
        /* eslint-enable camelcase */
    };

    self.save = (type, Obj, callback) => {
        // write unixtime as id
        Obj._id = `${~~(new Date().getTime() / 1000)}` // cast to string

        callback = (typeof callback === undefined) ? (doc) => doc : callback;

        db[type].put(Obj)
        .then(callback)
        .then ( () => { // show notify
            vm.setStatus(`${type} has been saved`, 2000);
        }).catch( (err) => err );
    };

    self.removeId = (type, id, callback) => {
        db[type].get(id)
        .then( (doc) => { // remove object from db
            db[type].remove(doc);
        })
        .then(callback)
        .then ( () => { // show notify
            vm.setStatus(`${type} has been deleted`, 2000);
        }).then ( () => { // reload all documents to  viewmodel state
            self.getAll(type, function(doc) {
                vm.loadAll(type,doc)
            });
        }).catch( (err) => err );
    };

    self.update = (type, id, callback, callback2) => {
        db[type].get(id)
        .then(callback)
        .then( (doc) => db[type].put(doc) )
        .then ( () => { // show notify
            vm.setStatus(`${type} has been updated`, 2000);
        }).then ( () => { // reload all documents to  viewmodel state
            self.getAll(type, function(doc) {
                vm.loadAll(type, doc)
            });
        }).catch( (err) => err );
    };

    self.nukeAllDataBases = () => {
        db.todo.destroy().then( () => { console.log('pay has been deleted'); });
        db.group.destroy().then( () => { console.log('inpay has been deleted'); });
        //db.settings.destroy().then( () => { console.log('settings has been deleted'); });
    };

    return self;
}

var pm = new PouchModel();
