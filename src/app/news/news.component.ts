import { Component, OnInit, OnDestroy } from '@angular/core';
import { RssService } from './rss.service';
import { News } from './news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  // 預設的內容
  starter: News = {
    id: 0,
    title: '新聞串流中',
    description: '',
    link: '',
    thumbnail: '',
    pubDate: '',
    channel: '',
  };
  // 所有新聞及被選中的新聞
  feeds;
  show = this.starter;
  // 輪播順序、停留時間(ms)、過場特效開關
  order = 0;
  every = 10 * 1000;
  timer;
  doFadeIn = true;
  doFadeOut = false;

  constructor(private rss: RssService) { }
  ngOnInit() {
    this.getNews();
  }

  // 取得資訊
  getNews() {
    this.rss.getFeeds()
      .subscribe(data => {
        // 逐筆填入
        console.log(data);
        this.feeds = [];
        const channel_name = data['feed'].title;
        data['items'].forEach(i => {
          // 取得圖片
          let thumb = i.thumbnail === '' ? (i.enclosure.link === undefined ? '' : i.enclosure.link) : i.thumbnail;
          thumb = thumb.match(/\.(jpeg|jpg|gif|png|webp)/i) == null ? '' : thumb;
          // 放置內容
          const n: News = {
            id: i.id,
            title: i.title,
            description: i.description,
            link: i.link,
            thumbnail: thumb,
            pubDate: i.pubDate,
            channel: channel_name,
          };
          this.feeds.push(n);
        });
      },
        // 錯誤處理 (顯示預設資訊)
        error => {
          console.log('Error: ', error);
          this.show = this.starter;
        },
        // 正式上工
        () => {
          // 定時上架一則訊息
          this.nextNews();
          this.timer = setInterval(() => {
            this.nextNews();
          }, this.every);
        }
      );
  }

  // 切換新聞
  nextNews() {
    // 退場效果
    this.doFadeOut = true;
    this.doFadeIn = false;
    const fadeDur = 700;
    // 完成退場效果後，安排入場
    setTimeout(() => {
      // 排隊入場
      this.doFadeOut = false;
      this.doFadeIn = true;
      this.show = this.feeds[this.order];
      this.order++;
      // 新聞用完了就換新聞頻道
      if (this.order >= this.feeds.length) {
        this.order = 0;
        clearInterval(this.timer);  // 取消原計時，保留時間給頻道切換用
        this.getNews();
      }
    }, fadeDur);

  }

}
