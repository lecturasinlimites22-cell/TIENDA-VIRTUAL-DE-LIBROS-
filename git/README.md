# Areas de git

    1. working directory, working tree, directorio de trabajo: es donde se encuentran los archivos del proyecto en el sistema de archivos.
    2. staging area, área de preparación: es donde se colocan los archivos que se van a incluir en el próximo commit. se agregan con el comando git add.
    3. repository, repositorio: es donde se almacenan todos los commits y la historia del proyecto. se crean con el comando git commit.

# Estados de los archivos en git

    1. untracked, no rastreado: es un archivo que no está siendo rastreado por git. no se encuentra en el área de preparación ni en el repositorio.
    2. modified, modificado: es un archivo que ha sido modificado pero aún no ha sido agregado al área de preparación.
    3. staged, preparado: es un archivo que ha sido agregado al área de preparación y está listo para ser incluido en el próximo commit.
         que no ha sido modificado desde el último commit.




# Comandos básicos de Git

- git -v : me dices que version de git tengo instalada

- git config --global -l: sirve para ver las confuguraciones globales de git para salir de aqui presionamos la tecla q en linux

- git config --global user.name "[nombre del programador entre comillas]": sirve para configurar el usuario con el que se hacen los commit
- git config --global user.email "[email de la cuenta github]": sirve para configurar el correo del usuario que va hacer los commit

- git config --system -l : muestra la configuración del sistema
- git config --global -l : muestra la configuración global del usuario
- git config --local -l : muestra la configuración local del repositorio actual
- git config --list : muestra todas las configuraciones de Git, incluyendo las del sistema,

- git init : inicializa un repositorio git en el directorio actual

NOTA: si le sale la rama master en vez de main se puede usar el comando         
    git config --global init.defaultBranch main: este es para la configuración del usuario
    git config --system init.defaultBranch main: este es para la configuración del usuario


- git add [nombre del arcchivo]: sirve para agregar un archivo al staging area(area de preparación)
- git add . : agrega todos los archivos modificados al área de preparación (staging area)


- git status : muestra el estado del repositorio, incluyendo archivos modificados y no rastreados

- git clone [url del repositorio] : clona el repositorio en tu máquina local

- git commit -m "[mensaje del commit]" : crea un nuevo commit con el mensaje especificado.
- git commit -a -m "[mensaje del commit]" : crea un nuevo commit con todos los archivos modificados y el mensaje especificado.
- git commit --amend -m "[nuevo mensaje del commit]" : modifica el último commit con un nuevo mensaje.
- git commit --amend : modifica el último commit usando el editor vim.
- git commit --amend --no-edit : modifica el último commit sin cambiar el mensaje y sin abrir el editor de texto.

- git notes add -m "[nota del commit]" : agrega una nota al último commit.
- git notes show : muestra las notas del último commit.
- git notes list : lista todas las notas de los commits.
- git notes remove : elimina la nota del último commit.
- git notes edit : edita la nota del último commit habre un vim para hacer la edición.
- git notes edit [checksum del commit]: para editar la nota de un commit que no es el ultimo.

- git notes add -m "[nota del commit]" [hash del commit] : agrega una nota al commit especificado.

Nota: para salir de las notas, presiona `q`.

- git restore [archivo o con . para todos los archivos] : descarta los cambios en un archivo específico y lo restaura a la última versión confirmada que esten en working directory.
- git restore --staged [nombre del archivo]: este comando pasa un archivo del area de preparación al working directory
- git restore --staged . : pasa todos los archivos que tenga en area de preparación al working directory

- git reset [hash del commit] : restablece el repositorio al estado del commit especificado, eliminando todos los commits posteriores.
- git reset --hard [hash del commit] : restablece el repositorio al estado del commit especificado, eliminando todos los commits posteriores y los cambios en el área de trabajo.
- git reset --soft [hash del commit] : restablece el repositorio al estado del commit especificado, manteniendo los cambios en el staging area y working directory.
- git reset --mixed [hash del commit] : restablece el repositorio al estado del commit especificado, manteniendo los cambios en el área de trabajo y en el área de preparación.

