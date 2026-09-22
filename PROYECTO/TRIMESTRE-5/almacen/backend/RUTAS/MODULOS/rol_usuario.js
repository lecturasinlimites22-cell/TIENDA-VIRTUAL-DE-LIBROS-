import { Router } from 'express';
import controller from '../CONTROLADORES/rolUsuarioController.js';
const router = Router();
router.get('/', controller.index);
router.get('/:id_rol/:id_usuario', controller.show);
router.post('/', controller.store);
router.put('/:id_rol/:id_usuario', controller.update);
router.delete('/:id_rol/:id_usuario', controller.destroy);
export default router;
