// tabs-nav

const TabNameLabel = document.getElementById('tab_label')

let currentTab = parseInt(localStorage.getItem('currentTab')) || 0;
showTab(currentTab);
function showTab(tabIndex) {



    document.getElementById(`tab-content-${currentTab}`).style.display = 'none';



    const previousTab = document.querySelector('.tab.active');
    const previousname = document.querySelector('.label.active-name');

    if (previousTab) {
        previousTab.classList.remove('active');
        previousname.classList.remove('active-name');

    }



    document.getElementById(`tab-content-${tabIndex}`).style.display = 'block';

    document.querySelectorAll('.tab')[tabIndex].classList.add('active');
    document.querySelectorAll('.label')[tabIndex].classList.add('active-name');
    currentTab = tabIndex;
    
    localStorage.setItem('currentTab', tabIndex);

}


document.querySelectorAll('.tab').forEach((tab, index) => {
    tab.addEventListener('click', () => showTab(index));
});

