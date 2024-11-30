document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('product-form');
    const inventoryTable = document.getElementById('inventory-table');
    const searchBar = document.getElementById('search-bar');
    const filterAz = document.getElementById('filter-az');
    const filterQuantity = document.getElementById('filter-quantity');
    const filterExpiryNearest = document.getElementById('filter-expiry-nearest');
    const filterExpiryFurthest = document.getElementById('filter-expiry-furthest');

    let productIdCounter = 10; // Contador para IDs únicos
    let products = [];

    // Produtos iniciais
    const initialProducts = [
        { ID: '#1', name: 'Maçã', price: 3.50, expiry: '2024-03-15', quantity: 100, volumeType: 'KG' },
        { ID: '#2', name: 'Banana', price: 2.00, expiry: '2024-03-10', quantity: 150, volumeType: 'Unidade' },
        { ID: '#3', name: 'Laranja', price: 4.00, expiry: '2024-03-20', quantity: 200, volumeType: 'KG' },
        { ID: '#4', name: 'Tomate', price: 5.00, expiry: '2024-03-12', quantity: 80, volumeType: 'KG' },
        { ID: '#5', name: 'Alface', price: 2.50, expiry: '2024-03-08', quantity: 50, volumeType: 'Unidade' },
        { ID: '#6', name: 'Batata', price: 1.80, expiry: '2024-04-15', quantity: 500, volumeType: 'KG' },
        { ID: '#7', name: 'Cebola', price: 2.30, expiry: '2024-03-25', quantity: 40, volumeType: 'Fardo' },
        { ID: '#8', name: 'Arroz', price: 20.00, expiry: '2025-03-01', quantity: 10, volumeType: 'Lote' },
        { ID: '#9', name: 'Feijão', price: 8.00, expiry: '2025-05-10', quantity: 15, volumeType: 'Lote' }
    ];

    // Inicializa os produtos na tabela
    initialProducts.forEach(product => addProductToTable(product));

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const productName = document.getElementById('product-name').value;
        const quantity = document.getElementById('quantity').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const price = document.getElementById('price').value;
        const volumeType = document.getElementById('volume-type').value;

        if (!productName || !quantity || !expiryDate || !price || !volumeType) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        const product = {
            ID: `#${productIdCounter++}`,
            name: productName,
            quantity: parseInt(quantity, 10),
            expiry: expiryDate,
            price: parseFloat(price),
            volumeType: volumeType
        };

        addProductToTable(product);
        form.reset();
    });

    function addProductToTable(product) {
        products.push(product);

        const row = document.createElement('tr');

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('pt-BR');
        };

        row.innerHTML = `
            <td>${product.ID}</td>
            <td>${product.name}</td>
            <td>R$ ${product.price.toFixed(2)}</td>
            <td>${product.quantity} (${product.volumeType})</td>
            <td>${formatDate(product.expiry)}</td>
            <td>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Excluir</button>
            </td>
        `;

        row.querySelector('.delete-btn').addEventListener('click', function () {
            products = products.filter(p => p.ID !== product.ID);
            row.remove();
        });

        row.querySelector('.edit-btn').addEventListener('click', function () {
            editProduct(row, product);
        });

        inventoryTable.appendChild(row);
    }

    function editProduct(row, product) {
        const productName = prompt('Editar nome do produto:', product.name);
        const price = prompt('Editar preço (R$):', product.price);
        const quantity = prompt('Editar quantidade:', product.quantity);
        const expiry = prompt('Editar validade (aaaa-mm-dd):', product.expiry);
        const volumeType = prompt('Editar tipo de volume (KG, Unidade, Fardo, Lote):', product.volumeType);

        if (productName && price && quantity && expiry && volumeType) {
            product.name = productName;
            product.price = parseFloat(price);
            product.quantity = parseInt(quantity, 10);
            product.expiry = expiry;
            product.volumeType = volumeType;

            row.innerHTML = `
                <td>${product.ID}</td>
                <td>${product.name}</td>
                <td>R$ ${product.price.toFixed(2)}</td>
                <td>${product.quantity} (${product.volumeType})</td>
                <td>${new Date(product.expiry).toLocaleDateString('pt-BR')}</td>
                <td>
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Excluir</button>
                </td>
            `;

            row.querySelector('.delete-btn').addEventListener('click', function () {
                products = products.filter(p => p.ID !== product.ID);
                row.remove();
            });

            row.querySelector('.edit-btn').addEventListener('click', function () {
                editProduct(row, product);
            });
        }
    }

    // Barra de pesquisa
    searchBar.addEventListener('input', function () {
        const searchTerm = searchBar.value.toLowerCase();
        const rows = inventoryTable.querySelectorAll('tr');

        rows.forEach(row => {
            const nameCell = row.children[1].textContent.toLowerCase();
            const idCell = row.children[0].textContent;

            if (nameCell.includes(searchTerm) || idCell.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Filtros
    filterAz.addEventListener('click', function () {
        products.sort((a, b) => a.name.localeCompare(b.name));
        refreshTable();
    });

    filterQuantity.addEventListener('click', function () {
        products.sort((a, b) => a.quantity - b.quantity);
        refreshTable();
    });

    filterExpiryNearest.addEventListener('click', function () {
        products.sort((a, b) => new Date(a.expiry) - new Date(b.expiry));
        refreshTable();
    });

    filterExpiryFurthest.addEventListener('click', function () {
        products.sort((a, b) => new Date(b.expiry) - new Date(a.expiry));
        refreshTable();
    });

    function refreshTable() {
        inventoryTable.innerHTML = '';
        products.forEach(addProductToTable);
    }
});
