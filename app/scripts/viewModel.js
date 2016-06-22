'use strict';

var ViewModel = function() {

    // global declarated heavy used variables
    var self = this,
        i = 0,
        is,
        d = document,
        title = '',
        headerGroupMenuBtn = d.querySelector('#drawer h1'),
        todoFormGroupIntput = d.querySelector('#todo-form [name=group]'),
        dashboard = d.querySelector('[data-position="current"]'),
        mainTodoList = d.getElementById('main-todo-list'),
        noGroupsAvailableSection = d.getElementById('no-groups-available-section'),
        circleBtn = d.getElementById('circle-button'),
        model = {
            todo: new TodoModel(),
            group: new GroupModel(),
            settings: new SettingsModel()
        };
        
    self.device = {
            isIos: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
            isAndroid: /Android/.test(navigator.userAgent)
        };

    self.urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    
    self.priority = [
        {key: 'low'},
        {key: 'middle'},
        {key: 'height'},
        {key: 'urgent'}
    ];

    self.priorityArray = [ 'low', 'middle', 'height', 'urgent' ];

    self.state = {
        currentOpenMenu: 'group-menu',
        currentSelectedGroup: '',
        currentDependencyDocTitle: ko.observable(),
        currentOpenTodo: ko.observable({
            date: '',
            desc: '',
            done: false,
            group: '',
            prio: 0,
            time: '',
            title: ''
        }),
        allGroups: ko.observableArray(),
        allTodos: ko.observableArray(),
        filteredTodosWithDateInFuture: ko.observableArray(),
        filteredDatelessTodos: ko.observableArray(),
        settings: {
            docId: 0,
            syncToCouchDb: false,
            couchdbUserName: '',
            couchdbPassword: '',
            couchdbPrefix: '',
            couchdbUrl: ''
        }
    };

    //////////////////  Helper  /////////////////////////

    /**
     * will show a short flash message (notify)
     *
     * @param      {string}  msg     The notify message
     */
    self.setStatus = function(msg) {
        utils.status.show(msg);
    };

    self.parseInputToObj = function(data) {
        var formData = {};

        for (i = data.length; i--; ) {
            if( data[i].type !== 'checkbox') {
                formData[data[i].name] = data[i].value;
            } else {
                formData[data[i].name] = data[i].checked;                
            }
        }

        return formData;
    };

    self.resetForm = function(form) {
        form.reset();

        var menuOpeners = form.querySelectorAll('[type=button]');

        [].forEach.call(menuOpeners, function(input) {
            input.value =  input.dataset.placeholder;
        });
    }

    self.capitalizeWord = function(word) {
        return word.substr(0, 1).toUpperCase() + word.substr(1);
    };

    self.tmpFunc = function () {
        console.alert('vm.tmpFunc() is empty');
    };

    ///////////////////  Settings Section Functions  /////////////////////////

    self.overWriteDbWithBackup = function() {
        self.hideMenu();

        var obj = self.state.importedJsonBackupObject;
        self.state.importedJsonBackupObject = null;
        console.log(obj);

        var objectList = [];
        
        pm.removeAll('group', function() {        
            obj.group.map(function(group) {
                delete group.doc._rev;
                objectList.push(group.doc);
            });

            pm.saveList('group', objectList);
            objectList = [];
        });


        pm.removeAll('todo', function() {        
            obj.todo.map(function(todo) {
                delete todo.doc._rev;
                objectList.push(todo.doc);
            });

            pm.saveList('todo', objectList, location.reload());
        });        
    };

    self.importDatabaseBackupJsonFile = function(file) {

        if(file.name.indexOf('.json') === -1) {
            self.setStatus('This is not a JSON file');
            return;
        }
        
        if (typeof window.FileReader !== 'function') {
            self.setStatus('The file API isn\'t supported.\nCan\'t import the backup, sorry!');
            return;
        }

        var fr = new FileReader();

        fr.readAsText(file);
        fr.onload = function(e) {
            var obj = JSON.parse(e.target.result);

            self.state.importedJsonBackupObject = obj;

            if(typeof obj.group === 'undefined' || typeof obj.todo === 'undefined') {
                self.setStatus('This is not a valid backup file,\nno attribute "todo" or "group" has been found');
            }

            if(self.state.allGroups().length !== 0 || self.state.allTodos().length !== 0) {

                d.getElementById('confirm-text').innerHTML = 'Your local DB is not empty.\
                <br><br>Do you want to <b class="color-danger">overwrite</b> the local DB with the backup file ?';

                self.state.currentOpenMenu = 'default-confirm';
                self.showActionMenu();

                self.tmpFunc = self.overWriteDbWithBackup;
            } else {
                self.overWriteDbWithBackup();
            }
        };
    };

    self.prefillExportJsonFileBtn = function(a, obj) {

        if(typeof Base64 !== 'undefined') {
            a.href = 'data:application/octet-stream;charset=utf-8;base64,' + Base64.encode(JSON.stringify(obj));
        } else {
            a.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(obj));
        }

        a.download = 'fxos-app-todo-backup-' + fecha.format(new Date(), 'YYYY-MM-DD') + '.json';
    };

    /**
     * toggleAccordion will toggle an passed accordion
     * @param  {object} data knockout data object
     * @param  {event} e contains the accordion target id
     */
    self.toggleAccordion = function(data, e) {

        var accordionContent = d.getElementById(e.currentTarget.dataset.targetId),
            showAccordion = e.currentTarget.checked;

        accordionContent.style.display = showAccordion ? 'block' : 'none';
    };

    self.connectToCouchDb = function(data, e) {

        if(e.target.name !== 'couchdb-url') return;

        if(self.urlregex.test(self.state.settings.couchdbUrl)) {
            self.state.settings.syncToCouchDb = true;
            sm.transaction(self.state.settings);
            pm.initializeCouchDBSync(self.state.settings);
        } else {
            self.setStatus('The CouchDB URL is not valid');
        }
    }

    self.mapCouchDbSettingsToForm = function(settings) {
        console.log(settings);
        d.getElementById('do-sync-couchdb').checked = settings.syncToCouchDb;
        d.getElementById('accordion-content').style.display = 'block',
        d.getElementById('couchdb-user-name').value = settings.couchdbUserName;
        d.getElementById('couchdb-password').value = settings.couchdbPassword;
        d.getElementById('couchdb-prefix').value = settings.couchdbPrefix;
        d.getElementById('couchdb-url').value = settings.couchdbUrl;
    }

    self.initializeCouchDBSync = function(settings) {
        pm.initializeCouchDBSync(settings);
    }

    ///////////////////  Menu Functions  /////////////////////////
    
    self.showActionMenu = function() {
        d.getElementById(self.state.currentOpenMenu).className = 'fade-in';
    };

    self.hideActionMenu = function() {
        d.getElementById(self.state.currentOpenMenu).className = 'fade-out';
    };

    self.openMenu = function(data, e) {
        self.state.currentOpenMenu = e.currentTarget.dataset.targetId;
        self.state.menuBindingContext = e.currentTarget.dataset.bindingContext;
        self.state.menuBindingInputName = e.currentTarget.name;

        if(self.state.currentOpenMenu === 'edit-menu') {
            // in case of edit-menu is open
            // bindingContext is an pouchdb id
            var id = e.currentTarget.dataset.bindingContext;
            
            var doc = self.state.allTodos().filter(function(doc) {
                return doc.id === id;
            });

            doc = doc[0].doc;

            if (doc.dependency !== 'Dependency') {
                self.fillDependencyDoc(doc);
            }

            self.state.currentOpenTodo(doc);
            self.showActionMenu();
        } else if (self.state.currentOpenMenu === 'tag-menu') {
            if(e.keyCode === 51) {
                self.showActionMenu();
            };
        } else {
            self.showActionMenu();            
        }
    };

    self.hideMenu = function() {
        self.hideActionMenu();
        self.state.currentOpenMenu = '';
    };

    /**
     * just an auto animatio to return to the dashboard
     */
    self.offCanvasAutoBack = function() {

        d.querySelector('section.current').className = 'right';
        dashboard.className = 'current';        
    };

    /**
     * offCanvasAction - control all off canvas slides
     * from side navigation to some section and back
     * @param  {object} data knockout data object
     * @param {event} e is an event
     */
    self.offCanvasAction = function(data, e) {

        data = e.currentTarget.dataset;
        is = data.direction === 'current';

        location.hash = '';
        
        d.getElementById(data.targetId).className = is ? 'current skin-organic' : 'right skin-organic';        
        dashboard.className = is ? 'left' : 'current';

        self.hideActionMenu();

        if(data.targetId === 'database-section') {

            var a = d.getElementById('export-database-btn'),
                obj = {
                    todo: self.state.allTodos(),
                    group: self.state.allGroups()
                };

            self.prefillExportJsonFileBtn(a, obj);
        }
    };

    /**
     * handleActionBtnClick - will grep the value of the selection 
     * and write it back to currency field in form where the menu has been opened
     * @param  {object} data knockout data object
     * @param {event} e is an event
     */
    self.handleActionBtnClick = function(data, e) {

        title = e.target.dataset.title;

        if (self.state.menuBindingContext === 'header') {
            headerGroupMenuBtn.innerHTML = title;
            todoFormGroupIntput.value = title;
            self.state.currentSelectedGroup = title;
        } else {
            var input = d.querySelector('#' + self.state.menuBindingContext + ' [name=' + self.state.menuBindingInputName + ']');
            input.value = title;
        }
        
        self.hideActionMenu();
        self.loadFilteredTodos();
    };

    self.handleGroupDeleteBtnClick = function(data) {
        model.group.delete(data.id, function() {
            model.group.getAll(self.loadAll);
        });
    };

    self.handleEditMenuBtnClick = function(data, e) {
        var btnType = e.currentTarget.dataset.btnType,
            id = self.state.menuBindingContext;

        if( btnType === 'done' ) {
            model.todo.update(id, function(doc){
                self.hideActionMenu();
                doc.done = !doc.done;
                return doc;
            });
        } else if ( btnType === 'delete' ) {
            model.todo.delete(id, function() {
                self.hideActionMenu();
            });
        }
    };

    // self.checkDateAndShowChekbox = function(data, e) {
    //     var passedDateTime = e.target.valueAsNumber / 1000,
    //         currentDateTime = ~~(new Date().getTime() / 1000);
    //     var bool = passedDateTime > currentDateTime ? true : false;
    //     self.state.showCheckbox(bool);
    // };

    self.selectGroup = function(title) {
        self.state.currentSelectedGroup = title;
        headerGroupMenuBtn.innerHTML = title;
        todoFormGroupIntput.value = title;
    };

    self.saveFormData = function(data, e) {
        // i dont need the passed knockout data object data
        // and use it for click event dataset
        data = e.target.dataset;

        var targetForm = d.getElementById(data.targetForm),
            type = data.type;

        // if (targetForm === 'edit-mode-form' ) {
        //     vm.hideEditMode();
        // }

        data = targetForm.querySelectorAll('input, textarea');
        var formData = self.parseInputToObj(data);

        // FIXME: later with some regex
        // rip out hashtags of description
        // and put the hashtag(s) in own fromData attribute
        if(typeof formData.desc !== 'undefined' && formData.desc.indexOf('#') > -1 && type !== 'todo') {
            formData.hashtags = [];
            var tempArr = formData.desc.split(' ');
            formData.desc = '';

            for (var i = tempArr.length; i--;) {
                // if hashtag is set with #
                // push current saved hashtag to state array
                // and increment counter in db for ranking
                if (tempArr[i].indexOf('#') > -1) {
                    formData.hashtags.push(tempArr[i]);

                    model.settings.incrementHashtag(tempArr[i].substr(1));
                } else {
                    formData.desc += tempArr[i] + ' ';
                }
            }
        }

        model[type].transaction(formData);
        model[type].getAll(self.loadAll);
        self.resetForm(targetForm);

        if(type === 'group') {
            // in case of this is the first group wh has been created
            // hide welcome message in main section
            // if is not the first group, this 3 display sets will have no impact
            mainTodoList.style.display = 'block';
            noGroupsAvailableSection.style.display = 'none';
            circleBtn.style.display = 'block';

            // pre set header and form input for the new group who has been created
            // if you create a new group, you will enter todos there
            self.selectGroup(formData.title);
        // } else if (type === 'todo') {
        }

        
        self.offCanvasAutoBack(formData);
    };

    self.fillDependencyDoc = function(doc) {
        var id = doc.dependency;

        doc = self.state.filteredDatelessTodos().find(function(todo) {
            return todo.id === id;
        });

        if (!doc) {
            doc = self.state.filteredTodosWithDateInFuture().find(function(todo) {
                return todo.id === id;
            });                
        }

        self.state.currentDependencyDocTitle(doc.doc.title);
    };

    self.loadFilteredTodos = function() {
        var todos = self.filterTodoForGroup(self.state.currentSelectedGroup);
        todos = self.sortOutTodosWithDateInFuture(todos);
        self.state.filteredTodosWithDateInFuture(self.orderTodosFor('unixTimeStamp', todos.filteredTodosWithDateInFuture, 'DESC'));
        self.state.filteredDatelessTodos(self.orderTodosFor('prio', todos.filteredDatelessTodos, 'ASC'));

    };

    self.filterTodoForGroup = function(group) {
        return self.state.allTodos().filter(function(todo) {
            return group === todo.doc.group;
        });
    };

    self.sortOutTodosWithDateInFuture = function(todos) {

        var todaysDate = ~~(new Date().getTime() / 1000),
            todoExpDate = todaysDate,
            filteredTodosWithDateInFuture = [],
            filteredDatelessTodos = [];

        todos.map(function(todo) {
            if(todo.doc.date !== '') {
                todoExpDate = ~~(new Date(fecha.parse(todo.doc.date, 'YYYY-MM-DD')).getTime() / 1000);
            } else {
                todoExpDate = todaysDate;
            }

            if(todoExpDate > todaysDate) {
                todo.doc.unixTimeStamp = todoExpDate;
                filteredTodosWithDateInFuture.push(todo);
            } else {
                filteredDatelessTodos.push(todo);
            }
        });

        return {
            filteredTodosWithDateInFuture: filteredTodosWithDateInFuture, 
            filteredDatelessTodos: filteredDatelessTodos};
    };

    self.orderTodosFor = function(attr, todos, direction) {
        
        if(direction === 'DESC') {
            return todos.sort(function(t1, t2) {
                return t1.doc[attr] > t2.doc[attr];
            });
        } else {
            return todos.sort(function(t1, t2) {
                return t1.doc[attr] < t2.doc[attr];
            });            
        }
    };

    self.nukeAllDataBases = function() {
        console.log('kill all');
        pm.nukeAllDataBases();
        self.init();
    };

    self.loadAll = function(type, doc) {
        self.state['all' + self.capitalizeWord(type) + 's'](doc.rows);

        // if group-menu has select a new group
        // filter all todos for this group
        if(type === 'todo') {
            self.loadFilteredTodos();
        }
    };

    self.init = function() {

        model.group.getAll(self.loadAll);
        model.todo.getAll(self.loadAll);
        model.group.getAll(function(type, doc) {
            if(doc && doc.rows.length === 0) {
                // show button & text to create a group
                mainTodoList.style.display = 'none';
                noGroupsAvailableSection.style.display = 'block';
                circleBtn.style.display = 'none';

            } else if(doc && doc.rows && doc.rows.length) {
                self.selectGroup(doc.rows[0].doc.title);
                self.loadFilteredTodos();
            }
        });
        model.settings.fill(self);
    };

    self.init();
};
/* eslint-disable eslint-enable camelcase */
var vm = new ViewModel();
/* eslint-enable eslint-enable camelcase */
ko.applyBindings(vm);
