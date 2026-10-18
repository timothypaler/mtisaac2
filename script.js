const filters=[...document.querySelectorAll('[data-filter]')],entries=[...document.querySelectorAll('.learning-entry')];filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});entries.forEach(entry=>{entry.hidden=button.dataset.filter!=='all'&&entry.dataset.category!==button.dataset.filter})}));entries.forEach(entry=>entry.addEventListener('toggle',()=>{if(entry.open)entries.forEach(other=>{if(other!==entry)other.open=false})}));const viewer=document.querySelector('#photo-viewer'),fullPhoto=document.querySelector('#full-photo'),caption=document.querySelector('#full-caption');let lastPhoto;document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{lastPhoto=button;fullPhoto.src=`assets/${button.dataset.photo}.webp`;fullPhoto.alt=button.dataset.alt;caption.textContent=button.dataset.alt;viewer.showModal();document.body.classList.add('viewing')}));document.querySelector('.close-viewer').addEventListener('click',()=>viewer.close());viewer.addEventListener('click',e=>{if(e.target===viewer)viewer.close()});viewer.addEventListener('close',()=>{document.body.classList.remove('viewing');lastPhoto?.focus()});
// Academic period selector keeps the original preliminary journal intact.
function selectIsaacPeriod(term){
 document.querySelectorAll('[data-isaac-period]').forEach(section=>section.hidden=section.dataset.isaacPeriod!==term);
 document.querySelectorAll('[data-isaac-term]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.isaacTerm===term)));
 document.querySelector('#isaac-period-status').textContent=term==='midterms'?'Currently viewing the midterm journal.':'Currently viewing the preliminary journal.';
 const targets={learning:'midterm-learning',reflection:'midterm-reflection'};
 document.querySelectorAll('header nav a, .hero-copy .pill-button').forEach(link=>{const original=link.dataset.original||link.hash.slice(1);link.dataset.original=original;link.href='#'+(term==='midterms'&&targets[original]?targets[original]:original)});
}
document.querySelectorAll('[data-isaac-term]').forEach(button=>button.addEventListener('click',()=>selectIsaacPeriod(button.dataset.isaacTerm)));
document.querySelector('[data-isaac-explore]').addEventListener('click',()=>selectIsaacPeriod('midterms'));
const midtermIsaacEntries=[...document.querySelectorAll('.im-entry')];
document.querySelectorAll('[data-mid-filter]').forEach(button=>button.addEventListener('click',()=>{
 const category=button.dataset.midFilter;let count=0;midtermIsaacEntries.forEach(entry=>{entry.hidden=category!=='all'&&entry.dataset.midCategory!==category;if(!entry.hidden)count++});
 document.querySelectorAll('[data-mid-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 document.querySelector('#im-filter-status').textContent=category==='all'?`Showing all ${count} entries`:`Showing ${count} ${button.textContent.toLowerCase()} ${count===1?'entry':'entries'}`;
}));
midtermIsaacEntries.forEach(entry=>entry.addEventListener('toggle',()=>{if(entry.open)midtermIsaacEntries.forEach(other=>{if(other!==entry)other.open=false})}));
selectIsaacPeriod(location.hash.startsWith('#midterm-')?'midterms':'prelims');
