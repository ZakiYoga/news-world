// Add class active Navbar
const menuItems = document.querySelectorAll('nav ul li');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// Mobile Navbar
const toggleOpen = document.querySelector('.menu-toggleOpen');
const toggleClose = document.querySelector('.menu-toggleClose');
const navMobile = document.querySelector('nav');

document.addEventListener('DOMContentLoaded', () => {
    navMobile.classList.remove('active');

    toggleOpen.addEventListener('click', () => {
        navMobile.classList.add('active');
    });

    toggleClose.addEventListener('click', () => {
        navMobile.classList.remove('active');
    });

    const menuLinks = document.querySelectorAll('nav ul li a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMobile.classList.remove('active');
        });
    });
});

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("mainCardContainer");
    const prevBtn = document.getElementById("prev-card");
    const nextBtn = document.getElementById("next-card");

    const scrollAmount = 300;

    // const checkButtonState = () => {
    //     prevBtn.disabled = container.scrollLeft === 0;
    //     nextBtn.disabled =
    //         container.scrollLeft + container.offsetWidth >= container.scrollWidth;
    // };

    prevBtn.addEventListener("click", () => {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        setTimeout(checkButtonState, 300);
    });

    nextBtn.addEventListener("click", () => {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        setTimeout(checkButtonState, 300);
    });

    // checkButtonState();
});

