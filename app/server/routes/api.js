var databaseService = require('../services/database-service');

module.exports = function(app, express) {

    var apiRouter = express.Router();

    // get all contacts
    apiRouter.get('/contacts', function(req, res) {
        databaseService.getContactList(req, res);
    });

    // get specific contact
    apiRouter.get('/contacts/:contactId', function(req, res) {
        databaseService.getContact(req, res);
    });

    // update contact information
    apiRouter.put('/contacts', function(req, res) {
        databaseService.updateContact(req, res);
    });

    // delete contact
    apiRouter.delete('/contacts/:contactId', function(req, res) {
        databaseService.deleteContact(req, res);
    });

    // add new contact
    apiRouter.post('/contacts', function(req, res) {
        databaseService.addContact(req, res);
    });

    return apiRouter;
};
