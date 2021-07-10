const form = document.getElementById('vote-form');
const storySubmitForm = document.getElementById('create-poll-form');
var event;
var a = ["Kevin", "John", "Aby"];
var b = ["Kenny", "Mathew", "Antony"];
var rA = Math.floor(Math.random() * a.length);
var rB = Math.floor(Math.random() * b.length);
var name = a[rA] + ' ' + b[rB];
var user = sessionStorage.getItem("user")
if (!user) {
  user = name
  sessionStorage.setItem("user", name);
}

function display(id) {
  location.assign("http://localhost:3000/story?id=" + id)
}

if (storySubmitForm) {
  storySubmitForm.addEventListener('submit', e => {
    const title = document.querySelector('input[name=title]').value;
    document.querySelector('input[name=title]').value = ""
    const description = document.querySelector('textarea[name=desc]').value;
    document.querySelector('textarea[name=desc]').value = "";
    const data = {
      author: user,
      title: title,
      description: description,
    }
    console.log(title, description)
    fetch('http://localhost:3000/post', {
      method: 'post',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => {
          alert("Story posted sucessfully!")
        }
    )
    .catch(err => console.log(err));

    e.preventDefault();
  });
}

if (form) {
  // form.addEventListener('submit', e => {
  //   const choice = document.querySelector('input[name=os]:checked').value;
  //   const data = {
  //     os: choice,
  //     storyId: storyId,
  //     userId: user
  //   };
  //   fetch('http://localhost:3000/poll', {
  //     method: 'post',
  //     body: JSON.stringify(data),
  //     headers: new Headers({
  //       'Content-Type': 'application/json'
  //     })
  //   }).then(res => res.json())
  //   .catch(err => console.log(err));
  //:
  //   e.preventDefault();
  // });
  function vote(choice){
    const estimates = document.getElementsByClassName("estimates")
    for (estimate of estimates) {
      estimate.style.backgroundColor = estimate.innerHTML === choice ?  '#c4a65a': '#f5cf70'
    }

    const data = {
      os: choice,
      storyId: storyId,
      userId: user
    };
    fetch('http://localhost:3000/poll', {
      method: 'post',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(err => console.log(err));
  }
  fetch("http://localhost:3000/poll?storyId=" + storyId)
  .then(res => res.json())
  .then(data => {
    let votes = data.votes;
    let totalVotes = votes.length;
    document.querySelector(
        '#chartTitle').textContent = `Total Votes: ${totalVotes}`;

    let voteCounts = {
      '0': 0,
      '1/2': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '5': 0,
      '8': 0,
      '13': 0
    };

    voteCounts = votes.reduce((acc, vote) => (
            (acc[vote.estimate] = (acc[vote.estimate] || 0) + parseInt(
                vote.points)), acc),
        {}
    );
    let dataPoints = [
      {label: '0', y: voteCounts['0'] || 0},
      {label: '1/2', y: voteCounts['1/2'] || 0},
      {label: '1', y: voteCounts['1'] || 0},
      {label: '2', y: voteCounts['2'] || 0},
      {label: '3', y: voteCounts['3'] || 0},
      {label: '5', y: voteCounts['5'] || 0},
      {label: '8', y: voteCounts['8'] || 0},
      {label: '13', y: voteCounts['13'] || 0}
    ];

    const chartContainer = document.querySelector('#chartContainer');

    if (chartContainer) {
      // Listen for the event.
      document.addEventListener('votesAdded', function (e) {
        document.querySelector(
            '#chartTitle').textContent = `Total Votes: ${e.detail.totalVotes}`;
      });

      const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        data: [
          {
            type: 'column',
            dataPoints: dataPoints
          }
        ]
      });
      chart.render();

      // Enable pusher logging - don't include this in production
      Pusher.logToConsole = true;
      var pusher = new Pusher('7d90cde296e0f41003bb', {
        cluster: 'eu',
        encrypted: true
      });

      var channel = pusher.subscribe('os-poll');
      channel.bind('os-vote', function (data) {
        dataPoints.forEach((point) => {
          if (point.label == data.os) {
            point.y += data.points;
            totalVotes += data.points;
            event = new CustomEvent('votesAdded',
                {detail: {totalVotes: totalVotes}});
            // Dispatch the event.
            document.dispatchEvent(event);
          }
          if (point.label == data.removed) {
            point.y -= data.points;
            totalVotes -= data.points;
            event = new CustomEvent('votesAdded',
                {detail: {totalVotes: totalVotes}});
            // Dispatch the event.
            document.dispatchEvent(event);
          }
        });
        chart.render();
      })
    }

  });
}
