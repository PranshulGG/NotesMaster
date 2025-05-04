const wrap = document.querySelector('.main_app_wrap');
const mainWeat = document.querySelector('.main-weat');
const maxHeight = 180;
const minHeight = 0;
const maxOpacity = 1;
const minOpacity = 0;

let ticking = false;

if(wrap){
    wrap.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollPosition = wrap.scrollTop;
            const newHeight = Math.max(minHeight, maxHeight - scrollPosition);
            const newOpacity = Math.max(minOpacity, maxOpacity - (scrollPosition / maxHeight));

            if(scrollPosition > 20){
                wrap.classList.add('scrolled')
               document.getElementById('goupFab').style.transform = 'scale(1)';
            } else{
                wrap.classList.remove('scrolled')
                document.getElementById('goupFab').style.transform = 'scale(0)';
            }

            ticking = false;
        });
        ticking = true;
    }
});}

function goUpFab(){
    document.querySelector('.main_app_wrap').scrollTop = 0
}
