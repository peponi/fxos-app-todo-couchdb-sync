'use strict';

/* Group Model */
/* eslint-disable no-unused-vars */
var GroupModel = function() {
/* eslint-enable no-unused-vars */
    var type = 'group',
        self = this;

    self.transaction = function (formData) {
        pm.save(type, formData);
    };

    self.getAll = function (callback) {
        pm.getAll(type, function (result) {
            callback(type, result);
        });
    };

    self.delete = function (id, callback) {
        pm.removeId(type, id, callback);
    };
};
