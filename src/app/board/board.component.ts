import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { BoardService } from 'src/app/services/board.service';
import {DialogBodyComponent} from '../components/dialog/dialog-body/dialog-body.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {

  constructor(
    public boardService: BoardService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log('BOARD - INIT')
  }

  onAddCard(data: { text: string, description: string }, columnId: number, description) {
    if (data) {
      this.boardService.addCard(data, columnId);
    }
  }

  onDeleteColumn(columnId: number) {
    this.boardService.deleteColumn(columnId);
  }

  onDeleteCard(cardId: number, columnId: number) {
    this.boardService.deleteCard(cardId, columnId);
  }

  onEditCard(cardId: number, columnId: number, card) {
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      width: '400px',
      data: {
        question: 'Edit your task :)',
        card,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
      this.boardService.editCard(cardId, columnId, result);
    });
  }




  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
