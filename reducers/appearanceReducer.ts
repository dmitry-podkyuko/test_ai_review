import { createReducer } from '@reduxjs/toolkit';

import * as ACTION from '../actions/appearanceAction';
import * as TYPES from '../../types/storeInterfaces';
import { previewSvgStorage } from '../../constants/svgStorage';

const propsCount = previewSvgStorage.prop.length;

const initialState = {
  avatar: {
    background: {
      number: 0,
    },
    flair: {
      number: 0,
    },
    skin: {
      number: 0,
      fill: '#FEE7D3',
      oldFill: '#FEE7D3',
    },
    body: {
      number: 0,
    },
    head: {
      number: 0,
      fill: '#FEE7D3',
      oldFill: '#FEE7D3',
    },
    face: {
      number: 0,
      fill: '#FEE7D3',
      oldFill: '#FEE7D3',
    },
    hair: {
      number: 0,
      fill: '#503E6B',
      oldFill: '#503E6B',
    },
    prop: {
      number: 0,
    },
  },
  bodyNumberColor: 0,
};

const appearanceReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      ACTION.changeAppearance,
      (
        state: TYPES.IAppearanceReducer,
        { payload: { appearance, imageNumber } }: TYPES.IChangeAppearanceAction,
      ) => {
        if (appearance === 'body') {
          state.avatar[appearance].number = imageNumber;
          state.avatar.skin.number = Math.floor(imageNumber / 3);
          const numberBody = Math.floor(state.avatar.body.number / 3);
          state.avatar.prop.number = numberBody * propsCount
          + (state.avatar.prop.number % propsCount);
          return;
        }
        state.avatar[appearance].number = imageNumber;
      },
    )
    .addCase(
      ACTION.changeFill,
      (
        state: TYPES.IAppearanceReducer,
        { payload: { appearance, fill } }: TYPES.IChangeFillAction,
      ) => {
        if (appearance === 'head') {
          state.avatar[appearance].fill = fill;
          state.avatar.skin.fill = fill;
          state.avatar.face.fill = fill;
          return;
        }
        state.avatar[appearance].fill = fill;
      },
    )
    .addCase(
      ACTION.colorSync,
      (state: TYPES.IAppearanceReducer, { payload: { cutegory } }: TYPES.IColorSyncAction) => {
        const { oldFill } = state.avatar[cutegory];
        if (cutegory === 'head') {
          state.avatar[cutegory].fill = oldFill;
          state.avatar.skin.fill = oldFill;
          state.avatar.face.fill = oldFill;
          return;
        }
        state.avatar[cutegory].fill = oldFill;
      },
    )
    .addCase(
      ACTION.saveColor,
      (state: TYPES.IAppearanceReducer, { payload: { cutegory, color } }:
        TYPES.ISaveColorAction) => {
        if (cutegory === 'head') {
          state.avatar[cutegory].oldFill = color;
          state.avatar.skin.oldFill = color;
          state.avatar.face.oldFill = color;
          return;
        }
        state.avatar[cutegory].oldFill = color;
      },
    )
    .addCase(
      ACTION.changeRandomAppearance,
      (state: TYPES.IAppearanceReducer, {
        payload,
      }: TYPES.IChangeRandomAppearanceAction) => {
        Object.keys(state.avatar).forEach((item, index) => {
          state.avatar[item].number = payload[index].imageNumber;
          state.avatar[item].fill = payload[index].fill;
          state.avatar[item].oldFill = payload[index].fill;
          if (item === 'prop') {
            const numberBody = Math.floor(state.avatar.body.number / 3);
            state.avatar.prop.number = Math.floor(
              Math.random() * ((numberBody * propsCount + propsCount) - (numberBody * propsCount)),
            ) + (numberBody * propsCount);
          }
        });
      },
    )
    .addCase(
      ACTION.setDefaultAppearance,
      () => initialState,
    )
    .addCase(
      ACTION.changeNumberColorBody,
      (state: TYPES.IAppearanceReducer, { payload }: TYPES.IchangeNumberColorBodyAction) => {
        state.bodyNumberColor = payload;
      },
    );
});

export type RootState = ReturnType<typeof appearanceReducer>;

export default appearanceReducer;
