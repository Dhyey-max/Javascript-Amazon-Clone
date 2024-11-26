// const xhr = new XMLHttpRequest();
// xhr.addEventListener('load', () => {
//     console.log(xhr.response);
// })
// xhr.open('GET', 'https://supersimplebackend.dev/products');
// xhr.send();


// const greetings = new XMLHttpRequest();
// greetings.addEventListener('load',() => {
//     console.log(greetings.response);
// })
// greetings.open('GET',"https://supersimplebackend.dev/greeting");
// greetings.send();

// fetch('https://supersimplebackend.dev/greeting').then((response) => {
//     return response.text();
// }).then((text) => {
//     console.log(text);
// });

// async function makeRequest() {
//     const response = await fetch('https://supersimplebackend.dev/greeting');
//     const text = await response.text();
//     console.log(text);
// }

// makeRequest();

async function makeRequestPost() {
  try {
    const response = await fetch('https://supersimplebackend.dev/greeting', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Dharm'
    })
  });

  if (response.status >= 400) {
    throw response;
  }

  const text = await response.text();
  console.log(text);
  
  } catch (error) {
    if(error.status === 400) {
      console.log(await error.json());
    } else {
      console.log('CORS error. your request is blocked by the backend');
    }
  }
}

makeRequestPost();

async function amazonRequest() {
  const response = await fetch('https://amazon.com');
  const text = response.text();
  console.log(text);
}

