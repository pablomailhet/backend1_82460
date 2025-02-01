const cid = "6797eef467633af608f624a4";

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
            title: "¿Está seguro que desea quitar el producto del carrito?",
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
            title: "¿Está seguro que desea vaciar el carrito?",
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