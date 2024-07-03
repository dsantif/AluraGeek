const productList = () => {
    return fetch("http://localhost:3001/products")
            .then((res) => res.json())
            .catch((err) => console.log(err));
};

const creatProducts = (name, price, image) => {
    return fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            price,
            image,
        })
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const deleteProducts = (id) => {
    return fetch("http://localhost:3001/products/${id}", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const servicesProducts = {
    productList,
    creatProducts,
    deleteProducts,
};