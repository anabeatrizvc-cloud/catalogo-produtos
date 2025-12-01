
function preencherCategorias(produtos) {
    const categorias = [...new Set(produtos.map(p => p.categoria))];
    $('#filtro-categoria').html('<option value="">Todas as categorias</option>');
    categorias.forEach(cat => {
        $('#filtro-categoria').append(`<option value="${cat}">${cat}</option>`);
    });
}

function renderizarProdutos(produtosFiltrados) {
    $('#produtos-container').html('');
    if (produtosFiltrados.length === 0) {
        $('#nenhum-produto').show();
    } else {
        $('#nenhum-produto').hide();
        produtosFiltrados.forEach(produto => {
            const card = `
                <div class="produto-card">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <div class="info">
                        <h3>${produto.nome}</h3>
                        <p><strong>Preço:</strong> R$ ${produto.preco.toFixed(2)}</p>
                        <p><strong>Categoria:</strong> ${produto.categoria}</p>
                        <button class="ver-detalhes" data-id="${produto.id}">Ver Detalhes</button>
                    </div>
                </div>
            `;
            $('#produtos-container').append(card);
        });
    }
}

function aplicarFiltrosEOrdenacao(produtos, produtosFiltrados) {
    let filtrados = [...produtos];

    const termo = $('#busca').val().toLowerCase();
    if (termo) {
        filtrados = filtrados.filter(p => p.nome.toLowerCase().includes(termo));
    }

    const categoria = $('#filtro-categoria').val();
    if (categoria) {
        filtrados = filtrados.filter(p => p.categoria === categoria);
    }

    const ordenacao = $('#ordenacao').val();
    if (ordenacao === 'nome-asc') {
        filtrados.sort((a, b) => a.nome.localeCompare(b.nome));
    } else if (ordenacao === 'nome-desc') {
        filtrados.sort((a, b) => b.nome.localeCompare(a.nome));
    } else if (ordenacao === 'preco-asc') {
        filtrados.sort((a, b) => a.preco - b.preco);
    } else if (ordenacao === 'preco-desc') {
        filtrados.sort((a, b) => b.preco - a.preco);
    }

    return filtrados; 
}

function abrirModal(produtos, id) {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
        $('#modal-nome').text(produto.nome);
        $('#modal-imagem').attr('src', produto.imagem);
        $('#modal-preco').text(produto.preco.toFixed(2));
        $('#modal-categoria').text(produto.categoria);
        $('#modal-descricao').text(produto.descricao);
        $('#modal').show();
    }
}