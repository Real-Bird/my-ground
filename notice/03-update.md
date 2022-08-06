---
title: 업데이트 사항
date: 2022.08.06
category: main
---

## 업데이트 사항

### **22.08.06**

- PC 버전 UI를 추가했습니다.

### **22.08.03**

- 홈 화면에 `이력서` 링크를 추가했습니다.
- `문의` 게시글 작성시 비밀글 여부를 추가했습니다.
  - 게시글을 작성하면 `session` 토큰이 생성됩니다.
  - 게시글의 토큰과 `session`의 토큰이 다르면 화면에 노출되지 않습니다.
  - 캐시를 삭제하여 `session` 토큰이 제거되면 새로운 토큰이 생성됩니다.
    - 기존 게시글의 토큰과 새로 생성된 토큰이 다르므로 기존 비밀글은 확인할 수 없습니다.
- `403` 페이지를 추가했습니다.
  - `admin` 권한이 없는 페이지의 접근을 제한합니다.

---

### **22.08.01**

- `Loading spinner`와 `Skeleton`을 추가했습니다.

---

### **22.07.30**

- `404:Not Found` 오류 페이지를 추가했습니다.

![404](https://raw.githubusercontent.com/Real-Bird/pb/master/portfolio_zip/myground/10-404.jpg)

- `middleware`를 사용해 특정 페이지 접근을 제어했습니다.
  - ex) `/portfolio/upload` 접속 시 `/portfolio`로 `redirect`
