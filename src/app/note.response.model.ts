import { NoteModel } from "./note.model";

export interface NoteAPIResponse {
    status: number;
    results: NoteModel[];
    resultsLength: number;
  }