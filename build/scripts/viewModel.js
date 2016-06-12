'use strict';

var ViewModel = function() {
    var self = this,
        i = 0,
        is,
        d = document,
        title = '',
        headerGroupMenuBtn = d.querySelector('#drawer h1'),
        todoFormGroupIntput = d.querySelector('#todo-form [name=group]'),
        dashboard = d.querySelector('[data-position="current"]'),
        model = {
            todo: new TodoModel(),
            group: new GroupModel()
        };

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
        filteredDatelessTodos: ko.observableArray()
    };

    // Helper

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

    self.capitalizeWord = function(word) {
        return word.substr(0, 1).toUpperCase() + word.substr(1);
    };

    // Menu Functions

    self.showActionMenu = function() {
        d.getElementById(self.state.currentOpenMenu).className = 'fade-in';
    };

    self.hideActionMenu = function() {
        void 0;
        d.getElementById(self.state.currentOpenMenu).className = 'fade-out';
    };

    self.openMenu = function(data, e) {
        self.state.currentOpenMenu = e.currentTarget.dataset.targetId;
        self.state.menuBindingContext = e.currentTarget.dataset.bindingContext;
        self.state.menuBindingInputName = e.currentTarget.name;

        if(self.state.currentOpenMenu === 'edit-menu') {
            // in case of edit-menu is open
            // bindingContext is an pouchdb id
            model.todo.get(e.currentTarget.dataset.bindingContext, function(doc) {
                self.state.currentOpenTodo(doc);
                self.showActionMenu();

            });
        } else {
            self.showActionMenu();            
        }
    };

    self.hideMenu = function(data, e) {
        e.preventDefault();

        // if(self.state.currentOpenMenu === 'account-menu') {
        //     self.hidegroupMenu();
        // } else {
        self.hideActionMenu();
        // }

        self.state.currentOpenMenu = '';
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

    /**
     * showAccordionContent will make a default hidden accordion visible
     * @param  {string} targetId DOM id
     */
    self.showAccordionContent = function(targetId) {
        var accordionContent = d.getElementById(targetId);

        accordionContent.style.display = 'block';
    };

    /**
     * just an auto animatio to return to the dashboard
     */
    self.offCanvasAutoBack = function() {        

        // if(self.isFirstAccount && typeof doc !== 'undefined') {
        //     self.hideNoAccountsAvailableSection(doc);
        //     self.prefillAllInputsWithThis(doc.name);
        //     mainCurrentAccountInfoNode.id = doc._id;
        // }

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
        
        d.getElementById(data.targetId).className = is ? 'current skin-organic' : 'right skin-organic';        
        dashboard.className = is ? 'left' : 'current';

        self.hideActionMenu();
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

    self.saveFormData = function(data, e) {
        // i dont need the passed knockout data object data
        // and use it for click event dataset
        data = e.target.dataset;

        var targetForm = d.getElementById(data.targetForm),
            type = data.type;

        // if (targetForm === 'edit-mode-form' ) {
        //     vm.hideEditMode();
        // }

        data = targetForm.querySelectorAll('input');
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
        targetForm.reset();
        
        self.offCanvasAutoBack(formData);
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
            } else if(doc && doc.rows && doc.rows.length) {
                title = doc.rows[0].doc.title;

                self.state.currentSelectedGroup = title;
                headerGroupMenuBtn.innerHTML = title;

                self.loadFilteredTodos();
            }
        });
    };

    self.init();
};
/* eslint-disable eslint-enable camelcase */
var vm = new ViewModel();
/* eslint-enable eslint-enable camelcase */
ko.applyBindings(vm);
