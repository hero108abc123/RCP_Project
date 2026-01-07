import { AuthServices } from "@/api/auth.service"
import { ILogin, IMe, IRegister } from "@/model/auth/auth.models"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserService } from "@/api/user.service"
import { ViewUser } from "@/model/user/users.models"

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

export const $register = createAsyncThunk(
  'register',
  async (payload: IRegister, { rejectWithValue }) => {
    try {
      const res = await AuthServices.register(payload)
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
  $register: {
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
  $register: {},
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
      .addCase($register.pending, (state) => {
        state.$register.loading = true
      })
      .addCase($register.fulfilled, (state) => {
        state.$register.loading = false
      })
      .addCase($register.rejected, (state) => {
        state.$register.loading = false
      })
  },
})

export const $getUserById = createAsyncThunk(
  'user/getById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await UserService.getById(id)
      return res
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer