import { Pipe, PipeTransform } from '@angular/core';

import { LinkIcon } from 'lib-model';

@Pipe({
  name: 'getIonicIcon'
})
export class GetIonicIconPipe implements PipeTransform {

  transform(icon: LinkIcon): string {
    let label = 'link-outline';
    switch(+icon) {
      case LinkIcon.Link:
        label = 'link-outline';
        break;
      case LinkIcon.File:
        label = 'cloud-download-outline';
        break;
      case LinkIcon.Youtube:
        label = 'logo-youtube';
        break;
      case LinkIcon.PDF:
        label = 'document-text-outline';
        break;
    }
    return label;
  }

}
