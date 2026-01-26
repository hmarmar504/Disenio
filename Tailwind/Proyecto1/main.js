console.log('Hola');

const markAll = document.querySelector('#mark-all');
const numberElement = document.querySelector('#number');
const posts = document.querySelectorAll('.post');
updateNotifications();

posts.forEach(post =>{
    post.addEventListener('click',()=> {
        post.querySelector('.not-read').classList.remove('not-read');
        updateNotifications();
    })
})

markAll.addEventListener('click', () =>{
    const notReadElements = document.querySelectorAll('.not-read');
    notReadElements.forEach((Element) => {
        Element.classList.remove('not-read');
    })
    updateNotifications();
})
//El tio del video lo hace con funcion flecha, pero para funciones de este estilo me gusta mas asi, 
// ademas como la voy a llamar al principio para actualizar siempre, me viene mejor asi
function updateNotifications(){
    const notReadElementsActual = document.querySelectorAll('.not-read');
    numberElement.textContent = notReadElementsActual.length;
}