const main = document.getElementById("main");
const querySelect = document.getElementById("filterCategory");
const sortSelect = document.getElementById("orderPrice");
const limitSelect = document.getElementById("limitSelect");

const prevPage = main.getAttribute('data-prevPage');
const nextPage = main.getAttribute('data-nextPage');
let limit = main.getAttribute('data-limit');
let page = main.getAttribute('data-page');
let query = main.getAttribute('data-query');
let sort = main.getAttribute('data-sort');

querySelect.value = query;
sortSelect.value = sort;
limitSelect.value = limit;

querySelect.addEventListener("change", (event) => {
    query = event.target.value;
    page = 1;
    setHref();
});

sortSelect.addEventListener("change", (event) => {
    sort = event.target.value;
    setHref();
});

limitSelect.addEventListener("change", (event) => {
    limit = event.target.value;
    page = 1;
    setHref();
});

const setHref = () => {
    const href = `?limit=${limit}&page=${page}&query=${query}&sort=${sort}`;
    window.location.href = href;
}

const addProductToCart = async (product) => {

    try {

        const idCart = "6797eef467633af608f624a4";
        const quantity = document.getElementById(`q_${product}`).value;

        const response = await fetch(`http://localhost:8080/api/carts/${idCart}/product/${product}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const res = await response.json();
        if (res.status !== "success") {
            throw new Error(res.message);
        }

        Swal.fire({
            icon: "success",
            text: "Product added to cart",
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false             
        });

    }
    catch (error) {
        Swal.fire({
            icon: "error",
            text: error.message,
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false             
        });
    }

}