import { LinkIcon } from './../../../../../lib-model/src/lib/enums/link-icon';
import { Pipe, PipeTransform } from '@angular/core';

import { LinkIcon } from 'lib-model';

@Pipe({
  name: 'getLinkIcon'
})
export class GetLinkIconPipe implements PipeTransform {

  transform(icon: LinkIcon): string {
    let label = '';
    switch(+icon) {
      case LinkIcon.Link:
        label = '連結';
        break;
      case LinkIcon.Youtube:
        label = 'Youtube';
        break;
      case LinkIcon.PDF:
        label = 'PDF';
        break;
      case LinkIcon.File:
        label = '檔案';
        break;
    }
    return label;
  }

}
