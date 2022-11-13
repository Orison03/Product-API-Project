const productDOM = document.querySelector(".product");

const url =
  "https://course-api.com/javascript-store-single-product";

const fetchProduct = async () => {
  try {
    productDOM.innerHTML = `<h4 class="product-loading">loading...</h4>`;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    // console.log(id);

    const response = await fetch(`${url}?id=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    productDOM.innerHTML = `<p class="error">There was a problem loading the product. Please try again later</p>`;
  }
};

const displayProduct = (product) => {
  // console.log(product);
  const {
    company,
    colors,
    name: title,
    description,
    price,
    image,
  } = product.fields;
  const { url: img } = image[0];
  document.title = title.toUpperCase();

  //colors
  const colorList = colors.map((color)=>{
return `<span class="product-color" style="background-color: ${color};"></span>`;
  }).join("")  


  productDOM.innerHTML = `<div class="product-wrapper">
        <img src="${img}" alt="${title}" class="img" />
        <div class="product-info">
          <h3>${title}</h3>
          <h5>${company}</h5>
          <span>$${price /100}</span>
          <div class="colors">
            
            ${colorList}
          </div>
               <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis repudiandae amet quia rem omnis iusto cupiditate libero accusamus nobis blanditiis.</p>
               <button class="btn">add to cart</button>
        </div>
      </div>`;
};

const start = async () => {
  const data = await fetchProduct();
  displayProduct(data);
};

start();
