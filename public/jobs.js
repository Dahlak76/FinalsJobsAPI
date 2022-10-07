let dataStatus = [];
let statusCount = 0;
console.log(dataStatus, 'dataStatus......')
let applied = 0;
let emailed = 0;
let offered = 0;
let interview = 0;
let takeHome = 0;
let appointment = 0;
let declined = 0;
let pending = 0;

    
let labelObj = {
     applied: 0,
     emailed: 0,
     offered: 0,
     interview: 0,
     takeHome: 0,
     appointment: 0,
     declined: 0,
     pending: 0,
};
//['interview', 'declined', 'pending', 'emailed', 'job offered', 'take-home test', 'appointment set', 'applied'],
console.log(labelObj.interview, 'labelObj.interview....')
async function buildJobsTable(jobsTable, jobsTableHeader, token, message) {
  // section A
  try {
    response = await fetch('/api/v1/jobs', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    data = await response.json()
    // let dataStatus = [];
    // let statusCount = 0;
    //console.log(data, 'testing data.......')
    for (let i = 0; i < data.jobs.length; i++) {
        dataStatus.push(data.jobs[i].status);
        statusCount += 1;
        if (data.jobs[i].status === 'interview') {
            interview += 1
            labelObj.interview = labelObj.interview + 1;
        }
        if (data.jobs[i].status === 'declined') {
            declined += 1
        }
        if (data.jobs[i].status === 'pending') {
            pending += 1
        }
        if (data.jobs[i].status === 'emailed') {
            emailed += 1
        }
        if (data.jobs[i].status === 'job offered') {
            offered += 1
        }
        if (data.jobs[i].status === 'take-home test') {
            takeHome += 1
        }
        if (data.jobs[i].status === 'appointment set') {
            appointment += 1
        }
        if (data.jobs[i].status === 'applied') {
            applied += 1
        }
        //thisEvent = new Event('myChart')
        //document.dispatchEvent(thisEvent)
        console.log(applied, interview, declined, pending, appointment, takeHome, offered, emailed, statusCount)
    }
    console.log(dataStatus, 'dataStatus.....')
    var children = [jobsTableHeader]
    if (response.status === 200) {
        if (data.count === 0) {
            jobsTable.replaceChildren(...children) // clear this for safety
            return 0
        } else {
            for (let i=0;i<data.jobs.length;i++) {
                let editButton = `<td><button type="button" class="editButton" data-id=${data.jobs[i]._id}>edit</button></td>`
                let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.jobs[i]._id}>delete</button></td>`
                let rowHTML = `<td>${data.jobs[i].company}</td><td>${data.jobs[i].position}</td><td>${data.jobs[i].status}</td>${editButton}${deleteButton}`
                let rowEntry = document.createElement('tr')
                rowEntry.innerHTML = rowHTML
                children.push(rowEntry)
            }
            jobsTable.replaceChildren(...children)
        }
        return data.count
    } else {
        message.textContent = data.msg
        return 0
    }
} catch (err) {

    message.textContent = 'A communication error occurred.'
    return 0
}

  }


document.addEventListener('DOMContentLoaded', () => {
  const logoff = document.getElementById('logoff')
  const message = document.getElementById('message')
  const logonRegister = document.getElementById('logon-register')
  const logon = document.getElementById('logon')
  const register = document.getElementById('register')
  const logonDiv = document.getElementById('logon-div')
  const email = document.getElementById('email')
  const password = document.getElementById('password')
  const logonButton = document.getElementById('logon-button')
  const logonCancel = document.getElementById('logon-cancel')
  const registerDiv = document.getElementById('register-div')
  const name = document.getElementById('name')
  const email1 = document.getElementById('email1')
  const password1 = document.getElementById('password1')
  const password2 = document.getElementById('password2')
  const registerButton = document.getElementById('register-button')
  const registerCancel = document.getElementById('register-cancel')
  const jobs = document.getElementById('jobs')
  const jobsTable = document.getElementById('jobs-table')
  const jobsTableHeader = document.getElementById('jobs-table-header')
  const addJob = document.getElementById('add-job')
  const editJob = document.getElementById('edit-job')
  const company = document.getElementById('company')
  const position = document.getElementById('position')
  const status = document.getElementById('status')
  const addingJob = document.getElementById('adding-job')
  const jobsMessage = document.getElementById('jobs-message')
  const editCancel = document.getElementById('edit-cancel')

// section 2 
let showing = logonRegister
let token = null
document.addEventListener('startDisplay', async (e) =>{
    showing = logonRegister
    token = localStorage.getItem('token')
    if (token) { //if the user is logged in
        logoff.style.display = "block"
        const count = await buildJobsTable(jobsTable, jobsTableHeader, token, message)
        if (count > 0) {
            jobsMessage.textContent=''
            jobsTable.style.display = "block"
        } else {
            jobsMessage.textContent = "There are no jobs to display for this user."
            jobsTable.style.display = 'none'
        }
        jobs.style.display = "block"
        showing = jobs
        let dataArr = [interview, declined, pending, emailed, takeHome, appointment, applied];
 
        console.log(dataArr, 'dataArr....')
    
       //['interview', 'declined', 'pending', 'emailed', 'job offered', 'take-home test', 'appointment set', 'applied'],
         let myChart = document.getElementById('myChart').getContext('2d');
         let newChart = new Chart(myChart, {
             type: 'bar',
             data: {
                 labels: ['interview', 'declined', 'pending', 'emailed', 'take-home test', 'appointment set', 'applied'],
                 datasets: [{
                  label: 'Current Job Status', 
                  data: dataArr,
                  //data: [1, 2, 3, 4, 2, 4, 6, 1],
                  //data: dataStatus,
                  //data: interview, declined, pending, emailed, offered, takeHome, appointment, applied,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
                 }]
             },
             options: {
                plugins:  { 
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            font: {
                                size: 34
                            }
                        }
                    }
                }
            },
         })
         let myTotal = document.getElementById('myTotal').getContext('2d');
         const companiesCount = data.jobs.reduce((acc, curr) => {
            if (acc[curr.company] === undefined) {
              acc[curr.company] = 1;
            } else {
              acc[curr.company] = acc[curr.company] + 1;
            }
            return acc;
          }, {});
          
         let newTotal = new Chart(myTotal, {
             type: 'bar',
             data: {
                 //labels: Array.from(new Set(data.jobs.map(j => j.company))),
                 labels: Object.keys(companiesCount),
                 datasets: [{
                  label: 'Total positions applied for at each company', 
                  data: Object.values(companiesCount),
                  //data: [1, 2, 3, 4, 2, 4, 6, 1],
                  //data: dataStatus,
                  //data: interview, declined, pending, emailed, offered, takeHome, appointment, applied,
                  
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2,
                hoverOffset: 10,
                 }]
             },
             options: {
                plugins: {
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            font: {
                                size: 34
                            }
                        }
                    }
                }
            },
         })
    } else {
        logonRegister.style.display = "block"
    }
})

var thisEvent = new Event('startDisplay')
document.dispatchEvent(thisEvent)
var suspendInput = false
// section 3
document.addEventListener('click', async (e) => {
  if (suspendInput) {
      return // we don't want to act on buttons while doing async operations
  }
  if (e.target.nodeName === 'BUTTON') {
      message.textContent = ''
  }
  if (e.target === logoff) {
      localStorage.removeItem('token')
      token = null
      showing.style.display = "none"
      logonRegister.style.display = "block"
      showing = logonRegister
      jobsTable.replaceChildren(jobsTableHeader) // don't want other users to see
      message.textContent = "You are logged off."
  } else if (e.target === logon) {
      showing.style.display = "none"
      logonDiv.style.display = "block"
      showing = logonDiv
  } else if (e.target === register) {
      showing.style.display = "none"
      registerDiv.style.display = "block"
      showing = registerDiv
  } else if (e.target === logonCancel || e.target == registerCancel) {
      showing.style.display = "none"
      logonRegister.style.display = "block"
      showing = logonRegister
      email.value = ''
      password.value = ''
      name.value = ''
      email1.value = ''
      password1.value = ''
      password2.value = ''
  } else if (e.target === logonButton) {
      suspendInput = true
      try {
          response = await fetch('/api/v1/auth/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: email.value, password: password.value })
          })
          data = await response.json()
          if (response.status === 200) {
              message.textContent = `Logon successful.  Welcome ${data.user.name}`
              token = data.token
              localStorage.setItem('token', token)
              showing.style.display="none"
              thisEvent = new Event('startDisplay')
              email.value=''
              password.value=''
              document.dispatchEvent(thisEvent)
          } else {
              message.textContent = data.msg
          }
      } catch (err) {
        
          message.textContent = "A communications error occurred."
      }
      suspendInput = false;
  } else if (e.target === registerButton) {
      if (password1.value != password2.value) {
          message.textContent='The passwords entered do not match.'
      } else {
          suspendInput = true
          try {
              response = await fetch('/api/v1/auth/register', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ name: name.value, email: email1.value, password: password1.value })
              })
              data = await response.json()
              if (response.status === 201) {
                  message.textContent = `Registration successful.  Welcome ${data.user.name}`
                  token = data.token
                  localStorage.setItem('token', token)
                  showing.style.display="none"
                  thisEvent = new Event('startDisplay')
                  document.dispatchEvent(thisEvent)
                  name.value = ''
                  email1.value = ''
                  password1.value = ''
                  password2.value = ''
              } else {
                  message.textContent = data.msg
              }
          } catch (err) {
          
              message.textContent = "A communications error occurred."
          } 
          suspendInput=false
      } 
  }// section 4
  else if (e.target === addJob) {
    showing.style.display = "none"
    editJob.style.display = 'block'
    showing = editJob
    delete editJob.dataset.id
    company.value = ''
    position.value = ''
    status.value = 'pending'
    addingJob.textContent = 'add'
} else if (e.target === editCancel) {
    showing.style.display = 'none'
    company.value = ''
    position.value = ''
    status.value = 'pending'
    thisEvent = new Event('startDisplay')
    document.dispatchEvent(thisEvent)
} else if (e.target === addingJob) {
   
    if (!editJob.dataset.id) {// this is an attempted add
        suspendInput = true
        try {
            response = await fetch('/api/v1/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify( {
                    company: company.value,
                    position: position.value,
                    status: status.value
                })
            })
            
            data = await response.json()
            
            if (response.status === 201) { //successful create
                message.textContent = 'The job entry was created.'
                showing.style.display='none'
                thisEvent = new Event('startDisplay')
                //document.dispatchEvent(thisEvent)
                location.reload()
                company.value = ''
                position.value = ''
                status.value = 'pending'
            } else { // failure
                
                message.textContent = data.msg 
            }
        } catch (err) {
           
            message.textContent = 'A communication error occurred.'
        }
        suspendInput = false
    } else { // this is an update
        suspendInput = true
        try {
            const jobID = editJob.dataset.id
            response = await fetch(`/api/v1/jobs/${jobID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify( {
                    company: company.value,
                    position: position.value,
                    status: status.value
                })
            })
            data = await response.json()
            if (response.status === 200) {
                message.textContent = 'The entry was updated.'
                showing.style.display = 'none'
                company.value = ''
                position.value = ''
                status.value = 'pending'
                thisEvent = new Event('startDisplay')
                document.dispatchEvent(thisEvent)
            } else {
                message.textContent = data.msg
            }
        } catch(err) {
            
            message.textContent = 'A communication error occurred.'
        }
    } 
    suspendInput = false 
} // section 5
else if (e.target.classList.contains('editButton')) {
  editJob.dataset.id=e.target.dataset.id
  suspendInput = true
  try {
      response = await fetch(`/api/v1/jobs/${e.target.dataset.id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
      })
      data = await response.json()
      if (response.status === 200) {
          company.value = data.job.company
          position.value = data.job.position
          status.value = data.job.status
          showing.style.display = 'none'
          showing = editJob
          showing.style.display = 'block'
          addingJob.textContent = 'update'
          message.textContent = ''
      } else { // might happen if the list has been updated since last display
          message.textContent = 'The jobs entry was not found'
          thisEvent = new Event('startDisplay')
          document.dispatchEvent(thisEvent)
      }
  } catch (err) {
      message.textContent = 'A communications error has occurred.'
  }
  suspendInput = false
}
else if (e.target.classList.contains('editButton')) {
            editJob.dataset.id=e.target.dataset.id
            suspendInput = true
            try {
                response = await fetch(`/api/v1/jobs/${e.target.dataset.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                data = await response.json()
                if (response.status === 200) {
                    company.value = data.job.company
                    position.value = data.job.position
                    status.value = data.job.status
                    showing.style.display = 'none'
                    showing = editJob
                    showing.style.display = 'block'
                    addingJob.textContent = 'update'
                    message.textContent = ''
                } else { // might happen if the list has been updated since last display
                    message.textContent = 'The jobs entry was not found'
                    thisEvent = new Event('startDisplay')
                    document.dispatchEvent(thisEvent)
                }
            } catch (err) {
                message.textContent = 'A communications error has occurred.'
            }
            suspendInput = false
        } 
        else if (e.target.classList.contains('deleteButton')) {
          let deleteJob = e.target.dataset.id
          suspendInput = true
          try {
              response = await fetch(`/api/v1/jobs/${deleteJob}`, {
                  method: 'DELETE',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                  }
              })
              data = await response.json()
              if (response.status === 200) {
                  // showing.style.display = 'none'
                  // showing.style.display = 'block'
                  // addingJob.textContent = 'update'
                  message.textContent = 'job was deleted'
                  var thisEvent = new Event('startDisplay')
                  document.dispatchEvent(thisEvent)
              } else { // might happen if the list has been updated since last display
                  message.textContent = 'The jobs entry was not found'
                  thisEvent = new Event('startDisplay')
                  document.dispatchEvent(thisEvent)
              }
          } catch (err) {
              message.textContent = 'A communications error has occurred.'
          }
          suspendInput = false
      } 
})

})
//app.use(helmet());
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         ...helmet.contentSecurityPolicy.getDefaultDirectives(),
//         "script-src": ["'self'", "'unsafe-inline'", "example.com"],
//       },
//     },
//   })
// );
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );

//    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
