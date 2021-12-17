import { ItemCarrinho } from "./itemCarrinho";

export class Carrinho {
    itens: ItemCarrinho[] = [];

    pegarItens(): ItemCarrinho[] {
        return this.itens;
    }

    limpar() {
        this.itens = [];
    }

    adicionarItem(item: ItemCarrinho) {
        let foundItem = this.itens.find((mItem) => mItem.id === item.id);
        if (foundItem) {
            foundItem.quantidade += item.quantidade;
        } else {
            this.itens.push(item);
        }
    }

    atualizarItem(item: ItemCarrinho) {
        if (item.quantidade === 0) { // Zerar o item é o mesmo que remover
            this.removerItem(item.id);
            return;
        }

        let foundItem = this.itens.find((mItem) => mItem.id === item.id);
        if (foundItem) {
            foundItem.quantidade = item.quantidade;
        }
    }

    removerItem(idItem: number) {
        let index = this.itens.findIndex((mItem) => mItem.id === idItem);
        if (index >= 0) {
            this.itens.splice(index, 1);
        }
    }

    calcularPrecoTotal(): number {
        let total: number = 0;
        this.itens.forEach((item) => {
            total += item.quantidade * item.preco;
        });
        return total;
    }
}