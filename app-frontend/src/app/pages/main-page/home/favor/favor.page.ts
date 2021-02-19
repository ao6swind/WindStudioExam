import { Component, OnInit } from '@angular/core';

import { QuestionService } from 'app-frontend/src/app/services/question.service';
import { QuestionSet } from 'lib-model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-favor',
  templateUrl: './favor.page.html',
  styleUrls: ['./favor.page.scss'],
})
export class FavorPage implements OnInit {

  questionSets: QuestionSet[] = [];

  constructor(
    private questionService: QuestionService,
    private toastController: ToastController
  ) { 
    
  }

  ionViewWillEnter() {
    this.questionService.listFavors().subscribe((questionSets) => {
      this.questionSets = questionSets;
    });
  }

  ngOnInit() {

  }

  onBtnRemoveFavorClicked(id: string) {
    const index = this.questionSets.findIndex((q) => q.id === id);
    this.questionService.removeFromFavor(id);
    this.questionSets.splice(index, 1);
    const toast = this.toastController.create({
      message: '已自收藏移除',
      duration: 1500,
      color: 'secondary'
    });
    toast.then((t) => {
      t.present();
    });
  }
}
