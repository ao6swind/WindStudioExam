import { Pipe, PipeTransform } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtmlToString'
})
export class SafeHtmlToStringPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(html: string): unknown {
    return html.replace(/<.*?>/g, '')
  }

}
