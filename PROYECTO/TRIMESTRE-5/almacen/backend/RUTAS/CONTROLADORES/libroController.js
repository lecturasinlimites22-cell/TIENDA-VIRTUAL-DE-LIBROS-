import { createHandlers } from './crudController.js';
const { listar: index, crear: store, obtener: show, actualizar: update, eliminar: destroy } = createHandlers('libro');
export default { index, store, show, update, destroy };
