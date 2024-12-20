---
docName: 'appearance-feature-from-wikipedia'
title: 위키피디아의 Appearance UI에 대한 생각
description: 위키피디아에 추가된 beta 기능인 Appearance UI에 대해 느낀 바를 공유하고 간단하게 구현해보았다.
keywords: ['wikipedia', 'ux', 'appearance']
writtenAt: '2024-09-25 16:30'
updatedAt: '2024-10-11 11:15'
---

# 위키피디아의 Appearance UI에 대한 생각

주사위에 대한 내용을 찾다가 검색엔진을 통해 wikipedia에 접속했다.\
그런데 전에 보지 못한 Appearance라는 섹션이 눈에 띄었다.

![ux of wikipedia](screenshot-2409251623.png)

보통 모바일 앱의 설정에서 볼 수 있는 옵션인데 웹에서 즉각적으로 폰트 크기, 테마, 폭을 조정할 수 있게 한 UI는 자주 보지 못했다.\
일반적인 웹사이트들은 큰 필요성을 못 느낄 수 있는데 블로그나 뉴스 웹사이트들은 매우 유용한 기능이라 생각했다.\
좀 더 찾아보니 [이 스레드](https://eu.wikipedia.org/wiki/Topic:Y5nbfld32in1ud0k)를 발견했다.\
이 기능은 이미 2022년에 개발되어 위키피디아 로그인한 사용자들은 이용할 수 있었다.\
그런데 2024년 5월에 Wikimedia Foundation Web team이 본 기능을 로그아웃된 사용자에게 노출하는 변경에 대해 언급한 내용을 찾을 수 있었다.\
난 위키피디아에 계정이 없고 로그인할 생각도 해본 적이 없다.\
어떤 정보를 검색엔진에 검색할 때 함께 나오던 위키피디아에 좋은 정보가 있으면 방문할 뿐이었다.\
일반적인 사용자에게 이 Appearance UI는 매우 좋은 기능이다. 특히 테마를 바꾸는 기능과 줌없이 폰트 크기를 바꾸는 기능이 그렇다.\
위키피디아는 이용자가 설정한 정보를 쿠키에 `enwikimwclientpreferences`라는 항목으로 저장해두기 때문에 Private 모드가 아니라면 재접속 시 설정이 유지된다.

블로그에 추가할만한 기능이라 생각되서 개발자 툴에서 wikipedia 소스를 보고 비슷하게 구현을 해보았다.\
간단해보여서 바닐라 JS로 했는데 전체적으로 React로 하면 더 코드량이 줄어들어 같다.

{% jsfiddle width="100%" height="600" src="//jsfiddle.net/b2j9jjsvtb/w03u5d14/707/embedded/result,html,css,js/dark/" frameborder="0" loading="lazy" allowtransparency="true" allowfullscreen="true" /%}

그동안 자세히 보지 않았던 위키피디아 구성에 대해 살펴볼 수 있는 시간이었는데 생각보다 가치있는 정보를 제공하고 있었다.\
아마 한국 사용자들의 대부분은 위키피디아 홈에 접근하지 않을 것 같은데 이 곳에 날마다 오늘의 지식과 뉴스들이 업데이트된다.

![home of wikipedia](screenshot-2410111108.png)

앞으로 위키피디아에 직접 접속하는 시간이 생길 것 같다.
