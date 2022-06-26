import express from 'express';
const router = express.Router();
import {getallmenu, getByName} from './Routesmenu.js'
import {getAllTabals, getTabelBystatus} from './RoutTabales.js'
import {getAllUsers, 
    getUsersByStatus, 
    createGroup, 
    deleteGroup, 
    editGroup
} from './users.js'


router.get('/menu', getallmenu)
router.get('/menu/:name', getByName)
router.get('/tabel', getAllTabals)
router.get('/tabel/:status', getTabelBystatus)
// router.put('/tabel/:id/adit',)
router.get('/ShowQueue', getAllUsers)
router.get('/ShowQueue/:status', getUsersByStatus)
// router.get('/ShowQueue/:status/:name', )
router.post('/createGroup', createGroup)
router.delete('/deleteGroup/:GroupSeqNo', deleteGroup)
router.put('/SitByPriority', editGroup)


export default router 