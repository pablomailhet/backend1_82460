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
  GET http://localhost:8080/api/products/2
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
      "category": "Category 01"
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
      "category": "Category 02"
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
      "category": "Category 03"
  }
  ```

### PUT

- Actualizar un producto por su ID (ejemplo: ID = 3):
  ```
  PUT http://localhost:8080/api/products/3
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
      "category": "Category 03_mod"
  }
  ```

### DELETE

- Eliminar un producto por su ID (ejemplo: ID = 3):
  ```
  DELETE http://localhost:8080/api/products/3
  ```

## Carts Routes

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
          {"id": 1},
          {"id": 2},
          {"id": 3}
      ]
  }
  ```

  Otro ejemplo de cuerpo de la solicitud:
  ```json
  {
      "products": [
          {"id": 1, "quantity": 4},
          {"id": 2, "quantity": 5},
          {"id": 3, "quantity": 6}
      ]
  }
  ```

### POST

- Agregar un producto al carrito (ejemplo: carrito ID = 1, producto ID = 1):
  ```
  POST http://localhost:8080/api/carts/1/product/1
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
