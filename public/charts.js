
 let myChart = document.getElementById('myChart').getContext('2d');
 let newChart = new Chart(myChart, {
     type: 'bar',
     data: {
         labels: ['interview', 'declined', 'pending', 'emailed', 'job offered', 'take-home test', 'appointment set', 'applied'],
         datasets: [{
          label: 'Current Job Status', 
          data: [1, 2, 3, 4, 2, 4, 6, 1],
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
     options: {},
 })
//  for (let i = 0; i < data.jobs.length; i++) {
//     dataStatus.push(data.jobs[i].status);
//     statusCount += 1;
//     if (data.jobs[i].status === 'interview') {
//         labelObj.interview = labelObj.interview + 1 || 1
//     }
//     if (data.jobs[i].status === 'declined') {
//         labelObj.declined = labelObj.declined + 1 || 1
//     }
//     if (data.jobs[i].status === 'pending') {
//         labelObj.pending = labelObj.pending + 1 || 1
//     }
//     if (data.jobs[i].status === 'emailed') {
//         labelObj.emailed = labelObj.emailed + 1 || 1
//     }
//     if (data.jobs[i].status === 'job offered') {
//         labelObj.offered = labelObj.offered + 1 || 1
//     }
//     if (data.jobs[i].status === 'take-home test') {
//         labelObj.takeHome = labelObj.takeHome + 1 || 1
//     }
//     if (data.jobs[i].status === 'appointment set') {
//         labelObj.appointment = labelObj.appointment + 1 || 1
//     }
//     if (data.jobs[i].status === 'applied') {
//         labelObj.applied = labelObj.applied + 1 || 1
//     }
   
//     console.log(applied, interview, declined, pending, appointment, takeHome, offered, emailed, statusCount)

// let labelObj = {
//     applied : 0,
//     emailed : 0,
//     offered : 0,
//     interview : 0,
//     takeHome : 0,
//     appointment : 0,
//     declined : 0,
//     pending : 0,
// };

// const labelHeader = async function getChart() {
//     const response = await fetch('/api/v1/jobs')
//     const newData = await response.text();
//     //const table = data.split('\n').slice(1);
//     // table.forEach(row => {
        
//     // }) 
//     console.log(response)  
//   }
//   labelHeader()