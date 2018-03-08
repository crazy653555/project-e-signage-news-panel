import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from './news';

@Injectable()
export class NewsService {

  private rssProxy = 'https://rss2json.com/api.json?rss_url=';
  private NewsAPI = 'https://newsapi.org/v2/top-headlines?country=tw&apiKey=21cb72bdcf314bd7acb66205341a6f1f';
  private sources = [
    'https://dq.yam.com/rss.php', // 地球圖輯隊
    'https://newtalk.tw/rss/all/', // 新頭殻
    'https://technews.tw/tn-rss/', // TechNews 科技新報 (內容斷在第二行)
    'https://e-info.org.tw/rss.xml', // 台灣環境資訊協會
    'https://www.newsmarket.com.tw/feed/', // 上下游News&Market
    'https://cn.nytimes.com/rss/zh-hant/', // 紐約時報中文網 (圖文未分流)
    'https://www.twreporter.org/a/rss2.xml', // 報導者
    'https://www.voacantonese.com/api/zprtie-ttp', // 美國之音
    'https://feeds.bbci.co.uk/zhongwen/trad/rss.xml', // BBC中文網
    // 'https://www.ithome.com.tw/rss', // iThome 新聞 (無圖)
    // 'https://www.peopo.org/rss-top10', // PeoPo公民新聞 (無圖)(頻道標題有誤)
    // 'https://zht.globalvoices.org/feed/', // 全球之聲 (SSL認證快過期)
    // 'https://feeds.feedburner.com/TheNewsLens', // The News Lens 關鍵評論網 (無圖)
    // 'https://feeds.feedburner.com/cnaFirstNews', // 中央社 (無圖)(句尾有不必要之斷句)
    // 'https://about.pts.org.tw/rss/XML/newsfeed.xml', // 公視新聞 (無圖)(字太多)
    // 'https://feeds.feedburner.com/inside-blog-taiwan', // INSIDE 硬塞的網路趨勢觀察 (圖不開放崁用)
    // 'https://tw.appledaily.com/rss/newcreate/kind/sec/type/1077', // 蘋果日報 (雜圖太多)
  ];

  public default: News = {
    id: 0,
    title: '新聞串流中...',
    description: '',
    link: '',
    thumbnail: '',
    pubDate: '',
    channel: '',
  };

  constructor(private http: HttpClient) { }


  getRSSs() {
    const pickOne = Math.floor(Math.random() * (this.sources.length - 1));
    // console.log(this.sources[pickOne]);
    return this.http.get<any[]>(this.rssProxy + this.sources[pickOne]);
  }

  getGoogleNews() {
    return this.http.get<any[]>(this.NewsAPI);
  }


}
