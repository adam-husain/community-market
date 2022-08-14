window.addEventListener('load', () => {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (currentTheme === 'dark' && toggleSwitch) {
            toggleSwitch.checked = true;
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }

    toggleSwitch?.addEventListener('change', switchTheme, false);

    const queryString = window.location.search;
    if (queryString.includes('signout')) {
        setCookie('session', '', 1)
    }
})


function getCookie(key) {
    let name = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(key, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = key + "=" + value + ";" + expires + ";path=/";
}

function waitFor(conditionFunction) {

    const poll = resolve => {
        if (conditionFunction()) resolve(); else setTimeout(_ => poll(resolve), 400);
    }

    return new Promise(poll);
}

function displayUser(user) {
    const frame = window.frames['user-frame'].contentDocument
    const name = user['name']
    const pronouns = ['', '', 'He/Him', 'She/Her', 'They/Them'][user['pronouns']]
    const number = user['whatsapp'].replace('+', '')
    const message = 'Hello ' + name + ', I am interested in purchasing the product you have listed on the SMR Marketplace site.'
    const wa_url = encodeURI('http://wa.me/' + number + '?text=' + message)
    console.log(wa_url)
    const image_url = 'http://myresidence.shop/smr/img/profile/' + user['profile_url']
    frame.getElementById('title').innerHTML = name + '<small>' + pronouns + '</small>'
    frame.getElementById('contact').innerHTML = 'Contact: <a href="' + wa_url + '" target="_blank"><i class="fa fa-whatsapp"> +' + number + '</i></a>'
    frame.getElementById('profile-pic').src = image_url;
}