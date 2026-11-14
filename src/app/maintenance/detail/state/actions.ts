import { createAction, props } from "@ngrx/store";
import { Record } from "./interface";

export const getRecords = createAction('[Navigation] Get Records', props<{ id: string }>());
export const getRecordsSuccess = createAction(
  '[Navigation] Get Records Success',
  props<{ records: Array<Record> }>()
);

export const createRecord = createAction('[Details] Create Record', props<{ record: Record }>());
export const createRecordsSuccess = createAction('[Details] Create Record Success');

export const deleteRecord = createAction('[Details] Delete Record', props<{ ids: string[] }>());
export const deleteRecordSuccess = createAction('[Details] Delete Record Success', props<{ ids: string[] }>());

export const editRecord = createAction('[Navigation] Edit Record', props<{ record: Record }>());
export const editRecordSuccess = createAction('[Navigation] Edit Record Success');

export const moveRecords = createAction('[Details] Move Records', props<{ parentId: string, recordIds: string[] }>());
export const moveRecordsSuccess = createAction('[Details] Move Records Success');