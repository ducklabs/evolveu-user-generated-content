let content = []
let users = [{
  id: 1,
  firstName: 'john',
  lastName: 'doe',
  email: 'john@doe.com',
  username: 'username',
  password: 'password' // Plain text password. VERY BAD. NEVER DO THIS.
}]

function clear() {
  content = []
  return Promise.resolve()
}

function addPost(newContent) {
  let addedPost = { ...newContent, id: content.length }
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

function checkUserNameAndPassword(username, password) {
  // find the user
  const user = users.find(u => u.username === username);

  // check if the password is good
  let passwordIsCorrect = user && user.password === password;
  if (passwordIsCorrect) {
    const { password, ...userWithoutPassword } = user; // Rest operator - Takes the rest of the user object besides password.
    return userWithoutPassword;
  }
}

function getUserById(userId) {
  return users.find(u => u.id === userId);
}

module.exports = {
  clear,
  addPost,
  findAllPosts,
  updatePost,
  close,
  checkUserNameAndPassword,
  getUserById
}
