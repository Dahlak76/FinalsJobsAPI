
 let myChart = document.getElementById('myChart').getContext('2d');
 let newChart = new Chart(myChart, {
     type: 'bar',
     data: {
         labels: ['interview', 'declined', 'pending', 'emailed', 'job offered', 'take-home test', 'appointment set', 'applied'],
         datasets: [{
          label: 'sample',
          data: [1, 2, 3, 4, 2, 4, 6, 1],
          backgroundColor: 'green'
         }]
     },
     options: {},
 })