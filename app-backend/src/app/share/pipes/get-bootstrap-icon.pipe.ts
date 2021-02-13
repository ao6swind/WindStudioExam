import { Pipe, PipeTransform } from '@angular/core';

import { LinkIcon } from 'lib-model';

@Pipe({
  name: 'getBootstrapIcon'
})
export class GetBootstrapIconPipe implements PipeTransform {
  transform(icon: LinkIcon): string {
    let label = '';
    switch(+icon) {
      case LinkIcon.Link:
        label = 'bi-link';
        break;
      case LinkIcon.Youtube:
        label = 'bi-youtube';
        break;
      case LinkIcon.PDF:
        label = 'bi-file-text';
        break;
      case LinkIcon.File:
        label = 'bi-files';
        break;
    }
    return label;
  }
}
