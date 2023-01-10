const { Router } = require('express');
const { check } = require('express-validator');
const { requestFilter, getFilterList} = require('../controllers/network.controllers');
 

const router = Router();


router.post('/filter', [
    check('id', 'ID field required.').not().isEmpty(),
    check('toggle', 'TOGGLE field required.').not().isEmpty()
], requestFilter);


router.get('/filter',
    getFilterList);



module.exports = router;