import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RssService {

  private proxy = 'https://rss2json.com/api.json?rss_url=';
  private sources = [
    'https://newtalk.tw/rss/all/', // 新頭殻
    'https://www.ithome.com.tw/rss', // iThome 新聞
    'https://e-info.org.tw/rss.xml', // 台灣環境資訊協會
    'https://www.newsmarket.com.tw/feed/', // 上下游News&Market
    'https://www.twreporter.org/a/rss2.xml', // 報導者
    'https://feeds.feedburner.com/TheNewsLens', // The News Lens 關鍵評論網
    'https://www.voacantonese.com/api/zprtie-ttp', // 美國之音
    'https://feeds.bbci.co.uk/zhongwen/trad/rss.xml', // BBC中文網
    'https://feeds.feedburner.com/inside-blog-taiwan', // INSIDE 硬塞的網路趨勢觀察
    // 'https://dq.yam.com/rss.php', // 地球圖輯隊 (縮圖屬性放錯了位置 enclosure.link)
    // 'https://www.peopo.org/rss-top10', // PeoPo公民新聞 (頻道標題有誤)
    // 'https://cn.nytimes.com/rss/zh-hant/', // 紐約時報中文網 (圖文未分流)
    // 'https://about.pts.org.tw/rss/XML/newsfeed.xml', // 公視新聞 (字太多)
    // 'https://technews.tw/tn-rss/', // TechNews 科技新報 (句尾有不必要之斷句)
    // 'https://feeds.feedburner.com/cnaFirstNews', // 中央社 (句尾有不必要之斷句)
    // 'https://tw.appledaily.com/rss/newcreate/kind/sec/type/1077', // 蘋果日報 (雜圖太多)
  ];

  constructor(private http: HttpClient) { }

  getFeeds() {
    const pickOne = Math.floor(Math.random() * (this.sources.length - 1));
    console.log(this.sources[pickOne]);
    return this.http.get<any[]>(this.proxy + this.sources[pickOne]);
  }



}
