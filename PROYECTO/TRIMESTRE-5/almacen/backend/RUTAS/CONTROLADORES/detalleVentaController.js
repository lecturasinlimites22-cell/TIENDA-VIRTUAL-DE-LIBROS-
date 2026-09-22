import { createHandlers } from './crudController.js';
const { listar: index, crear: store, obtener: show, actualizar: update, eliminar: destroy } = createHandlers('detalle_venta');
export default { index, store, show, update, destroy };
