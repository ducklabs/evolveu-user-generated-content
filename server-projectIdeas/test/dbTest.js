let chai = require('chai')
let db = require('../database/inMemory')

let expect = chai.expect

describe('Database', (done)=> {

  beforeEach('clean out the database', (done) => {
    db.clear().then(done, done)
  })

  after('close the database connection', (done) => {
    db.close().then(done, done)   
  })

  it('should be empty at the start of the test', (done) => {
    db.findAllPosts()
    .then((posts) => {
        expect(posts).to.be.an('array')
        expect(posts.length).to.equal(0)
    })
    .then(done)
    .catch(done)
  })

  it('should find a post that is added', (done) => {
    const projectIdea = {
      title: 'my project',
      description: 'Your very first projectIdea',
      contact: 'Anonymous',
      postedDate: new Date().toISOString().substring(0, 10),
    }

    db.addPost(projectIdea)
    .then(() => db.findAllPosts())    
    .then((posts) => {
        expect(posts).to.be.an('array')
        expect(posts.length).to.equal(1)
        expect(posts[0].description).to.equal('Your very first projectIdea')
    })
    .then(done)
    .catch(done)
  })

  it('should update a post', (done) => {
    const projectIdea = {
        title: 'my project',
        description: 'Your very first projectIdea',
        contact: 'Anonymous',
        postedDate: new Date().toISOString().substring(0, 10),
      }
    
    db.addPost(projectIdea)
    .then((addedMessage) => {
        let updatedMessage = { ...addedMessage }
        updatedMessage.description = 'My updated projectIdea'
        return db.updatePost(updatedMessage)
    })
    .then(() => db.findAllPosts())
    .then((posts) => {
        expect(posts).to.be.an('array')
        expect(posts.length).to.equal(1)
        expect(posts[0].description).to.equal('My updated projectIdea')
    })
    .then(done)
    .catch(done)
  })

})