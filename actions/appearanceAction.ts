import { createAction } from '@reduxjs/toolkit';

import {
  IChangeAppearancePayload,
  IChangeRandomAppearancePayload,
  IChangeFillPayload,
  IColorSyncPayload,
  ISaveColorPaylload,
} from '../../types/storeInterfaces';

export const changeAppearance = createAction<
  IChangeAppearancePayload,
  'SWITCH_APPEARANCE'
>('SWITCH_APPEARANCE');

export const changeFill = createAction<
IChangeFillPayload,
  'CHANGE_FILL'
>('CHANGE_FILL');

export const colorSync = createAction<IColorSyncPayload, 'COLOR_SYNC'>('COLOR_SYNC');

export const saveColor = createAction<ISaveColorPaylload, 'SAVE_COLOR'>('SAVE_COLOR');

export const changeRandomAppearance = createAction<
IChangeRandomAppearancePayload,
  'SWITCH_RANDOM_APPEARANCE'
>('SWITCH_RANDOM_APPEARANCE');

export const changeNumberColorBody = createAction<number>('CHANGE_NUMBER_COLOR_BODY');

export const setDefaultAppearance = createAction('SET_DEFAULT_APPEARANCE');
