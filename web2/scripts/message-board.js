
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

//---- below here are server facing functions
function postMessageToServer(message) {
  
}

function getMessagesFromServer(message) {

}

function updatePageWithMessages(messages) {
    messages.forEach(message => {
        
    })
}