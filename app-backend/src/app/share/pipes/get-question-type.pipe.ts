import { Pipe, PipeTransform } from '@angular/core';

import { QuestionType } from 'lib-model';

@Pipe({
  name: 'getQuestionType'
})
export class GetQuestionTypePipe implements PipeTransform {

  transform(type: QuestionType): string {
    let label = '';
    switch(+type) {
      case QuestionType.Thesis:
        label = '申論題';
        break;
      case QuestionType.SingleChoice:
        label = '單選題';
        break;
      case QuestionType.MultipleChoice:
        label = '複選題';
        break;
    }
    return label;
  }
}