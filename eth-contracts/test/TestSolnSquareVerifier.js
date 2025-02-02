// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

contract('SolnSquareVerifier', async (accounts) => {

    const owner = accounts[0];
    const to = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];
    const account_five = accounts[4];
    const account_six = accounts[5];
    const account_seven = accounts[6];
    const account_eight = accounts[7];
    const account_nine = accounts[8];
    const account_ten = accounts[9];

    const tokenId = 1;
    const token2 = 2;
    const token3 = 3;
    const token4 = 4;
    const token5 = 5;
    const token6 = 6;
    const token7 = 7;
    const token8 = 8;
    const token9 = 9;
    const token10 = 10;

    const name = "Greg Housing Token";
    const symbol = "GGT";
    const tokenURI = "https://ipfs.io/ipfs/QmPDvMhwGWbzKQX8bsBrJ2DXxw6n1thqhKe1ATDYEUKPRg?filename=house.json"

    // Contents from proof.json file generated by Zokrates
    const proofJSON = {
        "proof": {
          "a": [
            "0x21343861d91d0d6cbea6ceb1e5d6656986bb196f0c9a9e9b08451b488cb03b97",
            "0x04fc063bced924cd1e90a0e895a63cdd79a79218dacf5f9891275c2f22f822b7"
          ],
          "b": [
            [
              "0x215e32824993c8738150502bccb8d600d9425f0f2b5742ff1c11efe1ab8cef26",
              "0x07888fe792a52c25718d3bab0ff02cacfe8d194848ae9a2bda948d92fc623fd1"
            ],
            [
              "0x0dfe9c1e18b6c850c73ab02d48eda81848b00d7091a9155de1fd2696b50fd36d",
              "0x0e42e97be0d58c167596decf8a8d3f7163a95afaa531aabd04305883f3a24e42"
            ]
          ],
          "c": [
            "0x18af3bf26398033384f1474dc84292f72f6310e95677876cb178ed9e69941951",
            "0x0b3cc9199975ef0f0e152fa7cefa372d81dc66161d1b1773aa96a2103e3bbbad"
          ]
        },
        "inputs": [
          "0x0000000000000000000000000000000000000000000000000000000000000009",
          "0x0000000000000000000000000000000000000000000000000000000000000001"
        ]
    };

    // Extracting contents from JSON
    const {
        proof, 
        inputs
    } = proofJSON;


    // Extracting a, b, c from the proofs json
    const {
        a,
        b, 
        c
    } = proof;


    describe('Accepting Proofs', () => {


        it('should accept a proof which is correct', async () => {
            let isReverted = false;

            try {
                // Testing if a new solution can be added to the contract
                this.contract = await SolnSquareVerifier.new(owner, {
                    from: owner
                });

                await this.contract.addSolution(a, b, c, inputs, tokenId, {
                    from: owner
                });
            } 
            catch (e) {
                isReverted = true;

                // When error is caught
                console.log(e);
            }

            assert.equal(isReverted, false, "The assertion should not revert");
        });


        it('should revert a duplicate proof', async () => {
            let isReverted = false;

            try {

                // Duplicating Proofs and checking if it fails

                await this.contract.addSolution(a, b, c, inputs, tokenId, {
                    from: owner
                });
            } 
            catch (e) {
                isReverted = true;
            }

            assert.equal(isReverted, true, "Duplicate proof is not reverted");
        })
    });

    describe('Minting ERC721 Tokens', async () => {

        it('should not mint tokens before proof is given', async () => {
            let isReverted = false;

            try {
                this.contract = await SolnSquareVerifier.new(owner, {
                    from: owner
                });

                await this.contract.mint(to,tokenId,tokenURI,{
                    from: owner
                });
            } 
            catch (e) {
                isReverted = true;
            }

            assert.equal(isReverted, true, "It did not revert");
        });

        it('can mint new tokens when valid proof is provided', async () => {
            let isReverted = false;

            try {
                await this.contract.addSolution(a, b, c, inputs, tokenId, {
                    from: owner
                });
                await this.contract.mint(to,tokenId,tokenURI,{
                    from: owner
                });
            } 
            catch (e) {
                isReverted = true;

                // When error is caught
                console.log(e);
            }

            assert.equal(isReverted, false, "It reverted");
        });
    });
});
