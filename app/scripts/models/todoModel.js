'use strict';

/* Todo Model */
/* eslint-disable no-unused-vars */
var TodoModel = function() {
/* eslint-enable no-unused-vars */
    var type = 'todo',
        self = this;

    self.map = {
        'low': 0,
        'middle': 1,
        'height': 2,
        'urgent': 3
    };

    self.transaction = function(formData) {
        /* if date field is emtpy set current date an time */
        if (formData.date.length <= 0) {
            formData.date = fecha.format(new Date(), 'YYYY-MM-DD');
            formData.time = fecha.format(new Date(), 'hh:mm:ss');
        } else {
            formData.time = '';
        }

        // map the priority string to a integer value
        // easier to sort later
        formData.prio = self.map[formData.prio];        

        // if(formData.calender) {
        //     console.log('open calender webactivity here');
        //     delete formData.calender;
        // }

        formData.done = false;
        
        pm.save(type, formData);
    };

    self.get = function(id, callback) {
        pm.get(type, id, function (doc) {
            callback(doc);
        });
    };

    self.getAll = function(callback) {
        pm.getAll(type, function (result) {
            callback(type, result);
        });
    };

    self.update = function(id, callback) {
        pm.update(type, id, function (doc) {
            return callback(doc);
        });
    };

    self.delete = function(id, callback) {
        pm.removeId(type, id, callback);
    };
};
