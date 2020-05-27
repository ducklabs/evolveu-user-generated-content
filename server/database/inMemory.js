const seedMessage = {
  messageText: 'Your very first message',
  author: 'Anonymous',
  messageDate: new Date().toISOString().substring(0, 10),
}

let content = [seedMessage]

function addPost(newContent) {
  content.push(newContent)
}

function updatePost(newContent) {
  const messageToUpdate = content.find((c) => c.uid == newContent.uid)
  if (messageToUpdate) {
    messageToUpdate.messageText = newContent.messageText
  }
}

function findAllPosts() {
  return content.slice()
}

module.exports = {
  addPost,
  findAllPosts,
  updatePost
}
