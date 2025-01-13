const getProducts = async () => {

    try {
        const response = await fetch('http://localhost:8080/api/products');
        if (!response.ok) {
            throw new Error('Error');
        }
        const data = await response.json();
        return data.products;
    } catch (error) {
        return [];
    }

};

const addProduct = async (product) => {

    const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    const res = await response.json();
    if (res.status !== "success") {
        throw new Error(res.message);
    }

    product.id = res.productId;
    return product;

};

const deleteProduct = async (id) => {
    const response = await fetch('http://localhost:8080/api/products/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    const res = await response.json();
    if (res.status !== "success") {
        throw new Error(res.message);
    }    
};

export { getProducts, addProduct, deleteProduct };