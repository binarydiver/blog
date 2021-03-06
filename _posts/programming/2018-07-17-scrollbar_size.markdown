---
layout: post
title: "스크롤 바 사이즈가 div 를 밀어버리다!"
date: 2018-07-16 15:10:00 +0900
categories: programming
tags: [web, javascript]
---

베짱이는 이 블로그를 만들 때 특정 페이지로 이동하면 좌우 여백이 미세하게 달라지는 현상을 발견했어.

뭐지!?
검색 칸 문제를 해결했더니 또 다른 문제가 발생한거야.
물론 그 차이가 크지 않으니까 그냥 무시할 수도 있겠지만 베짱이는 스스로 용납할 수 없었어.

이 현상은 다음 그림으로 보면 이해하기 쉬워.
![Input box centerize.]({{ "/assets/2018-07-17-scrollbar_size-01.gif" | absolute_url }})

그래 눈치챘겠지만 저렇게 간단하게 만들어 보면 결국 스크롤 바 사이즈가 div 를 밀어내는 거야.
이것도 검색 칸 문제하고 비슷한 맥락이라고 할 수 있는거야.

역시 이리저리 검색을 하고 실험을 해보았어.
내가 생각하는 가장 명확하고 간단한 방법은 다음과 같이 스크롤 바가 적용되는 요소에 `overflow: overlay` 를 적용하는 거야. 스크롤바를 요소 위에 덮어 씌워 보여주겠다는 거지.
```css
body {
  overflow: overlay;
}
```

그런데 이 방법에는 문제가 있어.
MDN 문서에 따르면 이 옵션은 webkit 기반의 브라우저들만 적용된다는 거야.
결국 사파리, 크롬 브라우저를 제외하고는 효과가 없다는 거지.
자바스크립트를 이용하지 않고 스크롤바의 너비가 다른 요소에 영향을 주지 않게 하는 최적의 해를 아직 못찾았어.

혹시라도 최적의 해를 알고 있다면 [이메일](mailto:binarydiver@gmail.com) 로 좀 알려줘.

직접 실험해보고 싶으면 JSFiddle >> <a href="https://jsfiddle.net/binarydiver/qLr4kw9n/" target="_blank">스크롤바 너비 무시하고 좌우 여백 맞추기</a> 에서 해봐.