import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { BoardService } from 'src/app/services/board.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public boardService: BoardService
  ) { }

  ngOnInit(): void {
  }

  addColumn(data: {text: string}) {
    if (data.text) {
      this.boardService.addColumn(data)
    }
  }

}
