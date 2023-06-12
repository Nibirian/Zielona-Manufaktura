const footerYear = document.querySelector(".footer__year");

const navMobile = document.querySelector(".nav-mobile");
const navBtn = document.querySelector(".hamburger");
const allNavItems = document.querySelectorAll(".nav-link");

const cookieBox = document.querySelector(".cookie-box");
const cookieBtn = document.querySelector(".cookie-btn");

//====================================

const handleCurrentYear = () => {
	const year = new Date().getFullYear();
	footerYear.innerText = year;
};
handleCurrentYear();

//===========================================================
const showCookie = () => {
	const cookieEaten = localStorage.getItem("cookie");
	if (cookieEaten) {
		cookieBox.classList.add("hide");
	}
};

const handleCookieBox = () => {
	localStorage.setItem("cookie", "true");
	cookieBox.classList.add("hide");
};

cookieBtn.addEventListener("click", handleCookieBox);
showCookie();

//========================================

const handleNav = () => {
	navMobile.classList.toggle("nav-mobile--active");

	navBtn.classList.toggle("is-active");

	allNavItems.forEach((item) => {
		item.addEventListener("click", () => {
			navBtn.classList.remove("is-active");
		});
	});
	allNavItems.forEach((item) => {
		item.addEventListener("click", () => {
			navMobile.classList.remove("nav-mobile--active");
		});
	});
};

navBtn.addEventListener("click", handleNav);

//===========================================================

const cards = document.querySelectorAll(".main-card");

function showCard() {
	cards.forEach((card) => {
		card.classList.remove("active");
		this.classList.add("active");
	});
}

cards.forEach((card) => card.addEventListener("click", showCard));

//================================================

window.onscroll = function () {
	scrollBtn();
};

function topFunction() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//================================================

let mybutton = document.querySelector(".goToTopBtn");

function scrollBtn() {
	if (
		document.body.scrollTop > 570 ||
		document.documentElement.scrollTop > 570
	) {
		mybutton.classList.add("top_btn_appear");
	} else {
		mybutton.classList.remove("top_btn_appear");
	}
}

//====================================

// Params
let mainSliderSelector = ".main-slider",
	navSliderSelector = ".nav-slider",
	interleaveOffset = 0.5;

// Main Slider
let mainSliderOptions = {
	loop: true,
	speed: 1000,
	autoplay: {
		delay: 3000,
	},
	loopAdditionalSlides: 10,
	grabCursor: true,
	watchSlidesProgress: true,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	on: {
		init: function () {
			this.autoplay.stop();
		},
		imagesReady: function () {
			this.el.classList.remove("loading");
			this.autoplay.start();
		},
		slideChangeTransitionEnd: function () {
			let swiper = this,
				captions = swiper.el.querySelectorAll(".caption");
			for (let i = 0; i < captions.length; ++i) {
				captions[i].classList.remove("show");
			}
			swiper.slides[swiper.activeIndex]
				.querySelector(".caption")
				.classList.add("show");
		},
		progress: function () {
			let swiper = this;
			for (let i = 0; i < swiper.slides.length; i++) {
				let slideProgress = swiper.slides[i].progress,
					innerOffset = swiper.width * interleaveOffset,
					innerTranslate = slideProgress * innerOffset;

				swiper.slides[i].querySelector(".slide-bgimg").style.transform =
					"translateX(" + innerTranslate + "px)";
			}
		},
		touchStart: function () {
			let swiper = this;
			for (let i = 0; i < swiper.slides.length; i++) {
				swiper.slides[i].style.transition = "";
			}
		},
		setTransition: function (speed) {
			let swiper = this;
			for (let i = 0; i < swiper.slides.length; i++) {
				swiper.slides[i].style.transition = speed + "ms";
				swiper.slides[i].querySelector(".slide-bgimg").style.transition =
					speed + "ms";
			}
		},
	},
};
let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);

// Navigation Slider
let navSliderOptions = {
	loop: true,
	loopAdditionalSlides: 10,
	speed: 1000,
	spaceBetween: 5,
	slidesPerView: 5,
	centeredSlides: true,
	touchRatio: 0.2,
	slideToClickedSlide: true,
	direction: "vertical",
	on: {
		imagesReady: function () {
			this.el.classList.remove("loading");
		},
		click: function () {
			mainSlider.autoplay.stop();
		},
	},
};
let navSlider = new Swiper(navSliderSelector, navSliderOptions);

// Matching sliders
mainSlider.controller.control = navSlider;
navSlider.controller.control = mainSlider;

//===================================================

const counterItems = document.querySelectorAll('.counter')
const counterBox = document.querySelector('.counter__box')

const options = {
	rootMargin: '-270px'
}

const startCounter = entry => {
	console.log(entry[0].isIntersecting);

	if (entry[0].isIntersecting) {
		counterItems.forEach(counter => {
			
			const updateCounter = () => {
				const finalNumber = counter.getAttribute('data-number')
				const value = parseInt(counter.textContent)

				const speed = finalNumber / 100
				
				if(value < finalNumber) {
					counter.textContent = `${Math.floor(value + speed)}`
					setTimeout(updateCounter, 8)
				} else {
					counter.textContent = finalNumber
				}
			}

			updateCounter()

		})
	}
}


const observer = new IntersectionObserver(startCounter, options)
observer.observe(counterBox)
