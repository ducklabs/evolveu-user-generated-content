
function cleanOutElement(id) {
  $('#'+id).html('')
}

function appendHtml(id, htmlToAdd) {
  $('#'+id).append(htmlToAdd)
}

function setInputValue(id, newValue) {
    return $('#'+id).val(newValue)
}

function getInputValue(id) {
  return $('#'+id).val()
}

function hide(id) {
  $('#'+id).hide()
}

function show(id) {
  $('#'+id).show()
}

function disable(id) {
  $('#'+id).prop("disabled", true)
}

function enable(id) {
  $('#'+id).prop("disabled", false)
}

function inputHasSomeText(id) {
  return getInputValue(id) !== ''
}

function todaysDateString() {
  return new Date().toISOString().substring(0,10)
}

// getting and setting messages on the page
exampleMessage = { messageText: "Hi, this is a test message 0", author: "Tony Enerson", messageDate: "2020-05-19"}

function addMessageToPage(message) {
    let messageHtml = `<div class="message">${message.messageText}<div class="message-footer">${message.author}: ${message.messageDate}</div></div>`
    appendHtml('messagesArea', messageHtml)
}

function updatePageMessages(messages) {
  cleanOutElement('messagesArea')
  messages.forEach(function(message) {
    addMessageToPage(message)
  })
}
  
function getMessageFromForm() {
  return {
    messageText: getInputValue('messageText'),
    author: 'Anonymous',
    messageDate: todaysDateString()
  }
}

function postButtonPressed() {
}

//---- server interaction
function postMessageToServerAndUpdatePage(message) {
    $.ajax({
        url:'/api/v1/addPost',
        type:"POST",
        data:JSON.stringify(message),
        contentType:"application/json; charset=utf-8",
        success: function() {
            console.log('In post callback')
            updateMessagesFromServer()
        },
        fail: function(error) {
            // what do we do here?
        }
    })
}

function updateMessagesFromServer() {
    $.getJSON('/api/v1/posts')
     .done(function(messages) {
         updatePageMessages(messages)
     })
     .fail(function(error) {
        // what do we do here????
     })
}

// $(document).ready(function() {
//   updateMessagesFromServer()
// })

// some test data lying around
testMessages = [
    { messageText: "Hi, this is a test message 0", author: "Tony Enerson", messageDate: "2020-05-19"},
    { messageText: "Hi, this is a test message 1", author: "Chris Desmarais", messageDate: "2020-05-20"},
    { messageText: "Hi, this is a test message 2", author: "Sheldon Manabat", messageDate: "2020-05-20"},
    { messageText: "Hi, this is a test message 3", author: "Tony Enerson", messageDate: "2020-05-21"},
    { messageText: "Hi, this is a test message 4", author: "Tony Enerson", messageDate: "2020-05-22"}
]