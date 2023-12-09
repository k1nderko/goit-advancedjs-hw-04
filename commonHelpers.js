import{S as h,i as n,a as g}from"./assets/vendor-aa7a424a.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const o={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")};let c=1;o.loadMoreBtn.style.display="none";const d=new h(".gallery a",{captionData:"alt",captionPosition:"bottom",captionDelay:250});n.settings({position:"topRight"});o.searchForm.addEventListener("submit",p);o.loadMoreBtn.addEventListener("click",f);async function f(){c+=1;try{const a=o.searchForm.elements.searchQuery.value,r=await m(a,c);o.gallery.insertAdjacentHTML("beforeend",u(r.hits)),c===Math.ceil(r.totalHits/40)?(o.loadMoreBtn.style.display="none",n.show({message:"We're sorry, but you've reached the end of search results."})):(o.loadMoreBtn.style.display="block",d.refresh())}catch(a){console.error("Error loading more images:",a),n.error({message:"Error fetching more images. Please try again."})}}async function p(a){a.preventDefault(),c=1,o.gallery.innerHTML="",o.loadMoreBtn.style.display="none";const r=a.currentTarget.elements.searchQuery.value.trim();if(!r){n.show({message:"Sorry, there are no images matching your search query. Please try again."});return}try{const s=await m(r);if(s.hits.length===0){n.show({message:"Sorry, there are no images matching your search query. Please try again."}),o.loadMoreBtn.style.display="none";return}o.gallery.insertAdjacentHTML("afterbegin",u(s.hits)),d.refresh(),o.loadMoreBtn.style.display="block",c===Math.ceil(s.totalHits/40)&&(o.loadMoreBtn.style.display="none",n.show({message:"We're sorry, but you've reached the end of search results."}))}catch(s){console.error("Error fetching images:",s),n.error({message:"Error fetching images. Please try again."})}}async function m(a,r=1){const s="https://pixabay.com/api/",i="41114250-186ebd042d251d6e26d9d298e";try{const e=await g.get(s,{params:{key:i,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:40}});return e.data.hits.length===0?{hits:[],totalHits:0}:e.data}catch(e){throw new Error(e.message||"Error fetching images")}}function u(a){return a.map(({webformatURL:r,largeImageURL:s,tags:i,likes:e,views:t,comments:l,downloads:y})=>`
    <div class="photo-card"><a class="img-link" href="${s}">
    <img class="photo-card-img"src="${r}" alt="${i}" loading="lazy" /></a>
    <div class="info">
        <p class="info-item">
            <b>Likes ${e}</b>
        </p>
            <p class="info-item">
        <b>Views ${t}</b>
        </p>
        <p class="info-item">
            <b>Comments ${l}</b>
        </p>
        <p class="info-item">
            <b>Downloads ${y}</b>
        </p>
    </div>
</div>
    `).join("")}
//# sourceMappingURL=commonHelpers.js.map
