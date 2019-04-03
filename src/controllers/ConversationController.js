const UserService = require('../services/UserService');
const conversationService = require('../services/conversationService');
const messageService = require('../services/messageService');
const CRUDrequestHandler = require('../util/index').CRUDrequestHandler;

module.exports = {
    ...CRUDrequestHandler(conversationService),
    getList(req, res) {
        conversationService.getByUser(req.params.id)
            .then(resp => res.send(resp))
            .catch(console.log)
    },
    addToGroup(req, res) {
        conversationService.addUser(req.params.id, req.body.users)
            .then(resp => res.send(resp))
            .catch(console.log)
    },
    removeFromGroup(req, res) {
        conversationService.removeUser(req.params.id, req.body.users)
            .then(resp => res.send(resp))
            .catch(console.log)
    }
};