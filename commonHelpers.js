import{i as g,a as v}from"./assets/vendor-2dcf4ad5.js";(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function d(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(t){if(t.ep)return;t.ep=!0;const o=d(t);fetch(t.href,o)}})();document.addEventListener("DOMContentLoaded",()=>{const m=document.getElementById("search-form"),c=document.querySelector(".gallery"),d=document.querySelector(".load-more"),l=document.querySelector(".modal"),t=document.querySelector(".modal-content");let o=1;m.addEventListener("submit",async e=>{e.preventDefault();const n=e.target.elements.searchQuery.value.trim();o=1,n?await i(n):g.error({title:"Error",message:"Please enter a search query."})}),d.addEventListener("click",async()=>{const e=m.elements.searchQuery.value.trim();o++,e&&await i(e)}),l.addEventListener("click",()=>b());async function i(e){try{const r=(await v.get("https://pixabay.com/api/",{params:{key:"41114250-186ebd042d251d6e26d9d298e",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:40}})).data.hits;r.length>0?(o===1&&(c.innerHTML=""),r.forEach(a=>{const s=L(a,r);c.appendChild(s)}),d.style.display="block"):(d.style.display="none",g.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again."}))}catch(n){console.error("Error fetching images:",n.message)}}function L(e,n){const r=document.createElement("div");r.classList.add("photo-card");const a=document.createElement("img");a.src=e.webformatURL,a.alt=e.tags,a.loading="lazy",a.addEventListener("click",()=>E(n,n.indexOf(e)));const s=document.createElement("div");s.classList.add("info");const u=document.createElement("p");u.classList.add("info-item"),u.innerHTML=`<b>Likes:</b> ${e.likes}`;const p=document.createElement("p");p.classList.add("info-item"),p.innerHTML=`<b>Views:</b> ${e.views}`;const f=document.createElement("p");f.classList.add("info-item"),f.innerHTML=`<b>Comments:</b> ${e.comments}`;const y=document.createElement("p");return y.classList.add("info-item"),y.innerHTML=`<b>Downloads:</b> ${e.downloads}`,s.appendChild(u),s.appendChild(p),s.appendChild(f),s.appendChild(y),r.appendChild(a),r.appendChild(s),r}function E(e,n){t.innerHTML="";const r=document.createElement("img");r.src=e[n].largeImageURL,r.alt=e[n].tags;const a=document.createElement("button");a.innerText="Previous",a.addEventListener("click",()=>h(e,n-1));const s=document.createElement("button");s.innerText="Next",s.addEventListener("click",()=>h(e,n+1)),t.appendChild(r),t.appendChild(a),t.appendChild(s),l.style.display="flex"}function h(e,n){if(n>=0&&n<e.length){const r=document.querySelector(".modal-content img");r.src=e[n].largeImageURL,r.alt=e[n].tags}}function b(){l.style.display="none"}});
//# sourceMappingURL=commonHelpers.js.map