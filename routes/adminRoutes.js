const express = require('express');
const routes = express.Router();
const auth = require('../middlewares/authMiddlewere');
const permissionControl = require('../controllers/admin/permisionController');
const roleControl = require('../controllers/admin/roleController');

const { onlyAdminAccess } = require('../middlewares/adminMiddlewere');
const { PermisionValidator , PermisionDeleteValidator, PermisionUpdateValidator, StoreRoleValidator} = require('../helpers/adminValidator');

// Permision routes ---------
routes.post('/add-permission', auth, onlyAdminAccess, PermisionValidator, permissionControl.AddPermision);
routes.get('/get-permission', auth, onlyAdminAccess, permissionControl.GetPermision);
routes.delete('/delete-permission', auth, onlyAdminAccess, PermisionDeleteValidator, permissionControl.DeletePermision);
routes.put('/update-permission', auth, onlyAdminAccess, PermisionUpdateValidator, permissionControl.UpdatePermision);

// Role routes --------------
routes.post('/add-role', auth, onlyAdminAccess, StoreRoleValidator ,roleControl.StoreRole);
routes.get('/get-role', auth, onlyAdminAccess, roleControl.GetRole);

module.exports = routes;