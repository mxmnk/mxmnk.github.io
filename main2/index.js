const data = [
  {  
    "name": "Westworld",
    "cover": "images/0.jpg",
    "background": "imgs/0.jpg"
  },
  {
    "name": "Game of Thrones",
    "cover": "images/1.jpg"
  },
  {
    "name": "Silicon Valley",
    "cover": "images/2.jpg"
  },
  {
    "name": "Gravity Falls",
    "cover": "images/3.jpg"
  }, 
  {
    "name": "The Walking Dead",
    "cover": "images/4.jpg"
  },
  {
    "name": "Better Caul Saul",
    "cover": "images/5.jpg"
  },
  {
    "name": "Breaking Bad",
    "cover": "images/6.jpg"
  },
  {
    "name": "Mr.Robot",
    "cover": "images/7.jpg"
  },
  {
    "name": "Rick and Morty",
    "cover": "images/8.jpg"
  },
  {
    "name": "Sons of Anarchy",
    "cover": "images/9.jpg"
  },
  {
    "name": "Watchmen",
    "cover": "images/10.jpg"
  },
  {
    "name": "Chernobyl",
    "cover": "images/11.jpg"
  },
  {
    "name": "The Witcher",
    "cover": "images/12.jpg"
  },
  {
    "name": "True Detective",
    "cover": "images/13.jpg"
  },
  {
    "name": "Insecure",
    "cover": "images/14.jpg"
  },
  {
    "name": "True Love",
    "cover": "images/15.jpg"
  },
  {
    "name": "Veep",
    "cover": "images/16.jpg"
  },
  {
    "name": "Sharp Objects",
    "cover": "images/17.jpg"
  },
  {
    "name": "Entourage",
    "cover": "images/18.jpg"
  },
  {
    "name": "Barry",
    "cover": "images/19.jpg"
  },
  {
    "name": "The Sopranos",
    "cover": "images/20.jpg"
  },
  {
    "name": "His Dark Materials",
    "cover": "images/21.jpg"
  },
  {
    "name": "Big Little Lies",
    "cover": "images/22.jpg"
  },
  {
    "name": "Six Feet Under",
    "cover": "images/23.jpg"
   },
 
  // {
  //   "name": "",
  //   "cover": ""
  // },


];


let qwerty = document.getElementsByClassName("items");

for (let j = 0; j < qwerty.length; j++) {
  for (let i = 0; i < data.length; i++) {
    qwerty[j].innerHTML += 
    `<div class="item"><img src="images/${i}.jpg" alt="${data[i].name}">
    <p>${data[i].name}</p>
    <span id="year">2019</span>
    </div>`;
  }
}

// document.getElementById("search").addEventListener("keyup", () => {
//   let filterValue, input, div, p, a, i;
//   input = document.getElementById("search");
//   filterValue = input.value.toUpperCase();
//   div = document.getElementById("container");
//   p = div.getElementsByTagName("div");
    
//     for (i = 0 ; i < p.length ; i++) {
//       a = p[i]; 
//         if(a.innerHTML.toUpperCase().indexOf(filterValue) > -1){
//           p[i].style.display = "";      
//         } else {
//           p[i].style.display = "none";
//         }}}
//     );




// document.getElementById("search").addEventListener("keyup", filter);

// function filter() {
//   let filterValue, input, div, p, a, i;
//   input = document.getElementById("search");
//   filterValue = input.value.toUpperCase();
//   div = document.getElementById("container");
//   p = div.getElementsByTagName("div");
    
//     for (i = 0 ; i < p.length ; i++) {
//       a = p[i]; 
//         if(a.innerHTML.toUpperCase().indexOf(filterValue) > -1){
//           p[i].style.display = "";      
//         } else {
//           p[i].style.display = "none";
//         }
//     }
// }





/*DELETE ACTIVE */
const slider = document.querySelector('#containerrrr');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX); //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
  console.log(walk);
});







document.addEventListener('dragstart', (event) => {
  event.preventDefault();
}, true);
