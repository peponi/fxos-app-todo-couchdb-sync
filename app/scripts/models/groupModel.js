'use strict';

/* Group Model */
var GroupModel = function() {
    var type = 'group',
        self = this;

    self.transaction = (formData) => {
        pm.save(type, formData);
    };

    self.getAll = (callback) => {
        pm.getAll(type, (result) => {
            callback(type, result);
        });
    };

    self.delete = (id, callback) => {
        pm.removeId(type, id, callback);
    };
}
