const main = document.getElementById("main");
const cid = main.getAttribute('data-cid');

const handleCatch = (error) => {
    Swal.fire({
        icon: "error",
        text: error.message,
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false
    });
}

const changeQuantity = async (pid, quantity) => {
    try {
        if (pid && quantity > 0) {
            const response = await fetch(`http://localhost:8080/api/carts/${cid}/product/${pid}`, {
                method: 'PUT',
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
            window.location.href = window.location.href;
        }
    }
    catch (error) {
        handleCatch(error);
    }
};

const removeProductFromCart = async (pid) => {
    try {
        const result = await Swal.fire({
            icon: "question",
            title: "Are you sure you want to remove the product from the cart?",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            position: "center",
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-secondary',
            }
        });
        if (result.isConfirmed) {
            const response = await fetch(`http://localhost:8080/api/carts/${cid}/product/${pid}`, { method: 'DELETE' });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            const res = await response.json();
            if (res.status !== "success") {
                throw new Error(res.message);
            }
            window.location.href = window.location.href;
        }
    }
    catch (error) {
        handleCatch(error);
    }
};

const emptyCart = async () => {
    try {

        const result = await Swal.fire({
            icon: "question",
            title: "Are you sure you want to empty the cart?",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            position: "center",
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-secondary',
            }
        });
        if (result.isConfirmed) {
            const response = await fetch(`http://localhost:8080/api/carts/${cid}`, { method: 'DELETE' });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            const res = await response.json();
            if (res.status !== "success") {
                throw new Error(res.message);
            }
            window.location.href = window.location.href;
        }

    }
    catch (error) {
        handleCatch(error);
    }
};