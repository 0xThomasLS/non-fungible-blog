// SPDX-License-Identifier: GPL-3.0+
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyArticle is ERC721, ERC721URIStorage, ERC721Enumerable, Pausable, Ownable, ERC721Burnable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Article", "TEXT") {}

    function _baseURI()
        internal
        pure
        override
        returns (string memory)
    {
        return "ipfs://";
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function mintToken(address to, string memory metadataURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIdCounter.increment();

        uint256 id = _tokenIdCounter.current();
        _safeMint(to, id);
        _setTokenURI(id, metadataURI);

        return id;
    }

    function tokensOfOwner(address owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 length = ERC721.balanceOf(owner);
        uint256[] memory itemList = new uint256[](length);

        for (uint256 i = 0; i < length; i++){
            itemList[i] = tokenOfOwnerByIndex(owner, i);
        }

        return itemList;
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function pause()
        public
        onlyOwner
    {
        _pause();
    }

    function unpause()
        public
        onlyOwner
    {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
