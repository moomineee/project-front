// exhibitions.html
async function getExhibitionsById() {
    let url = 'http://localhost:8080/api/v1/exhibitions?sort=id';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}

async function renderExhibitionsById() {
    let exhibitions = await getExhibitionsById();
    let exhibition = exhibitions.result.content;
    let html = '';
    exhibition.forEach(element => {
        let htmlSegment = `<div class="swiper-slide">
        <div class="testimonial-item">
            <img src=${element.mainImgUrl} class="testimonial-img" alt="">
            <h3>${element.name}</h3>
            <h4>${element.galleryLocation}</h4>
        </div>
    </div><!-- End testimonial item -->`;

        html += htmlSegment;
    });

    let container = document.querySelector('#swiper-wrapper1');
    container.innerHTML = html;
}

async function getExhibitionsByEndAt() {
    let url = 'http://localhost:8080/api/v1/exhibitions?sort=endAt';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}

async function renderExhibitionsByEndAt() {
    let exhibitions = await getExhibitionsByEndAt();
    let exhibition = exhibitions.result.content;
    let html = '';
    exhibition.forEach(element => {
        let htmlSegment = `<div class="swiper-slide">
        <div class="testimonial-item">
            <img src=${element.mainImgUrl} class="testimonial-img" alt="">
            <h3>${element.name}</h3>
            <h4>${element.galleryLocation}</h4>
        </div>
    </div><!-- End testimonial item -->`;

        html += htmlSegment;
    });

    let container = document.querySelector('#swiper-wrapper2');
    container.innerHTML = html;
}


async function renderExhibisionForwork() {
    let exhibitions = await getExhibitionsById();
    let exhibition = exhibitions.result.content;
    let html = '';
  
    exhibition.forEach(element => {
      html += `
      <a href="work-single.html" class="col-sm-6 col-lg-4 text-decoration-none exhibition freeExhibition">
          <div class="service-work overflow-hidden card mx-5 mx-sm-0 mb-5">
              <img class="card-img-top" src=${element.mainImgUrl} alt="...">
              <div class="card-body">
                  <h5 class="card-title light-300 text-dark">${element.title}</h5>
                  <p class="card-text light-300 text-dark">
                      ${element.description}
                  </p>
                  <span class="text-decoration-none text-primary light-300">
                        Read more <i class='bx bxs-hand-right ms-1'></i>
                    </span>
              </div>
          </div>
      </a>
      `;
    });
  
    const div = document.getElementById('exhibision_container');
    div.innerHTML = html;
  }