- git rm [archivo] : elimina un archivo del repositorio y del área de preparación.
- git rm -f [archivo]: elimina de forma forzada en caso de que el archvio este en staging area.
- git rm --cached [archivo] : elimina un archivo del área de preparación pero lo deja en el directorio de trabajo.
- git rm -r [directorio] : elimina un directorio y su contenido del repositorio y del área de preparación.
- git rm -r --cached [directorio] : elimina un directorio del área de preparación pero lo deja en el directorio de trabajo.

- git mv [archivo original] [archivo nuevo] : renombra un archivo en el repositorio y en el área de preparación.
- git mv [directorio original] [directorio nuevo] : renombra un directorio en el repositorio y en el área de preparación.
- git mv [archivo] [directorio] : mueve un archivo al directorio especificado y lo agrega al área de preparación.

- git branch : lista todas las ramas del repositorio.
- git branch [nombre de la rama] : crea una nueva rama con el nombre especificado
- git branch -a : lista todas las ramas, incluyendo las remotas.
- git branch -r : lista solo las ramas remotas.
aqui vamos
- git branch -d [nombre de la rama] : elimina la rama especificada.
- git branch -D [nombre de la rama] : elimina la rama especificada de forma forzada.
- git branch --unset-upstream : elimina la rama upstream de la rama local.
- git branch --move [nombre de la rama antigua] [nombre de la rama nueva] : renombra una rama local.
- git branch -vv : muestra información detallada sobre las ramas locales, incluyendo el último commit y el upstream.
- git branch -M [nombre de la rama nueva] : renombra la rama actual a el nombre especificado, incluso si el nuevo nombre ya existe.

- git checkout [nombre de la rama] : cambia a la rama especificada.
- git checkout -b [nombre de la rama] : crea una nueva rama y cambia a ella.
- git checkout -- [archivo] : descarta los cambios en un archivo específico y lo restaura a la última versión confirmada o lo que esta en el staging area.
- git checkout [hash del commit] : cambia al estado del repositorio en el commit especificado.
- git checkout [hash del commit] -- [archivo] : descarta los cambios en un archivo específico y lo restaura al estado del commit especificado.
- git checkout - : cambia a la última rama en la que estabas.

- git switch [nombre de la rama]: cambia a la rama especificada (equivalente a `git checkout [nombre de la rama]`) pero mas seguro.
- git switch -c [nombre de la rama]: crea una nueva rama y cambia a ella (equivalente a `git checkout -b [nombre de la rama]`).

- git merge [nombre de la rama] : fusiona la rama especificada en la rama actual.
    Entramos como modo merge
        - git merge --abort: abortamos el merge.
        - git merge --continue: luego de solucionar los conflictos y tengamos todos en area de prepacion se ejecuta este comando para cerrar el merge y el hace commit cuidad abre la terminal de vim para mandar el mensaje del commit.
- git merge --no-ff [nombre de la rama] : fusiona la rama especificada en la rama actual, creando un commit de fusión incluso si la fusión podría haberse realizado con un avance rápido(fast-forward).
- git merge --squash [nombre de la rama] : fusiona la rama especificada en la rama actual, pero aplana todos los commits en un solo commit.
- git merge --abort : aborta una fusión en curso y restaura el estado del repositorio al estado anterior a la fusión.
- git merge --continue : continúa una fusión después de resolver conflictos.

- git log : muestra el historial de commits del repositorio(muestra el checksum).
- git log --oneline : muestra el historial de commits en una sola línea por commit
- git log --graph : muestra el historial de commits en forma de gráfico.
- git log --all : muestra el historial de commits de todas las ramas del repositorio.
- git log -[numero]: muestre los commits desde el ultimo hasta el numero que se dijite.
- git log --date-order: muestra los commit en orden de fecha.
- git log --oneline --all --graph --date-order: mescla de los anteriores.

