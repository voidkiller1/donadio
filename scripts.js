document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('product-form');
    const inventoryTable = document.getElementById('inventory-table');

    // Produtos iniciais
    const initialProducts = [
        { name: 'Maçã', quantity: 100, expiry: '2024-03-15' },
        { name: 'Banana', quantity: 150, expiry: '2024-03-10' },
        { name: 'Laranja', quantity: 200, expiry: '2024-03-20' },
        { name: 'Tomate', quantity: 80, expiry: '2024-03-12' },
        { name: 'Alface', quantity: 50, expiry: '2024-03-08' }
    ];

    // Adiciona produtos iniciais à tabela
    initialProducts.forEach(product => addProductToTable(product));

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const productName = document.getElementById('product-name').value;
        const quantity = document.getElementById('quantity').value;
        const expiryDate = document.getElementById('expiry-date').value;

        if (!productName || !quantity || !expiryDate) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        const product = {
            name: productName,
            quantity: parseInt(quantity, 10),
            expiry: expiryDate
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
            <td>${product.quantity}</td>
            <td>${formatDate(product.expiry)}</td>
            <td>
                <button class="delete-btn" onclick="this.closest('tr').remove()">
                    Excluir
                </button>
            </td>
        `;

        inventoryTable.appendChild(row);
    }
});
