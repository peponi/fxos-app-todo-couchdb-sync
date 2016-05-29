'use strict';

/* Todo Model */
var TodoModel = function() {
    var type = 'todo',
        self = this;

    self.map = {
        'low': 0,
        'middle': 1,
        'hight': 2,
        'urgent': 3
    };

    self.transaction = (formData) => {
        /* if date field is emtpy set current date an time */
        if (formData.date.length <= 0) {
            formData.date = fecha.format(new Date(), 'YYYY-MM-DD');
            formData.time = fecha.format(new Date(), 'hh:mm:ss');
        } else {
            formData.time = '';
        }

        var prio = formData.prio;

        // map the priority string to a integer value
        // easier to sort later
        if(prio === 'middle' || prio === 'hight' || prio === 'urgent') {
            formData.prio = self.map[prio];
        // priority will be 0 when prio is 'low' 
        // or default value has been passed  (priority menu was not used)
        // or some other crap is in the form data
        } else {
            formData.prio = 0;
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
