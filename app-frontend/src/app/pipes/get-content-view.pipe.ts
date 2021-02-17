import { Pipe, PipeTransform } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'getContentView'
})
export class GetContentViewPipe implements PipeTransform {

  constructor(private sanitized: DomSanitizer) {}
  transform(html: string) {
    if(!html){
      return html;
    }
    else {
      const oembed = html.split("</oembed>");
      let body = "";
      oembed.forEach((item, index) => {
        body += `${oembed[index]}</oembed>`;
        const oembed1 = item.split('url="')[1];
        if (oembed1) {
          const oembed2 = oembed1.split('">')[0];
          if (oembed2) {
            const queryString = oembed2.split("https://www.youtube.com/watch?v=")[1];
            const youtube = queryString.split("&")[0];
            if (youtube) {
              body += `
                <div class="pnl-iframe">
                  <iframe src="https://youtube.com/embed/${youtube}" frameborder="0"; scrolling="no"; allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              `;
            }
          }
        }
      });
      window["MathJax"]?.Hub?.Queue(["Typeset", window["MathJax"].Hub]);
      return this.sanitized.bypassSecurityTrustHtml(body);
    }
  }

}
