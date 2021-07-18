var ERC721MintableComplete = artifacts.require('CustomERC721Token'); // Compile Contract inside ERC721Mintable.sol file

contract('TestERC721Mintable', (accounts) => {

    const token1 = 1;
    const token2 = 2;
    const token3 = 3;
    const token4 = 4;
    const token5 = 5;
    const token6 = 6;
    const token7 = 7;
    const token8 = 8;
    const token9 = 9;
    const token10 = 10;

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];
    const account_five = accounts[4];
    const account_six = accounts[5];
    const account_seven = accounts[6];
    const account_eight = accounts[7];
    const account_nine = accounts[8];
    const account_ten = accounts[9];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({
                from: account_one
            });

            // TODO: mint multiple tokens
            await this.contract.mint(account_one, token1, "https://ipfs.io/ipfs/QmPDvMhwGWbzKQX8bsBrJ2DXxw6n1thqhKe1ATDYEUKPRg?filename=house.json");
            await this.contract.mint(account_one, token2, "https://ipfs.io/ipfs/QmPDvMhwGWbzKQX8bsBrJ2DXxw6n1thqhKe1ATDYEUKPRg?filename=house.json");
            await this.contract.mint(account_two, token3, "https://ipfs.io/ipfs/QmPDvMhwGWbzKQX8bsBrJ2DXxw6n1thqhKe1ATDYEUKPRg?filename=house.json");
            await this.contract.mint(account_three, token4, "https://ipfs.io/ipfs/QmPDvMhwGWbzKQX8bsBrJ2DXxw6n1thqhKe1ATDYEUKPRg?filename=house.json");
            await this.contract.mint(account_three, token5, "https://ipfs.io/ipfs/QmPDvMhwGWbzKQX8bsBrJ2DXxw6n1thqhKe1ATDYEUKPRg?filename=house.json");
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply.call();
            assert(totalSupply, 5, "Total supply should be three.");
        })

        it('should get token balance', async function () { 
            let balance1 = await this.contract.balanceOf(account_one);
            assert(balance1, 2, "Incorrect balance");

            let balance2 = await this.contract.balanceOf(account_two);
            assert(balance2, 1, "Incorrect balance");

            let balance3 = await this.contract.balanceOf(account_three);
            assert(balance3, 2, "Incorrect balance");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI.call(token1);
            assert(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "Incorrect TokenURI");

            tokenURI = await this.contract.tokenURI.call(token2);
            assert(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/2", "Incorrect TokenURI");
            
            tokenURI = await this.contract.tokenURI.call(token3);
            assert(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/3", "Incorrect TokenURI");

            tokenURI = await this.contract.tokenURI.call(token4);
            assert(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/4", "Incorrect TokenURI");

            tokenURI = await this.contract.tokenURI.call(token5);
            assert(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/5", "Incorrect TokenURI");
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_one, account_four, token1, {
                from: account_one
            });
            let owner = await this.contract.ownerOf.call(token1);
            assert(owner, account_four, "incorrect owner");

            await this.contract.transferFrom(account_four, account_one, token1, {
                from: account_four
            });
            owner = await this.contract.ownerOf.call(token1);
            assert(owner, account_one, "Incorrect owner");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let isMintingStopped = false;
            try {
                await this.contract.mint(account_one, token1, "https://ipfs.io/ipfs/QmPDvMhwGWbzKQX8bsBrJ2DXxw6n1thqhKe1ATDYEUKPRg?filename=house.json", {
                    from: account_three
                });
            } catch (error) {
                isMintingStopped = true;
            }
            assert(isMintingStopped, true, "Minting did not fail. Hence, there is an error in the contract");
        })

        it('should return contract owner', async function () { 
            let contractOwner = await this.contract.getOwner.call();
            assert(contractOwner, account_one, "Incorrect contract owner");
        })

    });
})