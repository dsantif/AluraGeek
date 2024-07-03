import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector(".products_line");
const form = document.querySelector("[data-form]");



function creatCard (name, price, image, id) {
    const products_box = document.createElement("div");
    products_box.classList.add("products_box");

    const formattedPrice = `$ ${price}`;

    products_box.innerHTML = `
        <div class="products_img">
            <div><img src="${image}"></div>
        </div>
        <div class="products_name">${name}</div>              
            <div class="products_description">
                <div class="products_price">${formattedPrice}</div>
                <button class="btn_delete" data-id="${id}"><i class="fi fi-rr-trash-xmark"></i></button>
            </div>
    `;

    const deleteButton = products_box.querySelector(".btn_delete");
    deleteButton.addEventListener("click", async () => {
    
        try {
            await servicesProducts.deleteProducts(id);
            products_box.remove();
        } catch (error){
            console.log(error)
        }
    });


    productContainer.appendChild(products_box);
    return products_box;
}



const render = async () => {
    try{
        const listProducts = await servicesProducts.productList();
        
        listProducts.forEach(product => {
            productContainer.appendChild(
                creatCard(
                    product.name,
                    product.price,
                    product.image,
                    product.id
                )
            )
            
        });

    } catch (error){
        console.log(error)
    }
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const name = document.querySelector("[data-name]").value
    const price = document.querySelector("[data-price]").value
    const image = document.querySelector("[data-image]").value

    servicesProducts
        .creatProducts(name, price, image)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
});

render();