# Documentation

## Instalacion y ejecucion

### Clonar repositorio

- Obtener codigo fuente
  ```
  git clone https://github.com/pablomailhet/backend1_82460.git
  ```

- Acceder a la carpeta
  ```
  cd backend1_82460
  ```

- Instalar dependencias npm
  ```
  npm install
  ```

### Iniciar el servidor

- Iniciar el servidor como dev
  ```
  npm run start:dev
  ```

- Acceder a vista productos
  ```
  http://localhost:8080/
  ```

- Acceder a vista carrito
  ```
  http://localhost:8080/carts/6797eef467633af608f624a4
  ```

- Acceder a vista Real time products
  ```
  http://localhost:8080/realTimeProducts
  ```

## Products Routes

### GET

- Obtener todos los productos
  ```
  GET http://localhost:8080/api/products
  ```

- Obtener productos con límite de 2
  ```
  GET http://localhost:8080/api/products?limit=2
  ```

- Obtener un producto específico por su ID
  ```
  GET http://localhost:8080/api/products/pid
  ```

### POST

- Crear un nuevo producto
  ```
  POST http://localhost:8080/api/products
  ```

  Ejemplo de cuerpo de la solicitud
  ```json
  {
      "title": "Title 01",
      "description": "Description 01",
      "code": "Code 01",
      "price": 11.11,
      "status": true,
      "stock": 1,
      "category": "ESC"
  }
  ```

  Otro ejemplo de cuerpo de la solicitud
  ```json
  {
      "title": "Title 02",
      "description": "Description 02",
      "code": "Code 02",
      "price": 22.22,
      "status": true,
      "stock": 2,
      "category": "ESC"
  }
  ```

  Otro ejemplo de cuerpo de la solicitud
  ```json
  {
      "title": "Title 03",
      "description": "Description 03",
      "code": "Code 03",
      "price": 33.33,
      "status": true,
      "stock": 3,
      "category": "ESC"
  }
  ```

### PUT

- Actualizar un producto por su ID
  ```
  PUT http://localhost:8080/api/products/pid
  ```

  Ejemplo de cuerpo de la solicitud
  ```json
  {
      "title": "Title 03_mod",
      "description": "Description 03_mod",
      "code": "Code 03_mod",
      "price": 333.33,
      "status": true,
      "stock": 33,
      "category": "ESC"
  }
  ```

### DELETE

- Eliminar un producto por su ID
  ```
  DELETE http://localhost:8080/api/products/pid
  ```

## Carts Routes

### GET

- Mostrar todos los carritos
  ```
  GET http://localhost:8080/api/carts
  ```

- Mostrar productos de un carrito
  ```
  GET http://localhost:8080/api/carts/cid
  ```

### POST

- Crear un nuevo carrito vacío
  ```
  POST http://localhost:8080/api/carts
  ```

  Ejemplo de cuerpo de la solicitud
  ```json
  {
      "products": []
  }
  ```

  Otro ejemplo de cuerpo de la solicitud
  ```json
  {
      "products": [
          {"product": "pid1"},
          {"product": "pid2"},
          {"product": "pid3"}
      ]
  }
  ```

  Otro ejemplo de cuerpo de la solicitud
  ```json
  {
      "products": [
          {"product": "pid1", "quantity": 4},
          {"product": "pid2", "quantity": 5},
          {"product": "pid3", "quantity": 6}
      ]
  }
  ```

### POST

- Agregar un producto al carrito
  ```
  POST http://localhost:8080/api/carts/cid/product/pid
  ```

  Ejemplo de cuerpo de la solicitud
  ```json
  {
      "quantity": 1
  }
  ```

  Otro ejemplo de cuerpo de la solicitud
  ```json
  {
      "quantity": 2
  }
  ```

### PUT

- Actualizar el carrito
  ```
  PUT http://localhost:8080/api/carts/cid
  ```

  Ejemplo de cuerpo de la solicitud
  ```json
  {
        "products":[
            {"product":"pid1","quantity":3},
            {"product":"pid2","quantity":5}
        ]
  }
  ```

### PUT

- Actualizar la cantidad de un producto en el carrito
  ```
  PUT http://localhost:8080/api/carts/cid/product/pid
  ```

  Ejemplo de cuerpo de la solicitud
  ```json
  {
      "quantity": 2
  }
  ```

### DELETE

- Eliminar un producto del carrito
  ```
  DELETE http://localhost:8080/api/carts/cid/product/pid
  ```

- Vaciar el carrito
  ```
  DELETE http://localhost:8080/api/carts/cid
  ```