// about cookies
function setCookie(name, value, exp) {
    var date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

function getCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
};

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}

// security.html
async function getSecurity() {
    let url = 'http://localhost:8080/api/v1/example/security';
    try {
        let res = await fetch(url,{
            headers: {
                "Authorization": 'Bearer '+ getCookie("accessToken")
            }
        });
        return await res.text();
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}

async function renderSecurity() {
    let security = await getSecurity();
    let html = `<div class="user">
        <h2>${security} </h2>
        </div>`;

    let container = document.querySelector('.securitycontainer');
    container.innerHTML = html;
}

// exhibitions.html
async function getExhibitions() {
    let url = 'http://localhost:8080/api/v1/exhibitions';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}

async function renderExhibitions() {
    let exhibitions = await getExhibitions();
    let exhibition = exhibitions.result.content;
    let html = '';
    exhibition.forEach(element => {
        let htmlSegment = `<div class="exhibition">
        <h1>전시 아이디 ${element.id}</h1>
        <h2>전시명 ${element.name} 전시 상세 정보${element.detailInfo}</h2>
        </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.exhibitionscontainer');
    container.innerHTML = html;
}

// login.html
async function postLogin() {
    let url = 'http://localhost:8080/api/v1/users/login';
    let e = document.getElementById('loginemail').value
    let p = document.getElementById('loginpassword').value

    try {
        let res = await fetch(url,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                email: e,
                password: p,
            })
        });
        return await res.json();
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}

async function saveToken() {
    let tokens = await postLogin();
    let html = `<div class="user">
        <h2> Access Token: ${tokens.result.accessToken} </h2>
        <h2> Refresh Token: ${tokens.result.refreshToken}</h2>
        </div>`;
    let container = document.querySelector('.logincontainer');
    container.innerHTML = html;

    setCookie('accessToken',tokens.result.accessToken,1)
    let c = getCookie("accessToken");
    console.log("cookie: "+ c )
}


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


  // 전시회 검색 기능
  function searchExhibition() {
    if (searchInput.value !== "") {
      newArr = exhitibionArray.filter((el) =>
        el.name.toLowerCase().includes(searchInput.value.toLowerCase())
      );
  
      searchResult.innerHTML = "";
  
      newArr.map((contents) => {
        let result = document.createElement("div");
        searchResult.appendChild(result);
        result.innerHTML = `<div><img src="${contents.mainImgUrl}"/></div><div>${contents.name}<div>${contents.description}</div></div>`;
      });
    } else {
      searchResult.innerHTML = "";
    }
  }

