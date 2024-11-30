document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('product-form');
    const inventoryTable = document.getElementById('inventory-table');

    // Produtos iniciais
    const initialProducts = [
        { name: 'Maçã', price: 3.50, expiry: '2024-03-15', quantity: 100 },
        { name: 'Banana', quantity: 150, expiry: '2024-03-10', price: 2.00 },
        { name: 'Laranja', quantity: 200, expiry: '2024-03-20', price: 4.00 },
        { name: 'Tomate', quantity: 80, expiry: '2024-03-12', price: 5.00 },
        { name: 'Alface', quantity: 50, expiry: '2024-03-08', price: 2.50 }
    ];

    // Adiciona produtos iniciais à tabela
    initialProducts.forEach(product => addProductToTable(product));

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const productName = document.getElementById('product-name').value;
        const quantity = document.getElementById('quantity').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const price = document.getElementById('price').value;

        if (!productName || !quantity || !expiryDate || !price) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        const product = {
            name: productName,
            quantity: parseInt(quantity, 10),
            expiry: expiryDate,
            price: parseFloat(price)
        };

        addProductToTable(product);
        form.reset();
    });

    function addProductToTable(product) {
        const row = document.createElement('tr');
    
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('pt-BR');
        };
    
        row.innerHTML = `
            <td>${product.name}</td>
            <td>R$ ${product.price.toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>${formatDate(product.expiry)}</td>
            <td>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Excluir</button>
            </td>
        `;
    
        row.querySelector('.delete-btn').addEventListener('click', function () {
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
    
        if (productName && price && quantity && expiry) {
            product.name = productName;
            product.price = parseFloat(price);
            product.quantity = parseInt(quantity, 10);
            product.expiry = expiry;
    
            row.innerHTML = `
                <td>${product.name}</td>
                <td>R$ ${product.price.toFixed(2)}</td>
                <td>${product.quantity}</td>
                <td>${new Date(product.expiry).toLocaleDateString('pt-BR')}</td>
                <td>
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Excluir</button>
                </td>
            `;
    
            row.querySelector('.delete-btn').addEventListener('click', function () {
                row.remove();
            });
    
            row.querySelector('.edit-btn').addEventListener('click', function () {
                editProduct(row, product);
            });
        }
    }
    
    function editProduct(row, product) {
        const productName = prompt('Editar nome do produto:', product.name);
        const quantity = prompt('Editar quantidade:', product.quantity);
        const expiry = prompt('Editar validade (aaaa-mm-dd):', product.expiry);
        const price = prompt('Editar preço (R$):', product.price);

        if (productName && quantity && expiry && price) {
            product.name = productName;
            product.quantity = parseInt(quantity, 10);
            product.expiry = expiry;
            product.price = parseFloat(price);

            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${new Date(product.expiry).toLocaleDateString('pt-BR')}</td>
                <td>R$ ${product.price.toFixed(2)}</td>
                <td>
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Excluir</button>
                </td>
            `;

            row.querySelector('.delete-btn').addEventListener('click', function () {
                row.remove();
            });

            row.querySelector('.edit-btn').addEventListener('click', function () {
                editProduct(row, product);
            });
        }
    }
});
