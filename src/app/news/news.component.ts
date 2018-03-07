import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from './news.service';
import { News } from './news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  // 所有新聞及被選中的新聞
  feeds: News[];
  show: News;
  // 輪播順序、停留時間(ms)、過場特效開關
  order = 0;
  every = 7 * 1000;
  timer;
  doFadeIn = true;
  doFadeOut = false;

  constructor(private ns: NewsService) { }
  ngOnInit() {
    this.resetShow();
    this.getNews();
  }

  // 取得資訊 (依方式選擇來源)
  getNews() {
    this.RSSs();
    // this.NewsAPI();
  }

  resetShow() {
    this.show = this.ns.default;
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
        clearInterval(this.timer);  // 取消原計時，保留時間給頻道切換用
        setTimeout(() => {
          this.order = 0;
          this.getNews();
        }, this.every);
      }
    }, fadeDur);
  }

  // 隨機RSS
  RSSs() {
    this.ns.getRSSs()
      .subscribe(data => {
        // 逐筆填入
        console.log(data);
        this.feeds = [];
        const channel_name = data['feed'].title;
        data['items'].forEach(i => {
          // 取得圖片
          let thumb = i.thumbnail === '' ? (i.enclosure.link === undefined ? '' : i.enclosure.link) : i.thumbnail;
          thumb = thumb.match(/\.(jpeg|jpg|gif|png|webp)/i) === null ? '' : thumb;
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
          this.resetShow();
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

  // Google News .HACK: 單日有1000次查取限制
  GoogleNews() {
    this.ns.getGoogleNews().subscribe(data => {
      console.log(data);
      this.feeds = [];
      // 逐筆填入
      data['articles'].forEach(i => {
        const n: News = {
          id: i.id,
          title: i.title,
          description: i.description == null ? '' : i.description,
          link: i.url,
          thumbnail: i.urlToImage == null ? '' : i.urlToImage,
          pubDate: i.publishedAt,
          channel: i.source.name,
        };
        this.feeds.push(n);
      });
    },
      // 錯誤處理 (顯示預設資訊)
      error => {
        console.log('Error: ', error);
        this.resetShow();
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

}