- git stash : guarda los cambios no confirmados en un área temporal y limpia el área de trabajo.
- git stash list : muestra la lista de cambios guardados en el stash.
- git stash apply : aplica los cambios guardados en el stash al área de trabajo.
- git stash pop : aplica los cambios guardados en el stash al área de trabajo y elimina el stash.
- git stash drop : elimina el stash especificado.
- git stash clear : elimina todos los stashes.  
- git stash push -m "[mensaje del stash]" : guarda los cambios no confirmados en el stash con un mensaje descriptivo.

Nota: esto dos siguientes comandos son equivalentes y servian en la version 2.13 de git y posteriores.

- git stash push --include-untracked --keep-index : guarda los cambios no confirmados y los archivos no rastreados en el stash, manteniendo el índice. ojo solo guarda lo del working directory.
alias: git stash -u -k
- git stash push --include-untracked : guarda los cambios del working directory y los archivos no rastreados en el stash.
alias: git stash -u

- git tag : lista todas las etiquetas del repositorio.
- git tag [nombre de la etiqueta] : crea una nueva etiqueta con el nombre especificado.
- git tag -a [nombre de la etiqueta] -m "[mensaje de la etiqueta]" : crea una nueva etiqueta anotada con el nombre y mensaje especificados.
- git tag -d [nombre de la etiqueta] : elimina la etiqueta especificada.
- git tag -n : muestra las etiquetas con sus mensajes.

- git push origin --tags : sube todas las etiquetas locales al repositorio remoto.
- git push origin [nombre de la etiqueta] : sube la etiqueta especificada al repositorio remoto.

Nota: las siguientes se necesita configurar GPG para firmar las etiquetas.

- git tag -s [nombre de la etiqueta] : crea una nueva etiqueta firmada con el nombre especificado.
- git tag -v [nombre de la etiqueta] :verifica la firma de la etiqueta especificada.

- git worktree add [ruta del nuevo directorio] [nombre de la rama] : crea un nuevo árbol de trabajo en la ruta especificada y cambia a la rama especificada.
- git worktree list : lista todos los árboles de trabajo asociados al repositorio.
- git worktree remove [ruta del directorio] : elimina el árbol de trabajo en la ruta especificada.
- git worktree prune : elimina los árboles de trabajo que ya no están asociados al repositorio.

- git fetch : descarga los cambios del repositorio remoto sin fusionarlos en la rama actual.
- git fetch [remoto] : descarga los cambios del repositorio remoto especificado sin fusionarlos en la rama actual.
- git fetch --all : descarga los cambios de todos los repositorios remotos sin fusionarlos en la rama actual.
- git fetch --prune : elimina las ramas remotas que ya no existen en el repositorio remoto y descarga los cambios restantes.
- git fetch --tags : descarga todas las etiquetas del repositorio remoto sin fusionarlas en la rama actual.

    Ejemplo rápido (flujo típico):

Traer cambios del remoto
git fetch origin
Ver qué cambió en main sin tocar tu rama local
git log --oneline --graph HEAD..origin/main
git diff HEAD..origin/main
Si quieres actualizar tu main con lo descargado
git checkout main
git merge --ff-only origin/main (o, si prefieres rebase: git rebase origin/main)
Equivalente con pull: git pull --ff-only

- git pull: descarga los cambios del repositorio remoto y los fusiona en la rama actual.
- git pull [remoto] : descarga los cambios del repositorio remoto especificado y los fusiona en la rama actual.
- git pull --rebase : descarga los cambios del repositorio remoto y los aplica en la parte superior de la rama actual, reescribiendo el historial de commits.
- git pull --ff : descarga los cambios del repositorio remoto y los fusiona en la rama actual solo si se puede hacer un avance rápido si no genera un merge.
- git pull --ff-only : descarga los cambios del repositorio remoto y los fusiona en la rama actual solo si se puede hacer un avance rápido, de lo contrario, muestra un error.
- git pull --no-ff : descarga los cambios del repositorio remoto y los fusiona en la rama actual, creando un commit de fusión incluso si la fusión podría haberse realizado con un avance rápido.
- git pull --all : descarga los cambios de todos los repositorios remotos y los fusiona en la rama actual.

