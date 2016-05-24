'use strict';

/* Todo Model */
var TodoModel = function() {
    var type = 'todo',
        self = this;

    self.transaction = (formData) => {
                /* if date field is emtpy set current date an time */
        if (formData.date.length <= 0) {
            formData.date = fecha.format(new Date(), 'YYYY-MM-DD');
            formData.time = fecha.format(new Date(), 'hh:mm:ss');
        } else {
            formData.time = '';
        }

        formData.done = false;
        
        pm.save(type, formData);
    };

    self.getAll = (callback) => {
        pm.getAll(type, (result) => {
            callback(type, result);
        });
    };

    self.update = (id, callback) => {
        pm.update(type, id, (doc) => {
            return callback(doc);
        });
    };

    self.delete = (id, callback) => {
        pm.removeId(type, id, callback);
    };
}
