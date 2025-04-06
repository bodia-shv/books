import { FormControl } from "@angular/forms"

export interface IBook {
  id: number;
  title: string;
  author: string;
  year: number;
  description: string;
  coverImage?: string; 
  coverImageUrl?: string;
}

export interface IBookForm {
  id: FormControl<number | null>;
  title: FormControl<string | null>;
  author: FormControl<string | null>;
  year: FormControl<number | null>;
  description: FormControl<string | null>;
  coverImageUrl: FormControl<string | null>;
  coverImageFile: FormControl<File | null>;
}

export interface IBookModal {
  book: IBook;
  viewOnly: boolean;
}