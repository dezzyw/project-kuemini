const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuControllers');

// GET all menu items
router.get('/', menuController.getAllMenuItems);

//post menu items
router.post('/', menuController.postMenuItem);

//delete menu items
router.delete('/:id', menuController.deleteMenuItem);

//gte single menu item
router.get('/:id', menuController.singleMenuItem);

//update menu item
router.patch('/:id', menuController.updatedMenuItem)

module.exports = router;
