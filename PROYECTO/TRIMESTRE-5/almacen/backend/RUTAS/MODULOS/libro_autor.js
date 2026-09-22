import { Router } from 'express';
import controller from '../CONTROLADORES/libroAutorController.js';
const router = Router();
router.get('/', controller.index);
router.get('/:id_libro/:id_autor', controller.show);
router.post('/', controller.store);
router.put('/:id_libro/:id_autor', controller.update);
router.delete('/:id_libro/:id_autor', controller.destroy);
export default router;
