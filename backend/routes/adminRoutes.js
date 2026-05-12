import express from 'express';
import { requireAdmin } from '../middleware/requireAdmin.js';
import verifyToken from '../middleware/verifyToken.js';
import { getAllUsers, getUser, editUser, deleteUser, addCertificate, getAllCerts, getCertificate, deleteCertificate, revokeCertificate, toggleUserActivation } from '../controllers/adminControllers.js';
import College from '../models/College.js';
import Department from '../models/Department.js';
import Programme from '../models/Programme.js';

const router = express.Router();

router.get('/users', verifyToken, requireAdmin, getAllUsers);

router.get('/certificates', verifyToken, requireAdmin, getAllCerts);

router.get('/certificate/:id', verifyToken, requireAdmin, getCertificate);

router.get('/users/:id', verifyToken, requireAdmin, getUser);

router.post('/addCertificate', verifyToken, requireAdmin, addCertificate);

router.put('/users/toggle/:id', verifyToken, requireAdmin, toggleUserActivation);

router.put('/users/:id', verifyToken, requireAdmin, editUser);

router.delete('/users/:id', verifyToken, requireAdmin, deleteUser);

router.put('/certificate/:id', verifyToken, requireAdmin, revokeCertificate);

router.delete('/certificate/:id', verifyToken, requireAdmin, deleteCertificate);

router.get('/colleges', async (req, res) => {
    try {
        const colleges = await College.find();
        res.json(colleges);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
});

router.get('/departments/:collegeId', async (req, res) => {
    try {
        const departments = await Department.find({
            college: req.params.collegeId
        });
        res.json(departments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
});

router.get('/programmes/:departmentId', async (req, res) => {
    try {
        const programmes = await Programme.find({
            department: req.params.departmentId
        });
        res.json(programmes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
});


export default router;