//SPDX-License-Identifier: GPL-3.0+
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract Blog is Ownable {
    string private blogName;
    string private blogDescription;
    string[] private blogSocialNetworks;

    constructor(string memory _name, string memory _description)
    {
        console.log('Deploying my blog with name:', _name);
        console.log('Description:', _description);
        blogName = _name;
        blogDescription = _description;
    }

    function name()
        public
        view
        returns (string memory)
    {
        return blogName;
    }

    function setName(string memory _name)
        public
        onlyOwner
    {
        console.log("Changing name from '%s' to '%s'", blogName, _name);
        blogName = _name;
    }

    function description()
        public
        view
        returns (string memory)
    {
        return blogDescription;
    }

    function setDescription(string memory _description)
        public
        onlyOwner
    {
        console.log("Changing description from '%s' to '%s'", blogDescription, _description);
        blogDescription = _description;
    }

    function socialNetworks()
        public
        view
        returns (string[] memory)
    {
        return blogSocialNetworks;
    }

    function addSocialNetwork(string memory _socialNetwork)
        public
        onlyOwner
    {
        blogSocialNetworks.push(_socialNetwork);
    }

    function removeSocialNetworkById(uint _index)
        public
        onlyOwner
    {
        require(_index < blogSocialNetworks.length, "index out of bound");

        for (uint i = _index; i < blogSocialNetworks.length - 1; i++) {
            blogSocialNetworks[i] = blogSocialNetworks[i + 1];
        }
        blogSocialNetworks.pop();
    }

}
