# beauniv
Design and Implementation of University       Photo-sharing and Friend-making           Platform Based on Node.js

随着5G时代的临近，手机在人们日常生活中的比重将会更进一步，并且由于传输速率的大幅提升，越来越多的软件将选择开发无需下载的WebApp。
照片分享社交在互联网社交领域一直占据相当大的比重，然而国内却无标志性的照片社交软件，经过需求分析，本平台将照片分享与新形势下的大学网络社交相结合，从特定用户的需求角度出发设计，采用Node.js和mongodb数据库实现一个移动端的WebApp。
本平台旨在为大学师生提供与校园相关的照片分享，结识志趣相投的好友，并帮助还未进入大学的学生对理想中的大学进行多方位的了解。
本平台基于MVC的设计模式完成B/S系统架构，从用户体验的角度考虑，前端使用了Vue.js框架，通过MVVM模式提供了简洁美观的界面和熟悉流畅的交互操作，用户不需要任何学习就能使用平台的所有功能，注册登录后，便能够在Token的有效期限内进行发布、查询、删除动态与照片，以及查找、添加好友等功能,并通过WebSocket实现了用户间的即时通信，而且后端Node.js和mongodb数据库结合具有高性能的优势，拥有较好的处理高并发的能力。

使用npm run dev即可启动前后端连载

可以cd进入client文件夹，使用npm run serve 再开启一个端口

使用了'WS'完成websocket的即时通讯

使用better-scroll完成上拉刷新和下拉加载

使用jsonwebtoken 和 passport等实现身份验证

###功能实现图：<br>  
![下拉刷新](https://github.com/vincentxu77/beauniv/raw/master/runningImg/%E4%B8%8B%E6%8B%89%E5%88%B7%E6%96%B0.png)<br>

![动态信息流](https://github.com/vincentxu77/beauniv/raw/master/runningImg/%E5%8A%A8%E6%80%81%E4%BF%A1%E6%81%AF%E6%B5%81.png)<br>

![点击查看大图](https://github.com/vincentxu77/beauniv/raw/master/runningImg/%E5%8A%A8%E6%80%81%E4%BF%A1%E6%81%AF%E6%B5%81.png)<br>

![社交相关](https://github.com/vincentxu77/beauniv/raw/master/runningImg/%E7%A4%BE%E4%BA%A4%E7%9B%B8%E5%85%B3.png)<br>

![聊天实现](https://github.com/vincentxu77/beauniv/raw/master/runningImg/%E8%81%8A%E5%A4%A9%E5%AE%9E%E7%8E%B0.png)<br>
