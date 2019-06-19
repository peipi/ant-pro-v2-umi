import { queryActivities ,queryTable} from '@/services/api';

export default {
  namespace: 'tolist',

  state: {
    data: {list:[]},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTable, payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        data: payload.data,
      };
    },
  },
};
