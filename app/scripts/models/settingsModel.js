// 'use strict';


// /* Settings Model */
// const SettingsModel = function() {
//     let type = 'settings',
//         self = this;

//     self.docId = 0;
//     self.allHashtags = {};

//     self.transaction = (formData) => {

//         pm.update(type, self.docId, (doc) => {

//             let allKeys = Object.keys(formData),
//                 key;

//             for (let i = allKeys.length; i--; ) {
//                 key = allKeys[i];
//                 doc[key] = formData[key];
//             }

//             return doc;
//         });        
//     };

//     self.incrementHashtag = (tag) => {

//         // let allHashtagKeys = Object.keys(self.allHashtags);

//         // if this tag dosen't exist create an key with a start counter
//         if(self.allHashtags[tag] === undefined) {
//             self.allHashtags[tag] = 1;

//         // if key exist, find and increment them
//         } else {            
//             self.allHashtags[tag]++;           
//         }

//         // update all hastags with current state the in settings document
//         pm.update(type, self.docId, (doc) => {
//             doc.hashtags = self.allHashtags;

//             // update hashtag menu
//             vm.initializeHashtagMenu(doc.hashtags);
//             return doc;
//         });        
//     };

//     self.createSettingsDoc = (language, settingsModel) => {
        
//         // save a default settings document and
//         // set the response id of this doc to state for
//         // self.docId will be used later to grep and update the settings doc
//         // so I dosn't need to grep all seetings documents to filter the first out of this
//         // every time I want to update  the settings 
//         pm.save('settings', {lang: language, hashtags : {}}, (doc) => {
//             // 'cause this function is the calssback in the pouchModel
//             // wee ned to write to settingsModel.docId and not self.docId
//             settingsModel.docId = doc.id;
//         });
//     };

//     self.getAllSettings = (model, functionName) => {
//         pm.getAll(type, (result) => {
//             model[functionName](result);
//         });
//     };
// }

// export default new SettingsModel();
