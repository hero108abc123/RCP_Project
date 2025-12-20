import { AuthServices } from "@/api/auth.service"
import { ILogin, IMe } from "@/model/auth/auth.models"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

export const $login = createAsyncThunk(
  'login',
  async (payload: ILogin, { rejectWithValue }) => {
    try {
      const res = await AuthServices.login(payload)
      return res
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

type UserState = IMe & {
  isAuthenticated: boolean
  $login: {
    loading?: boolean
    data?: null
  }
}

const initialState: UserState = {
  email: '',
  id: null,
  userName: '',
  fullName: '',
  roles: [],
  isAuthenticated: false,
  $login: {},
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    isGranted: (state: UserState, permissionKey: string): boolean => {
      if (!state.isAuthenticated || !state.roles || state.roles.length === 0) {
        return false
      }

      const isSuperAdmin = state.roles.some(role => role.name === 'ADMIN')
      if (isSuperAdmin) {
        return true
      }

      return state.roles.some(role => 
        role.permissions?.some(permission => permission.key === permissionKey)
      )
    },
  },
  
  reducers: {
    setUser(state, action: PayloadAction<Omit<UserState, 'isAuthenticated'>>) {
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      }
    },
    clearUser() {
      return { ...initialState }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase($login.pending, (state) => {
        state.$login.loading = true
      })
      .addCase($login.fulfilled, (state) => {
        state.$login.loading = false
      })
      .addCase($login.rejected, (state) => {
        state.$login.loading = false
      })
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer