import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card, Column } from '../models/column.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private initBoard = [
    {
      id: 1,
      title: 'To Do',
      list: [
        {
          id: 1,
          text: 'Tapsell Task',
          description: 'write a ToDo App',
          like: 1,
        },
      ]
    },
    {
      id: 2,
      title: 'Done',
      list: [
        {
          id: 1,
          text: 'Interview',
          description: 'Interview with Tapsell',
          like: 1,
        },
      ]
    },
  ];

  private board: Column[] = this.initBoard;
  private board$ = new BehaviorSubject<Column[]>(this.initBoard);

  getBoard$() {
    return this.board$.asObservable();
  }

  addColumn(data: { text: string}) {
    const newColumn: Column = {
      id: Date.now(),
      title: data.text,
      list: [],
    };

    this.board = [...this.board, newColumn];
    this.board$.next([...this.board]);
  }

  addCard(data: { text: string, description: string }, columnId: number) {
    const newCard: Card = {
      id: Date.now(),
      text: data.text,
      description: data.description,
    };

    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        column.list = [newCard, ...column.list];
      }
      return column;
    });

    this.board$.next([...this.board]);
  }

  deleteColumn(columnId) {
    this.board = this.board.filter((column: Column) => column.id !== columnId);
    this.board$.next([...this.board]);
  }

  deleteCard(cardId: number, columnId: number) {
    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        column.list = column.list.filter((card: Card) => card.id !== cardId);
      }
      return column;
    });

    this.board$.next([...this.board]);
  }

  editCard(cardId: number, columnId: number, data: { text: string, description: string }) {
    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        column.list = column.list.map((card: Card) => {
          if (card.id === cardId) {
            return {
              ...card,
              text: data.text,
              description: data.description
            };
          }
          return card;
        });
      }
      return column;
    });

    this.board$.next([...this.board]);
  }

}
