import { createHandlers } from './crudController.js';

// Controlador del recurso Autor: index, store, show, update y destroy.
const { listar: index, crear: store, obtener: show, actualizar: update, eliminar: destroy } = createHandlers('autor');
export default { index, store, show, update, destroy };
