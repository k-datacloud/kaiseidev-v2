
window.addEventListener('load', () => {
    window.addEventListener('scroll', () => {
        const underlines = document.querySelectorAll('.service-list .underline');
    
        underlines.forEach( (line, index) => {
            const height = window.innerHeight;
            let rect = line.getBoundingClientRect();
            if ( rect.top + 20  < height  && rect.top > 0) {
                line.classList.add('is-active');
            } else {
                line.classList.remove('is-active');
            }
        })
    })
})

window.addEventListener('resize', () => {
    window.addEventListener('scroll', () => {
        const underlines = document.querySelectorAll('.service-list .underline');
    
        underlines.forEach( (line, index) => {
            const height = window.innerHeight;
            let rect = line.getBoundingClientRect();
            if ( rect.top + 20  < height  && rect.top > 0) {
                line.classList.add('is-active');
            } else {
                line.classList.remove('is-active');
            }
        })
    })
})

//accordion

const accordionItems = document.querySelectorAll('.accordion__item');
const accordionIcons = document.querySelectorAll('.accordion__icon');
accordionItems.forEach((item, index) => {
    const answer = item.querySelector('.accordion__answer');
  
    item.querySelector('.accordion__question').addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
  
      if (isOpen) {
        item.classList.remove('is-open');
        accordionIcons[index].src = accordionIcons[index].dataset.close;
        answer.style.height = 0;
        answer.style.marginTop = 0;
      } else {
        item.classList.add('is-open');
        answer.style.height = answer.scrollHeight + 'px';
        accordionIcons[index].src = accordionIcons[index].dataset.open;
        if (innerWidth < 768) {
          answer.style.marginTop = 'calc(16/16 * 1rem)';
        }
        else {
          answer.style.marginTop = 'calc(24/16 * 1rem)';
        }
      }
    });
});


//footer
window.addEventListener('load', () => {
    const footer = document.querySelector('.footer');
    const footerContentTop = document.querySelector('.footer__logo');
    const originalHeight = footerContentTop.getBoundingClientRect().height;
    // footerContentTop.style.height = `0px`;
    window.addEventListener('scroll', () => {
        if ( footer.getBoundingClientRect().bottom - 100 < window.innerHeight ) {
            // footerContentTop.style.height = `${originalHeight}px`;
            footerContentTop.classList.add('is-active');
        } 
    })
})

//menubtn
const menuBtn = document.querySelector('.menu-btn');
const headerNav = document.querySelector('.header__nav');
menuBtn.addEventListener('click', () => {
    if (headerNav.classList.contains('is-active')) {
        headerNav.classList.remove('is-active');
    } else {
        headerNav.classList.add('is-active');
    }
})

document.querySelectorAll('.header-list__link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (!targetElement) return;

        const sectionTop = ( targetElement.getBoundingClientRect().top - 120 ) + window.scrollY;
        const duration = 800;
        smoothScroll(sectionTop, duration);
        headerNav.classList.remove('is-active');
    })
});

function smoothScroll(target, duration) {
    const startPosition = window.scrollY;
    const distance = target - startPosition;
    let start = null;

    function animation(currentTime) {
        if (!start) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = Math.min(1, timeElapsed / duration);

        const easeInOutQuad = (t) => {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        };


        window.scrollTo(0, startPosition + distance * easeInOutQuad(run));

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    window.requestAnimationFrame(animation);
}


const index = ["index", "message", "what i can do", "helpful notes", "contact"];
const sections = [
    document.querySelector('.message'),
    document.querySelector('.service'),
    document.querySelector('.faqs'),
    document.querySelector('.footer')
]

const menuBtnLink = document.querySelector('.menu-btn__link');
let currentIndex = 0;

const checkCurrentSection = () => {
    const scrollY = window.scrollY;
    const triggerOffset = 100;
    let found = false;
  
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop - triggerOffset;
      const sectionBottom = sectionTop + section.offsetHeight;
      const isLastSection = index === sections.length - 1;
  
      if (isLastSection && !found) {
        // 他にどこにも属してなければ最後にしちゃう
        if (scrollY >= sectionTop - window.innerHeight / 2) {
          currentIndex = index + 1;
          found = true;
        }
      } else if (!isLastSection && scrollY >= sectionTop && scrollY < sectionBottom && !found) {
        currentIndex = index + 1;
        found = true;
      }
    });
  
    // いずれのセクションにも当てはまらない（トップ付近）
    if (!found && window.scrollY < sections[0].offsetTop - 100) {
        currentIndex = 0;
      }
  
    menuBtnLink.textContent = index[currentIndex];
  };
  
  

window.addEventListener('scroll', () => {
    if (innerWidth < 768) {
        checkCurrentSection();
    }
}
    
);
window.addEventListener('resize', () => {
    if (innerWidth < 768) {
        checkCurrentSection();
    }
}
);
window.addEventListener('load', () => {
    if (innerWidth < 768) {
        checkCurrentSection();
    }
}
);

  