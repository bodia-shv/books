import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar'

import { EBooksEvent } from '../../../models/books.enum'
import type { IBookForm, IBookModal } from '../../../models/books.model';

@Component({
  selector: 'app-add-edit-book',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    CommonModule,
    MatIcon,
    MatDialogContent,
    MatToolbar,
    MatDialogActions
  ],
  templateUrl: './add-edit-book.component.html',
  styleUrl: './add-edit-book.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditBookComponent implements OnInit {
  public bookForm!: FormGroup<IBookForm>;
  public previewImageUrl: string | null = null;
  public isUploading = false;
  public viewOnly = false;

  constructor(
    public readonly dialogRef: MatDialogRef<AddEditBookComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: IBookModal,
    private readonly fb: FormBuilder,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.bookForm = this.fb.group<IBookForm>({
      id: new FormControl(this.data?.book ? this.data.book.id : null),
      title: new FormControl('', { nonNullable: true, validators: Validators.required }),
      author: new FormControl('', { nonNullable: true, validators: Validators.required }),
      year: new FormControl(null, { nonNullable: true, validators: [Validators.required, Validators.min(1000), Validators.max(2024)] }),
      description: new FormControl('', { nonNullable: true }),
      coverImageUrl: new FormControl(this.data?.book ? this.data.book.coverImageUrl ?? null : null),
      coverImageFile: new FormControl(null)
    });
  
    if (this.data.book) {
      this.bookForm.patchValue(this.data.book);
      this.previewImageUrl = this.data?.book?.coverImageUrl || '';
    }
    this.viewOnly = this.data?.viewOnly || false;
    this.toggleFormControls();
  }

  private toggleFormControls(): void {
    if (this.viewOnly) {
      this.bookForm.disable();
    } else {
      this.bookForm.enable();
    }
    this.cdr.markForCheck();
  }

  public startEditing(): void {
    this.viewOnly = false;
    this.toggleFormControls();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public deleteBook(): void {
    this.dialogRef.close(EBooksEvent.DELETE);
  }

  public onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files && inputElement.files[0];
  
    if (file) {
      this.bookForm.patchValue({ coverImageFile: file });
  
      const reader = new FileReader();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      reader.onload = (e) => {
        if (typeof reader.result === 'string') {
          this.previewImageUrl = reader.result;
          this.cdr.markForCheck();
        }
      };
      reader.readAsDataURL(file);
    }
  }

  public onSubmit(): void {
    if (this.bookForm.valid) {
      this.isUploading = true;
      // ATTENTION! for production we need to upload images on server
      if (this.bookForm.value.coverImageFile) {
        this.bookForm.patchValue({ coverImageUrl: this.previewImageUrl });
      }
      this.isUploading = false;
      this.dialogRef.close(this.bookForm.value);
    }
  }
}
