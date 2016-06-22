'use strict';

var SettingsModel = function() {
    var type = 'settings',
        self = this;

    self.allHashtags = {};

    self.transaction = function(settings) {

        pm.update(type, settings.docId, function(doc) {

            Object.keys(settings).map(function(key) {
                doc[key] = settings[key];
            });

            console.log(doc);
            return doc;
        });        
    };

    // fill the view model with the settings configurations
    self.fill = function(viewModel) {
        pm.getAll(type, (result) => {
            // check if a settings document exist
            if(result.total_rows) {
                var doc = result.rows[0].doc;
                viewModel.state.settings.docId = doc._id;

                Object.keys(viewModel.state.settings).map(function(key) {
                    // fill the viewModel.state.settings with all values
                    if(typeof doc[key] !== 'undefined') {
                        viewModel.state.settings[key] = doc[key];
                    }
                });
                
                viewModel.initializeCouchDBSync(viewModel.state.settings);
                viewModel.mapCouchDbSettingsToForm(viewModel.state.settings);
            // else create a prefilled one
            } else {
                // save a default settings document and
                // set the response id of this doc to state for
                // self.docId will be used later to grep and update the settings doc
                // so I dosn't need to grep all seetings documents to filter the first out of this
                // every time I want to update  the settings 
                pm.save('settings', {lang: 'en'}, function(doc) {
                    // 'cause this function is the calssback in the pouchModel
                    // wee ned to write to settingsModel.docId and not self.docId
                    viewModel.state.settings.docId = doc.id;
                });
            }
        });
    };
}
/* eslint-disable no-unused-vars */
var sm = new SettingsModel();
/* eslint-enable no-unused-vars */
