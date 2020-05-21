const seedMessage = {
  messageText: 'Your very first message',
  author: 'Anonymous',
  messageDate: new Date().toISOString().substring(0, 10)
}

let content = [seedMessage]

function addPost(newContent) {
  content.push(newContent)
}

function findAllPosts() {
  return content.slice()
}

module.exports = {
  addPost,
  findAllPosts,
}
