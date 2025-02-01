# API Documentation

## Products Routes

### GET

- Obtener todos los productos:
  ```
  GET http://localhost:8080/api/products
  ```

- Obtener productos con límite de 2:
  ```
  GET http://localhost:8080/api/products?limit=2
  ```

- Obtener un producto específico por su ID (ejemplo: ID = 2):
  ```
  GET http://localhost:8080/api/products/pid
  ```

### POST

- Crear un nuevo producto:
  ```
  POST http://localhost:8080/api/products
  ```

  Ejemplo de cuerpo de la solicitud:
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

  Otro ejemplo de cuerpo de la solicitud:
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

  Otro ejemplo de cuerpo de la solicitud:
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

- Actualizar un producto por su ID (ejemplo: ID = 3):
  ```
  PUT http://localhost:8080/api/products/pid
  ```

  Ejemplo de cuerpo de la solicitud:
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

- Eliminar un producto por su ID (ejemplo: ID = 3):
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

- Crear un nuevo carrito vacío:
  ```
  POST http://localhost:8080/api/carts
  ```

  Ejemplo de cuerpo de la solicitud:
  ```json
  {
      "products": []
  }
  ```

  Otro ejemplo de cuerpo de la solicitud:
  ```json
  {
      "products": [
          {"product": "pid1"},
          {"product": "pid2"},
          {"product": "pid3"}
      ]
  }
  ```

  Otro ejemplo de cuerpo de la solicitud:
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

- Agregar un producto al carrito (ejemplo: carrito ID = 6797eef467633af608f624a4, producto ID = 679d90e5e6bc9c5bd6b69493):
  ```
  POST http://localhost:8080/api/carts/cid/product/pid
  ```

  Ejemplo de cuerpo de la solicitud:
  ```json
  {
      "quantity": 1
  }
  ```

  Otro ejemplo de cuerpo de la solicitud:
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

  Ejemplo de cuerpo de la solicitud:
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

  Ejemplo de cuerpo de la solicitud:
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