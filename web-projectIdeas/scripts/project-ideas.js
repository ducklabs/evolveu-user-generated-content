
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

function todaysDateString() {
  return new Date().toISOString().substring(0,10)
}

function inputHasSomeText(id) {
  return getInputValue(id) !== ''
}

// getting and setting projectIdeas on the page
exampleProject = { 
  title: "My awesome project", 
  description: "Hi, this is a test projectIdea 0", 
  contact: "Tony Enerson", 
  postedDate: "2020-05-19"
}

function addProjectIdeaToPage(projectIdea) {
    let projectIdeaHtml = `<div class="project-idea"><div class="project-idea-title">${projectIdea.title}</div>${projectIdea.description}<div class="project-idea-footer">${projectIdea.contact}: ${projectIdea.postedDate}</div></div>`
    appendHtml('projectIdeasArea', projectIdeaHtml)
}

function updatePageProjectIdeas(projectIdeas) {
  cleanOutElement('projectIdeasArea')
  projectIdeas.forEach(function(projectIdea) {
    addProjectIdeaToPage(projectIdea)
  })
  if (projectIdeas.length === 0) {
    appendHtml('projectIdeasArea', '<div class="project-idea"><i>No projects are added yet... you can be the first to add one!</i></div>')
  }
}
  
function getProjectIdeaFromForm() {
  return {
    title: getInputValue('projectTitle'),
    description: getInputValue('projectDescription'),
    contact: getInputValue('projectContact'),
    postedDate: todaysDateString()
  }
}

// form validation and button handlers
function enablePostButtonIfApplicable() {
  if (inputHasSomeText('projectTitle') && inputHasSomeText('projectDescription') && inputHasSomeText('projectContact'))
    enable('postProjectButton')
  else 
    disable('postProjectButton')
}

function postButtonPressed() {
  let projectIdea = getProjectIdeaFromForm()
  postProjectIdeaToServerAndUpdatePage(projectIdea)
}

//---- server interaction
function postProjectIdeaToServerAndUpdatePage(projectIdea) {
    $.ajax({
        url:'/api/v1/addPost',
        type:"POST",
        data:JSON.stringify(projectIdea),
        contentType:"application/json; charset=utf-8",
        success: function() {
            console.log('In post callback')
            updateProjectIdeasFromServer()
        },
        fail: function(error) {
            // what do we do here?
        }
    })
}

function updateProjectIdeasFromServer() {
    $.getJSON('/api/v1/posts')
     .done(function(projectIdeas) {
         updatePageProjectIdeas(projectIdeas)
     })
     .fail(function(error) {
        // what do we do here????
     })
}

$(document).ready(function() {
  updateProjectIdeasFromServer()
})