- git push   : sube los cambios confirmados en la rama actual al repositorio remoto.
- git push [remoto] : sube los cambios confirmados en la rama actual al repositorio remoto especificado.
- git push [remoto] [nombre de la rama] : sube los cambios confirmados en la rama actual al repositorio remoto especificado y a la rama especificada.
- git push --set-upstream [remoto] [nombre de la rama] : establece la rama remota como upstream para la rama local y sube los cambios confirmados en la rama actual al repositorio remoto especificado y a la rama especificada.
- git push -- force : fuerza la subida de los cambios confirmados en la rama actual al repositorio remoto, sobrescribiendo cualquier cambio en el repositorio remoto.
- git push --force-with-lease : fuerza la subida de los cambios confirmados en la rama actual al repositorio remoto, pero solo si la rama remota no ha cambiado desde la última vez que se descargó.
- git push --tags : sube todas las etiquetas locales al repositorio remoto.
- git push --all : sube todas las ramas locales al repositorio remoto.
- git push origin --delete <rama> : elimina la rama remota especificada.

- git remote : lista los repositorios remotos configurados.
- git remote -v : lista los repositorios remotos configurados con sus URLs.
- git remote add [nombre del remoto] [url del remoto] : agrega un nuevo repositorio remoto con el nombre y la URL especificados.
- git remote remove [nombre del remoto] : elimina el repositorio remoto especificado.
- git remote rename [nombre antiguo] [nombre nuevo] : renombra un repositorio remoto.
- git remote set-url [nombre del remoto] [nueva URL] : cambia la URL de un repositorio remoto.
- git remote show [nombre del remoto] : muestra información detallada sobre el repositorio remoto especificado, incluyendo las ramas remotas y su estado.
- git remote prune [nombre del remoto] : elimina las ramas remotas que ya no existen en el repositorio remoto.

- git show [hash del commit] : muestra el contenido del commit especificado, incluyendo los archivos modificados y sus diferencias.
- git show [nombre de la etiqueta] : muestra el contenido de la etiqueta especificada, incluyendo los archivos modificados y sus diferencias.
- git show [nombre de la rama] : muestra el contenido de la rama especificada, incluyendo los archivos modificados y sus diferencias.
- git show [hash del commit]:[ruta del archivo] : muestra el contenido de un archivo específico en el commit especificado.
- git show [nombre de la etiqueta]:[ruta del archivo] : muestra el contenido de un archivo específico en la etiqueta especificada.
- git show [nombre de la rama]:[ruta del archivo] : muestra el contenido de un archivo específico en la rama especificada.
- git show [hash del commit] --stat : muestra un resumen de los archivos modificados en el commit especificado, incluyendo el número de líneas añadidas y eliminadas.

- git log --all : muestra el historial de commits de todas las ramas del repositorio. pero no muestra lo que esta en el remoto que no este en local.git
- git log : muestra el historial de commits del repositorio.
- git log --oneline : muestra el historial de commits en una sola línea por commit
- git log --graph : muestra el historial de commits en forma de gráfico.
- git log --stat : muestra el historial de commits con un resumen de los archivos modificados y el número de líneas añadidas y eliminadas.
- git log --oneline --graph --date-order --all: mezcla de los anteriores

- git diff : muestra las diferencias entre los archivos modificados y la última versión confirmada
- git diff [hash del commit] : muestra las diferencias entre el commit especificado y el estado actual
- git diff [hash del commit] [hash del commit] : muestra las diferencias entre dos commits específicos
- git diff --staged : muestra las diferencias entre los archivos en el área de preparación y la última versión confirmada
- git diff HEAD : muestra las diferencias entre el último commit y el estado actual incluyendo los archivos en el área de preparación y los archivos modificados.

Nota: para salir de un diff, presiona `q`.

