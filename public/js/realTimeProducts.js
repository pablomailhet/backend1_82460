const socket = io();

const formProduct = document.getElementById("formProduct");

formProduct.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const code = document.getElementById('code').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;

    const product = {
        title,
        description,
        code,
        price: parseFloat(price),
        stock: parseInt(stock),
        category,
        status: true
    };

    socket.emit('addProduct', product);

    formProduct.reset();

});

const deleteProduct = (id) => {
    if (id) {
        socket.emit('deleteProduct', id);
    }
};

socket.on("newProduct", product => {
    const ulProducts = document.getElementById("ulProducts");
    const liProduct = document.createElement('li');
    liProduct.id = `p${product.id}`;
    liProduct.innerHTML = `
        <div>
            <h2 id="productTitle">${product.title}</h2>
            <div>
                <p><strong>Descripción:</strong> <span id="productDescription">${product.description}</span></p>
                <p><strong>Código:</strong> <span id="productCode">${product.code}</span></p>
                <p><strong>Precio:</strong> $<span id="productPrice">${product.price}</span></p>
                <p><strong>Stock disponible:</strong> <span id="productStock">${product.stock}</span></p>
                <p><strong>Categoría:</strong> <span id="productCategory">${product.category}</span></p>
            </div>
            <button type="button" onclick="deleteProduct(${product.id})">Delete</button>
        </div>    
    `;
    ulProducts.appendChild(liProduct);
});

socket.on("deletedProduct", id => {
    const ulProducts = document.getElementById('ulProducts');
    const liProduct = document.getElementById(`p${id}`);
    if (liProduct) {
        ulProducts.removeChild(liProduct);
    }
});

socket.on("product_error", error => {
    Swal.fire({
        icon: "error",
        text: error,
    });
});
