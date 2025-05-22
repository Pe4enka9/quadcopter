const rentItems = document.querySelectorAll('.rent-item');

rentItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        item.querySelector('.price').classList.add('active');
    });

    item.addEventListener('mouseout', () => {
        item.querySelector('.price').classList.remove('active');
    });
});
