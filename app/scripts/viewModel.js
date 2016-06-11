
var ViewModel = function() {
    var self = this,
        i = 0,
        data,
        is,
        d = document,
        title = '',
        headerGroupMenuBtn = d.querySelector('#drawer h1'),
        todoFormGroupIntput = d.querySelector('#todo-form [name=group]'),
        //circleNav = d.getElementById('c-circle-nav'),
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

    self.priorityArray = ['low','middle','height','urgent'];

    self.state = {
        currentOpenMenu: 'group-menu',
        currentSelectedGroup: '',
        currentOpenTodo: ko.observable({
            date: "",
            desc: "",
            done: false,
            group: "",
            prio: 0,
            time: "",
            title: ""
        }),
        allGroups: ko.observableArray(),
        allTodos: ko.observableArray(),
        filteredTodosWithDateInFuture: ko.observableArray(),
        filteredDatelessTodos: ko.observableArray()
        //showCheckbox: ko.observable(false)
    };

    // Helper

    self.setStatus = (msg) => {
        utils.status.show(msg);
    };

    self.parseInputToObj = (data) => {
        formData = {};

        for (i = data.length; i--; ) {
            if( data[i].type !== 'checkbox') {
                formData[data[i].name] = data[i].value;
            } else {
                formData[data[i].name] = data[i].checked;                
            }
        }

        return formData;
    };

    self.capitalizeWord = (word) => {
        return word.substr(0,1).toUpperCase() + word.substr(1);
    };

    // Menu Functions

    self.showActionMenu = () => {
        d.getElementById(self.state.currentOpenMenu).className = 'fade-in';
    };

    self.hideActionMenu = () => {
        d.getElementById(self.state.currentOpenMenu).className = 'fade-out';
    };

    self.openMenu = (data, e) => {
        self.state.currentOpenMenu = e.currentTarget.dataset.targetId;
        self.state.menuBindingContext = e.currentTarget.dataset.bindingContext;
        self.state.menuBindingInputName = e.currentTarget.name;

        if(self.state.currentOpenMenu === 'edit-menu') {
            // in case of edit-menu is open
            // bindingContext is an pouchdb id
            model.todo.get(e.currentTarget.dataset.bindingContext, function(doc) {
                self.state.currentOpenTodo(doc);
                console.log(self.state.currentOpenTodo())
                self.showActionMenu();

            });
        } else {
            self.showActionMenu();            
        }
    };

    self.hideMenu = (data, e) => {
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
     * @param  {event} e contains the accordion target id
     * @return {null} no return
     */
    self.toggleAccordion = (data, e) => {
        let accordionContent = d.getElementById(e.currentTarget.dataset.targetId),
            showAccordion = e.currentTarget.checked;

        accordionContent.style.display = showAccordion ? 'block' : 'none';
    };

    /**
     * showAccordionContent will make a default hidden accordion visible
     * @param  {string} targetId DOM id
     * @return {null} no return
     */
    self.showAccordionContent = (targetId) => {
        let accordionContent = d.getElementById(targetId);

        accordionContent.style.display = 'block';
    };

    /**
     * just an auto animatio to return to the dashboard
     * @param {object} doc is a pouchdb document
     * @return {null} no return
     */
    self.offCanvasAutoBack = (doc) => {        

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
     * @param {event} e is an event
     * @return {null} no return
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
     * @param {string} choice is the choosen action menu button content
     * @return {null} no return
     */
    self.handleActionBtnClick = (data, e) => {

        title = e.target.dataset.title;

        if (self.state.menuBindingContext === "header") {
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

    self.handleGroupDeleteBtnClick = (data, e) => {
        model.group.delete(data.id, function() {
            model.group.getAll(self.loadAll);
        });
    };

    self.handleEditMenuBtnClick = (data, e) => {
        var btnType = e.currentTarget.dataset.btnType,
            id = self.state.menuBindingContext;

        console.log(btnType);

        if( btnType === 'done' ) {
            model.todo.update(id, function(doc){
                self.hideActionMenu();
                doc.done = !doc.done;
                console.log(doc);
                return doc;
            });
        } else if ( btnType === 'delete' ) {
            model.todo.delete(id, function(){
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

    self.saveFormData = (data, e) => {
        // i dont need the passed knockout data object data
        // and use it for click event dataset
        data = e.target.dataset;
        targetForm = d.getElementById(data.targetForm);
        type = data.type;

        // if (targetForm === 'edit-mode-form' ) {
        //     vm.hideEditMode();
        // }

        data = targetForm.querySelectorAll('input');
        formData = self.parseInputToObj(data);

        // FIXME: later with some regex
        // rip out hashtags of description
        // and put the hashtag(s) in own fromData attribute
        if(typeof formData.desc !== 'undefined' && formData.desc.indexOf('#') > -1 && type !== 'todo') {
            formData.hashtags = [];
            let tempArr = formData.desc.split(' ');
            formData.desc = '';

            for (let i = tempArr.length; i--;) {
                // if hashtag is set with #
                // push current saved hashtag to state array
                // and increment counter in db for ranking
                if (tempArr[i].indexOf('#') > -1) {
                    formData.hashtags.push(tempArr[i]);

                    model.settings.incrementHashtag(tempArr[i].substr(1));
                } else {
                    formData.desc += `${tempArr[i]} `;
                }
            }
        }

        model[type].transaction(formData);
        model[type].getAll(self.loadAll);
        targetForm.reset();
        
        self.offCanvasAutoBack(formData);
    };

    self.loadFilteredTodos = () => {
        var todos = self.filterTodoForGroup(self.state.currentSelectedGroup);
        todos = self.sortOutTodosWithDateInFuture(todos);
        self.state.filteredTodosWithDateInFuture(self.orderTodosFor('unixTimeStamp', todos.filteredTodosWithDateInFuture, 'DESC'));
        self.state.filteredDatelessTodos(self.orderTodosFor('prio', todos.filteredDatelessTodos, 'ASC'));

    };

    self.filterTodoForGroup = (group) => {
        return self.state.allTodos().filter((todo) => {
            return group === todo.doc.group;
        });
    };

    self.sortOutTodosWithDateInFuture = (todos) => {

        var todaysDate = ~~(new Date().getTime() / 1000),
            todoExpDate = todaysDate,
            filteredTodosWithDateInFuture = [],
            filteredDatelessTodos = [];

        todos.map(function(todo) {
            if(todo.doc.date !== '') {
                todoExpDate = ~~(new Date(fecha.parse(todo.doc.date, 'YYYY-MM-DD')).getTime() / 1000);
            } else {
                todoExpDate = todaysDate
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

    self.orderTodosFor = (attr, todos, direction) => {
        
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
            if(doc && doc.rows.length == 0) {
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
}

var vm = new ViewModel();

ko.applyBindings(vm);