<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>Swiper demo</title>
    <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
    />
    <!-- Link Swiper's CSS -->
    <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css"
    />

    <!-- Demo styles -->
    <style>

        .swiper {
            width: 100%;
            height: 300px;
            margin-left: auto;
            margin-right: auto;
        }

    </style>
</head>

<body>


<div class="flex-container">
    <ul class="tabs-block">
        <div class="slider"></div>
        <li>Alpha</li>
        <li>Bravo</li>
        <li>Charlie</li>
        <li>Delta</li>
    </ul>

    <div class="article-block">
        <div class="article">
            <h1>Alpha Title</h1>
            <img src="https://lestar.ru/assets/images/products/22/lestar-lasernye-stanki-wattsan0203.jpg" alt="">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe corporis laborum commodi ipsa consectetur blanditiis eum praesentium vero sed, alias totam earum, ut et veniam similique dolor dignissimos autem ad? Eveniet porro quaerat maiores non quibusdam
            doloremque ea rerum repellat, sapiente mollitia temporibus neque quas ut odio tempora! Amet, ullam!
        </div>
        <div class="article">
            <h1>Bravo Title</h1>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita temporibus ab aliquid ipsum cum soluta eos ad molestias neque cumque. Cupiditate laborum nam necessitatibus saepe inventore voluptates soluta? Quisquam, ea!
        </div>
        <div class="article">
            <h1>Charlie Title</h1>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, itaque quae! Cupiditate sed consequatur, delectus magni distinctio quam asperiores amet aliquid architecto animi tenetur sit repudiandae deserunt impedit voluptate, corporis eius nobis sequi
            dolore adipisci, illum quae soluta! Quam dolor perspiciatis repellat maxime quae molestiae sint a nam exercitationem ipsum maiores praesentium magnam suscipit excepturi illo minima, illum blanditiis nesciunt? Voluptatem quia at provident ad ipsa ratione,
            officia sequi error aliquid, expedita consectetur tempore eius et voluptate debitis praesentium beatae libero minus qui. </br></br>  Sequi dolore dolor quasi voluptatibus dignissimos iste. Eos pariatur sit vitae perspiciatis voluptas, dolorum quam asperiores
            tenetur, earum dignissimos ad veniam? Aliquid excepturi dolorum sed adipisci, iure culpa dolor eos itaque, reprehenderit unde praesentium magnam perspiciatis blanditiis?
        </div>
        <div class="article">
            <h1>Delta Title</h1>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis rem quidem amet voluptas quo sit beatae, eum adipisci doloribus repellat?
        </div>
    </div>
</div>

<script> console.clear();
    var targets = document.querySelectorAll("li");
    var articles = document.querySelectorAll(".article");
    var activeTab = 0;
    var old = 0;
    var heights = [];
    var dur = 0.4;
    var animation;

    for (let i = 0; i < targets.length; i++) {
        targets[i].index = i;
        heights.push(articles[i].offsetHeight); // get height of each article
        TweenMax.set(articles[i], {top: 0, y:-heights[i]}); // push all articles up out of view
        targets[i].addEventListener("click", doCoolStuff);
    }
    // set initial article and position bubble slider on first tab
    TweenMax.set(articles[0], {y:0});
    TweenMax.set(".slider", {x:targets[0].offsetLeft, width:targets[0].offsetWidth});
    TweenMax.set(targets[0], {color:"#fff"});
    TweenMax.set(".article-block", {height:heights[0]});

    function doCoolStuff() {
        // check if clicked target is new and if the timeline is currently active
        if(this.index != activeTab) {
            //if there's an animation in-progress, jump to the end immediately so there aren't weird overlaps.
            if (animation && animation.isActive()) {
                animation.progress(1);
            }
            animation = new TimelineMax();
            old = activeTab;
            activeTab = this.index;
            // animate bubble slider to clicked target
            animation.to(".slider", dur, {x:targets[activeTab].offsetLeft, width:targets[activeTab].offsetWidth});
            // change text color on old and new tab targets

            // slide current article down out of view and then set it to starting position at top
            animation.to(articles[old], dur, {y:heights[old], ease:Back.easeIn }, 0);
            animation.set(articles[old], {y:-heights[old]});
            // resize article block to accommodate new content
            //animation.to(".article-block", dur, {height:heights[activeTab]});
            // slide in new article
            animation.to(articles[activeTab], 1, {y:0, ease: Elastic.easeOut}, "-=0.25");
        }
    }
</script>

<!-- Swiper -->

<div class="flex-container">
    <div thumbsSlider="" class="swiper js-tabs">
        <ul class="swiper-wrapper">
            <li class="swiper-slide">
                <img src="https://swiperjs.com/demos/images/nature-1.jpg"/>
            </li>
            <li class="swiper-slide">
                <img src="https://swiperjs.com/demos/images/nature-1.jpg"/>
            </li>
            <li class="swiper-slide">
                <img src="https://swiperjs.com/demos/images/nature-1.jpg"/>
            </li>
            <li class="swiper-slide">
                <img src="https://swiperjs.com/demos/images/nature-1.jpg"/>
            </li>
            <li class="swiper-slide">
                <img src="https://swiperjs.com/demos/images/nature-1.jpg"/>
            </li>
            <li class="swiper-slide">
                <img src="https://swiperjs.com/demos/images/nature-1.jpg"/>
            </li>
        </ul>
    </div>
    <div class="swiper js-slider">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <img src="https://swiperjs.com/demos/images/nature-1.jpg"/>
            </div>
            <div class="swiper-slide">
                <img src="https://swiperjs.com/demos/images/nature-2.jpg"/>
            </div>
            <div class="swiper-slide">
                <img src="https://swiperjs.com/demos/images/nature-3.jpg"/>
            </div>
            <div class="swiper-slide">
                <img src="https://swiperjs.com/demos/images/nature-4.jpg"/>
            </div>
            <div class="swiper-slide">
                <img src="https://swiperjs.com/demos/images/nature-5.jpg"/>
            </div>
            <div class="swiper-slide">
                <img src="https://swiperjs.com/demos/images/nature-6.jpg"/>
            </div>
            <div class="swiper-slide">
                <img src="https://swiperjs.com/demos/images/nature-7.jpg"/>
            </div>
            <div class="swiper-slide">
                <img src="https://swiperjs.com/demos/images/nature-8.jpg"/>
            </div>
            <div class="swiper-slide">
                <img src="https://swiperjs.com/demos/images/nature-9.jpg"/>
            </div>
            <div class="swiper-slide">
                <img src="https://swiperjs.com/demos/images/nature-10.jpg"/>
            </div>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </div>
</div>

<!-- Swiper JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"></script>

<!-- Initialize Swiper -->
<script>
    const swiperLaunchWithThumbService = (elementGallery, elementThumbs) => {
        const swiperThumb = new Swiper(elementThumbs, {
            spaceBetween: 10,
            slidesPerView: 4,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
        });

        const swiperGallery = new Swiper(elementGallery, {
            spaceBetween: 0,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            thumbs: {
                swiper: swiperThumb
            },
            keyboard: true,
            breakpoints: {
                // when window width is >= 1024px
                1024: {
                    pagination: false,
                },
            },
        });
    };

    swiperLaunchWithThumbService('.js-slider', '.js-tabs');
</script>
</body>
</html>