// truncateText
const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('./DATA/data.json');
    const data = await response.json();
    const news = data.news;
    const streams = data.stream;

    // filter data
    const latestNews = news.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
    const politics = news.filter(politic => politic.category.toLowerCase() === 'politics');
    const lifestyles = news.filter(lifestyle => lifestyle.category.toLowerCase() === 'lifestyle').slice(0, 5);
    const business = news.filter(busines => busines.category.toLowerCase() === 'business');
    const sport = news.filter(sport => sport.category.toLowerCase() === 'sport');

    // section news
    const newsContainer = document.getElementById('news').querySelector('.news-card-container');

    latestNews.forEach(n => {
        newsContainer.innerHTML += `
            <article class="news-item">
                <img src="./assets/images/${n.imgUrl}.png" alt="${n.title}" />
                <div class="news-content">
                    <div class="news-label">
                        <i class="fa-solid fa-tag"></i>
                        <span>${n.category}</span>
                    </div>
                    <a href="${n.articleLink}" class="title" target="_blank">
                        ${n.title}
                    </a>
                    <div class="time">
                        ${n.date}
                    </div>
                </div>
            </article>
        `;
    });

    // section politics
    const politicsContainer = document.getElementById('politics').querySelector('.main-card-container');

    politics.forEach(politic => {
        politicsContainer.innerHTML += `
            <article class="card-item">
                <div class="card-image">
                    <img src="./assets/images/${politic.imgUrl}.png" alt="${politic.title}" />
                    <div class="category">
                        <i class="fa-solid fa-tag"></i>
                        ${politic.category}
                    </div>
                </div>
                <div class="card-content">
                    <a href="${politic.articleLink}" class="btn-readmore" target="_blank">
                        <h4 class="title">
                            ${politic.title}
                        </h4>
                    </a>
                    <div class="description">
                    ${truncateText(politic.description, 120)}
                    </div>
                </div>
                <div class="footer-card-item">
                    ${politic.jurnalist} | ${politic.date}
                </div>
            </article>
        `;
    });

    // section lifestyle
    const lifestylesContainer = document.getElementById('lifestyle').querySelector('.main-card-container');

    lifestyles.forEach(lifestyle => {
        lifestylesContainer.innerHTML += `
            <article class="card-item">
                <div class="card-image">
                    <img src="./assets/images/${lifestyle.imgUrl}.png" alt="${lifestyle.title}" />
                    <div class="category">
                        <i class="fa-solid fa-tag"></i>
                        ${lifestyle.category}
                    </div>
                </div>
                <div class="label-firstItem">
                    <div class="label-author">
                        <i class="fa-solid fa-user"></i>
                        ${lifestyle.jurnalist}
                    </div>
                    |
                    <div class="label-datetime">
                        <i class="fa-regular fa-calendar-days"></i>
                        ${lifestyle.date}
                    </div>
                </div>
                <div class="card-content">
                    <a href="${lifestyle.articleLink}" class="btn-readmore" target="_blank">
                        <h4 class="title">
                            ${lifestyle.title}
                        </h4>
                    </a>
                    <div class="description">
                        ${lifestyle.description}
                    </div>
                    <div class="footer-card-item">
                        ${lifestyle.jurnalist} | ${lifestyle.date}
                    </div>
                </div>
        </article>
        `;
    });

    // section business
    const businessContainer = document.getElementById('business').querySelector('.main-card-container');

    business.forEach(business => {
        businessContainer.innerHTML += `
            <article class="card-item">
                <div class="card-image">
                    <img src="./assets/images/${business.imgUrl}.png" alt="${business.title}" />
                </div>
                <div class="card-content">
                    <div class="category">
                        <i class="fa-solid fa-hashtag"></i>
                        ${business.subCategory}
                    </div>
                    <a href="${business.articleLink}" target="_blank">
                        <h4 class="title">
                        ${business.title}
                    </h4>
                    </a>
                    <div class="label-datetime">
                        <i class="fa-regular fa-calendar-days"></i>
                        ${business.date}
                    </div>
                    <div class="description">
                        ${truncateText(business.description, 150)}
                    </div>
                    <a href="${business.articleLink}" class="btn-readmore" target="_blank">
                        <span>Read more</span>
                        <div class="icon">
                            <i class="fa-solid fa-circle-right"></i>
                        </div>
                    </a>
                </div>
            </article>
        `;
    });

    // section sport 
    const sportContainer = document.getElementById('sport').querySelector('.main-card-container');

    sport.forEach(sport => {
        sportContainer.innerHTML += `
            <article class="card-item">
                <div class="card-image">
                    <img src="./assets/images/${sport.imgUrl}.png" alt="${sport.title}" />
                </div>
                <div class="label-firstItem">
                    <div class="label-author">
                        <i class="fa-solid fa-user"></i>
                        ${sport.jurnalist}
                    </div>
                    <div class="label-datetime">
                        <i class="fa-regular fa-calendar-days"></i>
                        ${sport.date}
                    </div>
                </div>
                <div class="card-content">
                    <a href="${sport.articleLink}" target="_blank">
                        <h4 class="title">${sport.title}</h4>
                    </a>
                    <div class="description">
                       ${truncateText(sport.description, 100)}
                    </div>
                    <div class="category">
                        <i class="fa-solid fa-hashtag"></i>
                        ${sport.subCategory}
                    </div>
                </div>
            </article>
    `;
    });

    // section stream
    const streamContainer = document.getElementById('stream').querySelector('.stream-sidebar');

    streams.forEach(stream => {
        const streamItem = document.createElement('div');
        streamItem.classList.add('video-item');

        streamItem.innerHTML = `
            <a href="https://www.youtube.com/watch?v=${stream.id}" target="_blank">
                                        <div class="video-thumbnail">
                                            <img src="https://img.youtube.com/vi/${stream.id}/maxresdefault.jpg" alt="${stream.title}" />
                                            <div class="play-button">
                                                <i class="fa-solid fa-play"></i>
                                            </div>
                                        </div>
                                        <div class="content">
                                            <h4>${stream.title}</h4>
                                            <p>${stream.views} x ditonton &#8226;
                                                ${stream.date}
                                                </p>
                                        </div>
                                    </a>
        `;

        streamContainer.appendChild(streamItem);
    });

    // Count Items by category
    const categoryCounts = {};

    news.forEach(item => {
        categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
    });

    Object.keys(categoryCounts).forEach(category => {
        const countElement = document.getElementById(`count-${category}`);
        if (countElement) {
            countElement.textContent = categoryCounts[category];
        }
    });

    // aside hot news trends
    const trendAsideContainer = document.getElementById('trend-topics').querySelector('.aside-card-container');

    latestNews.forEach(ln => {
        trendAsideContainer.innerHTML += `
            <article class="card-item-aside">
                <img src="./assets/images/${ln.imgUrl}.png" alt="${ln.title}">
                <div class="content">
                    <div class="aside-label-content">
                        <i class="fa-solid fa-hashtag"></i>
                        ${ln.subCategory}
                    </div>
                    <a href="${ln.articleLink}" target="_blank" class="title-aside">
                        ${ln.title}
                    </a>
                    <div class="label-datetime">
                        <i class="fa-regular fa-calendar-days"></i>
                        ${ln.date}
                    </div>
                </div>
            </article>
    `;
    });

});