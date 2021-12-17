import express from 'express';
import bodyParser from 'body-parser';

import { Carrinho } from './src/carrinho.js';
import { ItemCarrinho } from './src/itemCarrinho.js';
import { Usuario } from './src/usuario';

var app = express();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json());

var usuarios = [
    new Usuario(1, "Breno Miranda"),
    new Usuario(2, "Paulo Borba")
];

/**
 * @api {get} /usuarios/:id/carrinho Retorna os itens do carrinho do usuário // TODO: Melhor retornar o carrinho completo (uma representação dele)
 */
app.get('/usuario/:id/carrinho', function (req, res) {
    const id: number = +req.params.id;
    const usuario = usuarios.find(u => u.id == id);

    if (usuario) {
        return res.status(200).json({data: usuario.carrinho.pegarItens()});
    } else {
        return res.status(404).json({error: "Usuário não encontrado"});
    }
});

/**
 * @api {post} /usuarios/:id/carrinho Adiciona um item ao carrinho do usuário, retornando o carrinho atualizado
 */
app.post('/usuario/:id/carrinho', function (req, res) {
    const id: number = +req.params.id;
    const usuario = usuarios.find(u => u.id == id);

    const newItem: ItemCarrinho = <ItemCarrinho> req.body;
    try {
        usuario.carrinho.adicionarItem(newItem);
        return res.status(200).json({data: usuario.carrinho.pegarItens()});
    } catch (e) {
    } 
});

/**
 * @api {delete} /usuario/:id/carrinho/:idItem Remove o item com a id informada do carrinho do usuário, retornando o carrinho atualizado
 */
app.delete('/usuario/:id/carrinho/:idItem', function (req, res) {
    const id: number = +req.params.id;
    const usuario = usuarios.find(u => u.id == id);

    const idItem: number = +req.params.idItem;
    usuario.carrinho.removerItem(idItem);

    return res.status(200).json({data: usuario.carrinho.pegarItens()});
});

/**
 * @api {put} /usuario/:id/carrinho Atualiza o item com a id informada do carrinho do usuário, retornando o carrinho atualizado
 */
app.put('/usuario/:id/carrinho', function (req, res) {
    const id: number = +req.params.id;
    const usuario = usuarios.find(u => u.id == id);

    const item: ItemCarrinho = <ItemCarrinho> req.body;
    usuario.carrinho.atualizarItem(item);

    return res.status(200).json({data: usuario.carrinho.pegarItens()});
});

/**
 * @api {get} /usuario/:id/carrinho/total Retorna o valor total do carrinho do usuário
 */
app.get('/usuario/:id/carrinho/total', function (req, res) {
    const id: number = +req.params.id;
    const usuario = usuarios.find(u => u.id == id);

    return res.status(200).json({data: usuario.carrinho.calcularPrecoTotal()});
});

export { app };