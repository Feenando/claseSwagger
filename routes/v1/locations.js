// Include controllers file
var LocationController = require('../../controllers/locations');
//initialize
module.exports = function (router) {
    
    router.get('/usuarios/:id_usuario/locations', LocationController.getUserLocations);
    router.get('/usuarios/:id_usuario/locations/:id', LocationController.getUserLocationById);
    router.post('/usuarios/:id_usuario/locations', LocationController.addUserLocation );
    router.patch('/usuarios/:id_usuario/locations/:id', LocationController.updateUserLocation);
    router.delete('/usuarios/:id_usuario/locations/:id', LocationController.deleteUserLocationById);
}
