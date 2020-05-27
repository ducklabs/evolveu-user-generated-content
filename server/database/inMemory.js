let content = []

function clear() {
  content=[]
  return Promise.resolve()
}

function addPost(newContent) {
  let addedPost = { ...newContent, id: content.length}
  content.push(addedPost)
  return Promise.resolve(addedPost)
}

function updatePost(messageWithNewContent) {
  if (messageWithNewContent.id === undefined) {
    throw new Error('Cannot update a message that is not in the database!')
  }
  content[messageWithNewContent.id] = { ...messageWithNewContent }
  return Promise.resolve()
}

function findAllPosts() {
  return Promise.resolve(content.slice())
}

function close() {
  return Promise.resolve()
}

module.exports = {
  clear,
  addPost,
  findAllPosts,
  updatePost,
  close
}
