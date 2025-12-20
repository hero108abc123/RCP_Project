import { isAxiosError } from 'axios'
import { type ClassValue, clsx } from 'clsx'
import { format } from 'date-fns'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (
  date: Date | string | number,
  type: string = 'dd/MM/yyyy',
) => {
  if (!date) {
    return ''
  }
  try {
    return format(date, type)
  } catch (error) {
    // console.error(error)
    return ''
  }
}

export const formatDateCallApi = (
  date: Date | string | number,
  type: string = 'yyyy-MM-dd',
) => {
  if (date) {
    return formatDate(date, type)
  }
  return undefined
}

export const formatDateView = (
  date: Date | string | number,
  type: string = 'dd/MM/yyyy',
) => formatDate(date, type)

export const processApiMsgError = (err: any, msgError?: string | null) => {
  let msg = ''

  if (isAxiosError(err)) {
    if (err.response) {
      msg =
        err.response.data.message ||
        msgError ||
        'Đã xảy ra lỗi, vui lòng thử lại.'
    } else if (err.request) {
      msg = 'Không thể kết nối tới server, vui lòng kiểm tra kết nối mạng.'
    } else {
      msg = 'Đã xảy ra lỗi, vui lòng thử lại.'
    }
    toast.error(msg)
  } else {
    msg = 'Đã xảy ra lỗi không xác định, vui lòng thử lại.'
    toast.error(msg)
  }
}

export const _parseCssString = (cssString: string) => {
  return cssString.split(';').reduce((styles: any, rule) => {
    if (rule.trim() === '') return styles
    const [property, value] = rule.split(':')
    if (property && value) {
      const jsProperty = property
        .trim()
        .replace(/-([a-z])/g, (_, char) => char.toUpperCase()) // Convert to camelCase
      styles[jsProperty] = value.trim()
    }
    return styles
  }, {})
}
export const _getCurrentRoles = (): string => {
  const accessToken = localStorage.getItem('accessToken')

  if (accessToken) {
    const tokenPayload: { role: string } = jwtDecode(accessToken)
    const roles = tokenPayload?.role

    return roles
  }

  return ''
}
