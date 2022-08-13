window.addEventListener('load', () => {
    const userFrame = document.getElementById('user-frame')
    const id = 123
    userFrame.src = 'user.html?id=' + id
})