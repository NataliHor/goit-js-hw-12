import{a as d,S as m,i as n}from"./assets/vendor-b11e2a50.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const x="https://pixabay.com/api/",P="44809751-3b2ccf197f9e8e95d68b14f11";async function g({q:s="",page:a=1,per_page:o=15}={}){try{return(await d.get(`${x}`,{params:{key:P,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:o,language:"en"}})).data}catch(l){throw console.error("Error fetching images:",l),l}}let S=new m(".gallery-item a",{captionsData:"alt",captionDelay:250}).refresh();function p(s){const a=document.querySelector(".gallery"),o=s.map(({webformatURL:l,largeImageURL:e,tags:r,likes:c,views:f,comments:u,downloads:h})=>`
        <li class="gallery-item">
          <a href="${e}">
            <img src="${l}" alt="${r}" loading="lazy" class="gallery-image"/>
          </a>
          <ul class="info">
            <li class="info-item"> <h2 class="info-text">Likes</h2> <p class="info-value">${c}</p> </li>
            <li class="info-item"> <h2 class="info-text">Views</h2> <p class="info-value">${f}</p> </li>
            <li class="info-item"> <h2 class="info-text">Comments</h2> <p class="info-value">${u}</p> </li>
            <li class="info-item"> <h2 class="info-text">Downloads</h2> <p class="info-value">${h}</p> </li>
          </ul>
        </li>
    `).join("");a.innerHTML+=o,S.refresh()}const L=document.querySelector(".gallery"),b=document.querySelector(".search-form"),y=document.querySelector(".loading"),i=document.querySelector(".load-btn"),t={q:"",page:1,per_page:15,maxPage:0};i.style.display="none";i.addEventListener("click",w);b.addEventListener("submit",q);async function q(s){s.preventDefault(),L.innerHTML="",t.page=1;const a=s.currentTarget;if(t.q=a.elements.query.value.toLowerCase(),t.q===""){n.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});return}y.style.display="flex",i.style.display="flex";try{const o=await g(t);o.hits.length===0?(i.style.display="none",n.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!!!"})):(t.maxPage=Math.ceil(o.totalHits/t.per_page),p(o.hits),t.page<t.maxPage?i.style.display="flex":(i.style.display="none",n.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})))}catch{n.error({position:"topRight",message:"Sorry, there was an error fetching images. Please try again later!"})}finally{y.style.display="none"}}async function w(){i.style.display="none",y.style.display="flex",t.page+=1,console.log(t.page),console.log(t.maxPage);try{const s=await g(t);p(s.hits),t.page<t.maxPage?i.style.display="flex":(i.style.display="none",n.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."}));const o=document.querySelector(".gallery").getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}catch{n.error({position:"topRight",message:"Sorry, there was an error fetching images. Please try again later!"})}finally{y.style.display="none"}}
//# sourceMappingURL=commonHelpers.js.map