## Frontend del CodingChallenge para StoryDots

Este proyecto es una aplicación web que consume datos de una API proporcionada por el backend y realiza operaciones CRUD (Crear, Leer, Actualizar, Borrar) con productos. Los detalles de los productos son accesibles públicamente, pero para editar, borrar y agregar productos, el usuario debe haber iniciado sesión.

### Tecnologías Utilizadas

- Next.js
- TailwindCSS
- NextAuth
- Redux Toolkit

### Instrucciones de Uso

1. Clona este repositorio en tu máquina local.
2. Crea un archivo `.env` en la raíz del proyecto y define la variable `NEXT_PUBLIC_API_URL`. Puedes utilizar `localhost` si ya has clonado el backend en tu máquina o puedes utilizar la siguiente URL:

    ```
    NEXT_PUBLIC_API_URL=https://coding-challenge-backend-aqjo.onrender.com/
    ```

3. Instala las dependencias utilizando npm o yarn:

    ```
    npm install
    ```

    o

    ```
    yarn install
    ```

4. Levanta el proyecto localmente con el siguiente comando:

    ```
    npm run dev
    ```

    o

    ```
    yarn dev
    ```

### Funcionalidades Disponibles

- Visualización pública de los detalles de los productos.
- Inicio de sesión de usuarios utilizando NextAuth.
- Operaciones CRUD para productos (crear, leer, actualizar, borrar) disponibles para usuarios autenticados.

### Notas Adicionales

- Asegúrate de tener una conexión a internet activa para consumir la API proporcionada por el backend.
- Puedes modificar y adaptar el código según tus necesidades o requerimientos específicos.

¡Disfruta explorando el frontend del CodingChallenge para StoryDots! Si tienes alguna pregunta o comentario, no dudes en contactarme.
