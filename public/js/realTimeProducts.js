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
        price,
        stock,
        category
    };

    socket.emit('addProduct', product);

    formProduct.reset();

});

const deleteProduct = async (id) => {

    try {
        const result = await Swal.fire({
            icon: "question",
            title: "¿Está seguro que desea eliminar el producto?",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "No",
            position: "center",
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-secondary',
            }
        });
        if (result.isConfirmed) {
            if (id) {
                socket.emit('deleteProduct', id);
            }
        }
    }
    catch (error) {
        Swal.fire({
            icon: "error",
            text: error.message,
        });
    }

};

socket.on("newProduct", product => {
    const divProducts = document.getElementById("divProducts");
    const article = document.createElement('article');
    article.id = `pid_${product._id}`;
    article.className = "card cardProducto";
    article.innerHTML = `
        <img src="${product.thumbnails || ""}" class="card-img-top p-2">
        <div class="card-body cardBodyProducto">
            <h3 class="card-title cardTitleProducto">${product.title}</h3>
            <p class="card-text cardTextProducto">${product.description}</p>
            <p class="card-text cardTextProducto">${product.category}</p>
            <p class="card-text cardTextProducto">$${product.price}</p>
        </div>
        <div class="card-footer">
            <input type="button" class="btn btn-danger m-1" value="Eliminar" onclick="deleteProduct('${product._id}')" />
        </div>             
    `;
    divProducts.appendChild(article);
});


socket.on("deletedProduct", id => {
    const divProducts = document.getElementById('divProducts');
    const article = document.getElementById(`pid_${id}`);
    if (article) {
        divProducts.removeChild(article);
    }
});

socket.on("product_error", error => {
    Swal.fire({
        icon: "error",
        text: error,
    });
});
