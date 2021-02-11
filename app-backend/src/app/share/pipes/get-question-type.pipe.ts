import { Pipe, PipeTransform } from '@angular/core';

import { QuestionType } from 'lib-model';

@Pipe({
  name: 'getQuestionType'
})
export class GetQuestionTypePipe implements PipeTransform {

  transform(type: QuestionType): string {
    let label = '';
    switch(type) {
      case QuestionType.Thesis:
        label = '申論題';
        break;
      case QuestionType.SingleChoiceText:
        label = '文字單選題';
        break;
      case QuestionType.MultipleChoiceText:
        label = '文字複選題';
        break;
      case QuestionType.SingleChoiceImage:
        label = '圖片單選題';
        break;
      case QuestionType.MultipleChoiceImage:
        label = '圖片複選題';
        break;
    }
    return label;
  }

}