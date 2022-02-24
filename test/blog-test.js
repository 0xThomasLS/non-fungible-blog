const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Blog', function () {
  it('Manage blog name', async function () {
    const name1 = 'Toto'
    const name2 = 'Tata'

    const Blog = await ethers.getContractFactory('Blog')
    const blog = await Blog.deploy(name1, 'Not-Tested')
    await blog.deployed()

    expect(await blog.name()).to.equal(name1)

    const tx = await blog.setName(name2)
    await tx.wait()

    expect(await blog.name()).to.equal(name2)
  })

  it('Manage blog descriptionn', async function () {
    const desc1 = 'Toto'
    const desc2 = 'Tata'

    const Blog = await ethers.getContractFactory('Blog')
    const blog = await Blog.deploy('Not-Tested', desc1)
    await blog.deployed()

    expect(await blog.description()).to.equal(desc1)

    const tx = await blog.setDescription(desc2)
    await tx.wait()

    expect(await blog.description()).to.equal(desc2)
  })

  it('Manage social network link', async function () {
    const testLink = 'http://test.example/'

    const Blog = await ethers.getContractFactory('Blog')
    const blog = await Blog.deploy('Not-Tested', 'Not-Tested')
    await blog.deployed()

    // Read default
    expect((await blog.socialNetworks()).length).to.equal(0)

    // Add social link
    let tx = await blog.addSocialNetwork(testLink)
    await tx.wait()

    let networks = await blog.socialNetworks()

    expect(networks).to.have.lengthOf(1)
    expect(networks[0]).to.equal(testLink)

    // Remove social link
    tx = await blog.removeSocialNetworkById(0)
    await tx.wait()

    expect(await blog.socialNetworks()).to.have.lengthOf(0)
  })
})
