$(document).ready(function() {
    let produtos = []; 
    let produtosFiltrados = []; 

    $('#carregar-produtos').click(function() {
        $('#loading').show();
        $('#error').hide();
        $.ajax({
            url: 'data/produtos.json',
            method: 'GET',
            success: function(data) {
                console.log(data.mensagem);
                produtos = data.produtos;
                produtosFiltrados = [...produtos];
                preencherCategorias(produtos); 
                renderizarProdutos(produtosFiltrados); 
                $('#loading').hide();
            },
            error: function() {
                $('#loading').hide();
                $('#error').show();
            }
        });
    });

    $('#busca').on('keyup', function() {
        produtosFiltrados = aplicarFiltrosEOrdenacao(produtos, produtosFiltrados); 
        renderizarProdutos(produtosFiltrados);
    });

    $('#filtro-categoria').change(function() {
        produtosFiltrados = aplicarFiltrosEOrdenacao(produtos, produtosFiltrados);
        renderizarProdutos(produtosFiltrados);
    });

    $('#ordenacao').change(function() {
        produtosFiltrados = aplicarFiltrosEOrdenacao(produtos, produtosFiltrados);
        renderizarProdutos(produtosFiltrados);
    });

    $(document).on('click', '.ver-detalhes', function() {
        abrirModal(produtos, $(this).data('id')); 
    });

    $('#close-modal').click(function() {
        $('#modal').hide();
    });

    $(window).click(function(e) {
        if (e.target.id === 'modal') {
            $('#modal').hide();
        }
    });
});