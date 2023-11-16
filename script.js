function loadProducts() {
    Papa.parse('produtos.csv', {
        download: true,
        header: true,
        complete: function(results) {
            window.productsData = results.data;
            displayProducts(window.productsData); // Mostrar produtos ao carregar
        }
    });
}

function displayProducts(products) {
    const productContainer = document.querySelector('#product-container');
    productContainer.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        const img = document.createElement('img');
        img.src = 'produtos/' + product['Imagem'];
        img.width = 300;
        img.height = 300;

        const productInfo = document.createElement('div');
        productInfo.className = 'product-info';
        productInfo.innerHTML = `
            <p class="product-name">${product.Nome}</p>
            <p class="product-code">Código: ${product.Código}</p>
            <p>Preço: R$ ${product.Preço}</p>
        `;

        productDiv.appendChild(img);
        productDiv.appendChild(productInfo);

        productContainer.appendChild(productDiv);
    });
}

function filterProducts() {
    const searchBox = document.querySelector('#search-box');
    const searchTerm = searchBox.value.toLowerCase();

    const matchingProducts = window.productsData.filter(product => {
        const productName = product.Nome.toLowerCase();
        const productCode = product.Código.toLowerCase();
        return productName.includes(searchTerm) || productCode.includes(searchTerm);
    });

    displayProducts(matchingProducts);

    // Adicione o código abaixo para ajustar a cor de fundo após a pesquisa
    const productContainer = document.querySelector('#product-container');
    productContainer.style.backgroundColor = 'transparent';
}

window.addEventListener('load', function() {
    loadProducts();
    const searchBox = document.querySelector('#search-box');
    searchBox.addEventListener('input', filterProducts);

    // Adicione este trecho para a pesquisa ao pressionar "Enter"
    searchBox.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            filterProducts();
        }
    });
});
