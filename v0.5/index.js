const data = [{
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
    }
];


let content = document.getElementById('content');
for (let i = 0; i < 7; i++) {
    content.innerHTML +=
        `<div id ="content">
         <div class="slideshow-container">
         <div class="items no-scrollbar noselect" id="container"></div>
         <img class="slideBack" src="./icons/sliderL.svg">
         <img class="slide" src="./icons/sliderR.svg">
         </div>
         <br>`;

}

let footer = document.getElementsByClassName('footer');
for (let i = 0; i < footer.length; i++) {
    footer[i].innerHTML +=
        `<a href="" target="_blank" class="footer__social-item"><img src="./icons/tg.svg" class="footer__social-icon"></a>
         <a href="" target="_blank" class="footer__social-item"><img src="./icons/fb.svg" class="footer__social-icon"></a>
         <a href="" target="_blank" class="footer__social-item"><img src="./icons/inst.svg" class="footer__social-icon"></a>
         <a href="" target="_blank" class="footer__social-item"><img src="./icons/twitter.svg" class="footer__social-icon"></a>
         <a href="" target="_blank" class="footer__social-item"><img src="./icons/yt.svg" class="footer__social-icon"></a>`;
}


let movies = document.getElementsByClassName('items');
for (let j = 0; j < movies.length; j++) {
    for (let i = 0; i < data.length; i++) {
        movies[j].innerHTML +=
            `<div class="item"><img src="images/${i}.jpg" alt="${data[i].name}">
             <p>${data[i].name}</p></div>`;
    }
}




const slider = document.getElementsByClassName('noselect');
let isDown = false;
let startX;
let scrollLeft;

for (let i = 0; i < 2; i++) {
    slider[i].addEventListener('mousedown', (e) => {
        isDown = true;
        slider[i].classList.add('active');
        startX = e.pageX - slider[i].offsetLeft;
        scrollLeft = slider[i].scrollLeft;
    });
    slider[i].addEventListener('mouseleave', () => {
        isDown = false;
        slider[i].classList.remove('active');
    });
    slider[i].addEventListener('mouseup', () => {
        isDown = false;
        slider[i].classList.remove('active');
    });
    slider[i].addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider[i].offsetLeft;
        const walk = (x - startX); //scroll-fast
        slider[i].scrollLeft = scrollLeft - walk;
        console.log(walk);
    });
}




document.addEventListener('dragstart', (event) => {
    event.preventDefault();
}, true);



let next = document.getElementsByClassName('slide');
for (let i = 0; i < next.length; i++) {
    next[i].addEventListener('click', () => {
        let container = document.getElementsByClassName('noselect');
        sideScroll(container[i], 'right', 2, window.screen.width, 10);
    });
}

let previous = document.getElementsByClassName('slideBack');
for (let i = 0; i < next.length; i++) {
    previous[i].addEventListener('click', () => {
        let container = document.getElementsByClassName('noselect');
        sideScroll(container[i], 'left', 2, window.screen.width, 10);
    });
}

function sideScroll(element, direction, speed, distance, step) {
    scrollAmount = 0;
    let slideTimer = setInterval(() => {
        if (direction === 'left') {
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if (scrollAmount >= distance) {
            window.clearInterval(slideTimer);
        }
    }, speed);
}
