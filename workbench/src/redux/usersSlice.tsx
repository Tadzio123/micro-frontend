import { createSlice } from "@reduxjs/toolkit";

const initialUsersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  userForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialUsersState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getCustomerById
    userFetched: (state, action) => {
      state.actionsLoading = false;
      state.userForEdit = action.payload.userForEdit;
      state.error = null;
    },
    // findCustomers
    usersFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCustomer
    userCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.user);
    },
    // updateCustomer
    userUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.user.id) {
          return action.payload.user;
        }
        return entity;
      });
    },
    // deleteCustomer
    userDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteCustomers
    usersDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // customersUpdateState
    usersStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