Para usar esta funcionalidad, es necesario tener instalado un visor de diferencias como `diff` o `meld`. O instalar uno de los siguientes: [ver enlaces](https://git-scm.com/docs/git-difftool).

- git difftool : abre una herramienta de comparación de diferencias para ver los cambios en los archivos modificados.
- git difftool [hash del commit] : abre una herramienta de comparación de diferencias para ver los cambios entre el commit especificado y el estado actual.
- git difftool [hash del commit] [hash del commit] : abre una herramienta de comparación de diferencias para ver los cambios entre dos commits específicos.
- git difftool [hash del commit]:[ruta del archivo] [nombre de la etiqueta]:[ruta del archivo]: abre una herramienta de comparación de diferencias para ver los cambios en un archivo específico en el commit especificado.
- git difftool [nombre de la etiqueta]:[ruta del archivo] [nombre de la etiqueta]:[ruta del archivo]: abre una herramienta de comparación de diferencias para ver los cambios en un archivo específico en la etiqueta especificada.
- git difftool [nombre de la rama]:[ruta del archivo] [nombre de la etiqueta]:[ruta del archivo]: abre una herramienta de comparación de diferencias para ver los cambios en un archivo específico en la rama especificada.

- git shortlog : muestra un resumen de los commits agrupados por autor.
- git shortlog -s : muestra un resumen de los commits agrupados por autor, con el número de commits de cada autor.
- git shortlog -n : muestra un resumen de los commits agrupados por autor, ordenados por el número de commits.
- git shortlog -e : muestra un resumen de los commits agrupados por autor, incluyendo la dirección de correo electrónico de cada autor.
- git shortlog -w : muestra un resumen de los commits agrupados por autor, ignorando las diferencias en mayúsculas y minúsculas en los nombres de los autores.
- git shortlog -M : muestra un resumen de los commits agrupados por autor, combinando los nombres de los autores que han cambiado de nombre.
- git shortlog -C : muestra un resumen de los commits agrupados por autor, combinando los commits que han sido copiados o movidos.

- git describe : muestra una descripción del commit actual, incluyendo la última etiqueta y el número de commits desde esa etiqueta.

- git apply [archivo.patch] : aplica un parche al área de trabajo.
- git diff > [archivo.patch] : crea un parche con las diferencias entre los archivos modificados y la última versión confirmada.

- git cherry-pick [hash del commit] : aplica los cambios de un commit específico a la rama actual.

- git rebase [nombre de la rama] : aplica los cambios de la rama especificada a la rama actual, reescribiendo el historial de commits.
- git rebase [nombre de la rama] --onto [nombre de la rama base] : aplica los cambios de la rama especificada a la rama base, reescribiendo el historial de commits.
- git rebase --continue : continúa un rebase después de resolver conflictos.
- git rebase --abort : aborta un rebase en curso y restaura el estado del repositorio al estado anterior al rebase.
- git rebase --skip : omite el commit actual durante un rebase.
- git rebase -i [hash del commit] : inicia un rebase interactivo a partir del commit especificado, permitiendo editar, reordenar o eliminar commits.
- git rebase -i --autosquash : inicia un rebase interactivo con la opción de aplastar automáticamente los commits que tienen el prefijo "fixup!" o "squash!" en sus mensajes de commit.

- git revert [hash del commit] : crea un nuevo commit que revierte los cambios del commit especificado, sin eliminar el commit original del historial.
- git revert --continue : continúa un revert después de resolver conflictos.

- git revert --abort : aborta un revert en curso y restaura el estado del repositorio al estado anterior al revert.
- git revert --skip : omite el commit actual durante un revert.

- git switch [nombre de la rama] : cambia a la rama especificada
<<<<<<< HEAD
-------------esta es la linea que va generar conflicto
=======
- 
esta es la linea que va a generar conflicto
>>>>>>> f7bc05713ae66d22d58bf3bdc5173f0a2b8f7122
- git push origin --delete {nombre-de-la-rama] : elimina la rama remota especificada

- conversión de mensajes de commit: [https://www.conventionalcommits.org/en/v1.0.0/](https://www.conventionalcommits.org/en/v1.0.0/)

- git reflog : muestra el historial de referencias del repositorio, incluyendo los commits recientes y las ramas
- line de prueba para pull
  linea de prueba 2 
