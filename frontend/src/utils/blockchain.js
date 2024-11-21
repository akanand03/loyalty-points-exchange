class Blockchain {
    constructor() {
        this.chain = [];
        this.createBlock(0, '0'); // Genesis block
    }

    createBlock(amount, previousHash) {
        const block = {
            index: this.chain.length + 1,
            timestamp: new Date(),
            amount,
            previousHash,
            hash: this.calculateHash(amount, previousHash),
        };
        this.chain.push(block);
        return block;
    }

    calculateHash(amount, previousHash) {
        return `${amount}-${previousHash}-${new Date().getTime()}`.toString('base64');
    }

    addTransaction(transaction) {
        const previousBlock = this.chain[this.chain.length - 1];
        const block = this.createBlock(
            transaction,
            previousBlock ? previousBlock.hash : '0'
        );
        return block.hash; // Return the hash for transaction reference
    }
}

module.exports = new Blockchain();
