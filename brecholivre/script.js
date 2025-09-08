// Dados dos produtos (simulando um banco de dados)
const produtos = [
    {
        id: 1,
        titulo: "iPhone X 64GB",
        descricao: "iPhone X em ótimo estado, com apenas alguns arranhões mínimos na traseira. Inclui carregador original e capa de silicone.",
        preco: 1999.90,
        categoria: "eletronicos",
        imagem: "https://via.placeholder.com/300x300?text=iPhone+X",
        condicao: "Usado - Bom estado",
        vendedor: "TechUsados",
        avaliacao: 4.5
    },
    {
        id: 2,
        titulo: "Sofá 3 Lugares",
        descricao: "Sofá de couro sintético em ótimo estado, cor marrom. Apenas alguns sinais de uso nas almofadas.",
        preco: 899.00,
        categoria: "moveis",
        imagem: "https://via.placeholder.com/300x300?text=Sofá+3+Lugares",
        condicao: "Usado - Ótimo estado",
        vendedor: "CasaNova",
        avaliacao: 4.2
    },
    {
        id: 3,
        titulo: "Jaqueta de Couro",
        descricao: "Jaqueta de couro legítimo, tamanho M, cor preta. Modelo clássico que nunca sai de moda.",
        preco: 249.90,
        categoria: "roupas",
        imagem: "https://via.placeholder.com/300x300?text=Jaqueta+de+Couro",
        condicao: "Usado - Como novo",
        vendedor: "ModaRetro",
        avaliacao: 4.8
    },
    {
        id: 4,
        titulo: "O Senhor dos Anéis - Trilogia",
        descricao: "Box da trilogia O Senhor dos Anéis em edição de colecionador. Livros em perfeito estado.",
        preco: 129.90,
        categoria: "livros",
        imagem: "https://via.placeholder.com/300x300?text=Senhor+dos+Anéis",
        condicao: "Usado - Excelente estado",
        vendedor: "Livros&cia",
        avaliacao: 5.0
    },
    {
        id: 5,
        titulo: "Notebook Dell i5 8GB",
        descricao: "Notebook Dell com processador i5, 8GB RAM, 256GB SSD. Tela de 15.6 polegadas. Funcionando perfeitamente.",
        preco: 2199.00,
        categoria: "eletronicos",
        imagem: "https://via.placeholder.com/300x300?text=Notebook+Dell",
        condicao: "Usado - Bom estado",
        vendedor: "TechUsados",
        avaliacao: 4.3
    },
    {
        id: 6,
        titulo: "Mesa de Jantar 6 Lugares",
        descricao: "Mesa de jantar em madeira maciça com 6 cadeiras. Cor marrom escuro. Alguns arranhões na superfície.",
        preco: 1299.00,
        categoria: "moveis",
        imagem: "https://via.placeholder.com/300x300?text=Mesa+de+Jantar",
        condicao: "Usado - Regular",
        vendedor: "CasaNova",
        avaliacao: 3.9
    }
];

// Carrinho de compras
let carrinho = [];

// Elementos do DOM
const produtosDestaqueContainer = document.getElementById('produtos-destaque');
const listaProdutosContainer = document.getElementById('lista-produtos');
const categoriaBtns = document.querySelectorAll('.categoria-btn');
const cartCount = document.getElementById('cart-count');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.querySelector('.close-btn');

// Função para renderizar produtos
function renderizarProdutos(produtos, container, destaque = false) {
    container.innerHTML = '';
    
    produtos.forEach(produto => {
        const produtoCard = document.createElement('div');
        produtoCard.className = 'produto-card';
        produtoCard.dataset.id = produto.id;
        produtoCard.dataset.categoria = produto.categoria;
        
        produtoCard.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.titulo}" class="produto-imagem">
            <div class="produto-info">
                <h3 class="produto-titulo">${produto.titulo}</h3>
                <p class="produto-descricao">${produto.descricao}</p>
                <p class="produto-preco">R$ ${produto.preco.toFixed(2)}</p>
                <div class="produto-acoes">
                    <button class="btn btn-detalhes" data-id="${produto.id}">Detalhes</button>
                    <button class="btn btn-comprar" data-id="${produto.id}">Comprar</button>
                </div>
            </div>
        `;
        
        container.appendChild(produtoCard);
    });
    
    // Adicionar eventos aos botões
    document.querySelectorAll('.btn-detalhes').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            mostrarDetalhesProduto(id);
        });
    });
    
    document.querySelectorAll('.btn-comprar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            adicionarAoCarrinho(id);
        });
    });
}

// Função para mostrar detalhes do produto no modal
function mostrarDetalhesProduto(id) {
    const produto = produtos.find(p => p.id === id);
    
    if (produto) {
        modalContent.innerHTML = `
            <div class="modal-produto">
                <div class="modal-imagem-container">
                    <img src="${produto.imagem}" alt="${produto.titulo}" class="modal-imagem">
                </div>
                <div class="modal-info-container">
                    <h3 class="modal-titulo">${produto.titulo}</h3>
                    <p class="modal-preco">R$ ${produto.preco.toFixed(2)}</p>
                    <p class="modal-descricao">${produto.descricao}</p>
                    <div class="modal-info">
                        <p><span>Condição:</span> ${produto.condicao}</p>
                        <p><span>Vendedor:</span> ${produto.vendedor}</p>
                        <p><span>Avaliação:</span> ${produto.avaliacao} ★</p>
                        <p><span>Categoria:</span> ${produto.categoria.charAt(0).toUpperCase() + produto.categoria.slice(1)}</p>
                    </div>
                    <button class="btn btn-comprar" data-id="${produto.id}" style="width: 100%; padding: 1rem; font-size: 1.1rem;">Adicionar ao Carrinho</button>
                </div>
            </div>
        `;
        
        // Adicionar evento ao botão de comprar no modal
        document.querySelector('.modal-info-container .btn-comprar').addEventListener('click', () => {
            adicionarAoCarrinho(id);
            modal.style.display = 'none';
        });
        
        modal.style.display = 'block';
    }
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    
    if (produto) {
        // Verificar se o produto já está no carrinho
        const itemExistente = carrinho.find(item => item.id === id);
        
        if (itemExistente) {
            itemExistente.quantidade += 1;
        } else {
            carrinho.push({
                ...produto,
                quantidade: 1
            });
        }
        
        atualizarContadorCarrinho();
        alert(`${produto.titulo} foi adicionado ao carrinho!`);
    }
}

// Função para atualizar contador do carrinho
function atualizarContadorCarrinho() {
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    cartCount.textContent = totalItens;
}

// Função para filtrar produtos por categoria
function filtrarPorCategoria(categoria) {
    if (categoria === 'todos') {
        renderizarProdutos(produtos, listaProdutosContainer);
    } else {
        const produtosFiltrados = produtos.filter(produto => produto.categoria === categoria);
        renderizarProdutos(produtosFiltrados, listaProdutosContainer);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Produtos em destaque (poderia ser filtrado por algum critério)
    const produtosDestaque = produtos.slice(0, 4);
    renderizarProdutos(produtosDestaque, produtosDestaqueContainer, true);
    
    // Todos os produtos
    renderizarProdutos(produtos, listaProdutosContainer);
    
    // Filtros por categoria
    categoriaBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoriaBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filtrarPorCategoria(btn.dataset.categoria);
        });
    });
    
    // Modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});