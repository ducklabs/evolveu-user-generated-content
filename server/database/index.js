let content = []

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
