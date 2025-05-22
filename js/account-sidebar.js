const aside = document.querySelector('aside');

document.getElementById('menu').addEventListener('click', () => {
    aside.classList.add('active');
    document.body.classList.add('active');
});

document.addEventListener('click', (e) => {
    if (e.target.tag !== 'aside' && e.target.id !== 'menu') {
        aside.classList.remove('active');
        document.body.classList.remove('active');
    }
});
