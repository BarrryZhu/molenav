let $siteList = $('.siteList');
const $lastLi = $siteList.find('li:last')

const x = localStorage.getItem('x')
const xObject = JSON.parse(x)

const hashMap = xObject || [{
        name: 'w3c',
        url: 'https://www.w3.org/',
        logo: 'W',
    },
    {
        name: 'MDN',
        url: 'https://developer.mozilla.org/zh-CN/',
        logo: 'M',
    },
    {
        name: '张鑫旭',
        url: 'https://www.zhangxinxu.com/wordpress/',
        logo: '张',
    }
]

// 简化URL
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') // 删除 / 开头的内容
}

// 简化网站名称
const simplifyName = (name) => {
    const sim = name.replace('[^\w]*', '')
        .replace('-', '')
        .replace(',', '')
        .replace('，', '')
        .trim();
    console.log()
}



const render = () => {
    $siteList.find('li:not(:last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
        <div class="site">
          <div class="siteLogo">${node.logo}</div>
          <span class="siteName">${node.name}</span>
            <div class="removeSite">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-delete"></use>
                </svg>
            </div>
        </div>
      </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.removeSite', (e) => {
            e.stopPropagation() // 阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}

render();


$('.addSite').on('click', () => {
    let url = window.prompt('请问你要添加的网址是啥？')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    console.log('%c 添加的网站的URL: ', 'color: orange; font-weight: bold;', url)
    const request = new XMLHttpRequest();
    request.open('GET', `http://textance.herokuapp.com/title/${url}`);
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status <= 300) {
                console.log('title获取成功！');
                const data = request.response;
                console.log(request.response);
                console.log(simplifyName(data));
                hashMap.push({
                    name: simplifyName(data),
                    logo: simplifyName(data)[0].toUpperCase(),
                    url: url,
                    description: '描述'
                })
                render()
            } else {
                alert('Title获取失败');
            }
        }
    }
    request.send();

})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}