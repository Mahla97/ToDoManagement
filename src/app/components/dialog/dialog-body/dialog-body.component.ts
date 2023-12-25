import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss']
})
export class DialogBodyComponent implements OnInit {

  form = this.fb.group({
    text: [this.data.text, Validators.required],
    description: [this.data.description, Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log('check data' ,this.data);
    this.form.get('text')?.patchValue(this.data.card.text);
    this.form.get('description')?.patchValue(this.data.card.description);
  }

}
