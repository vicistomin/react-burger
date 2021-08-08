import { userSlice } from "./user";

const testName = 'Test Name';
const testPassword = '123456';
const testEmail = 'test@mail.com';

const fakePassword = '123456';

const initStore = {
  user: {
    password: fakePassword
  },
  userRequest: false,
  userFailed: false,
  userSuccess: false,
  isAuthorized: false
}

const {
  request,
  failed,
  success,
  setName,
  setPassword,
  setEmail,
  resetStatus,
  resetUserData,
  setAuthorization,
  checkAuthorization
} = userSlice.actions

describe('tests for userSlice', () => {

  it('should return the initial state', () => {
    expect(userSlice.reducer(undefined, {}))
    .toEqual(initStore)
  })

  it('should set the request state', () => {
    expect(userSlice.reducer({
      ...initStore,
      userSuccess: true
    }, request()))
    .toEqual({
      ...initStore,
      userRequest: true
    })
  })

  it('should set the failed state', () => {
    expect(userSlice.reducer({
      ...initStore,
      userRequest: true
    }, failed()))
    .toEqual({
      ...initStore,
      userFailed: true
    })
  })

  it('should set the success state', () => {
    expect(userSlice.reducer({
      ...initStore,
      userRequest: true
    }, success()))
    .toEqual({
      ...initStore,
      userSuccess: true
    })
  })

  it('should reset the error status', () => {
    expect(userSlice.reducer({
      ...initStore,
      userFailed: true
    }, resetStatus()))
    .toEqual({
      ...initStore,
      userFailed: false
    })
  })

  it('should set the user name', () => {
    expect(userSlice.reducer({
      ...initStore
    }, setName(testName)))
    .toEqual({
      ...initStore,
      user: {
        ...initStore.user,
        name: testName
      }
    })
  })

  it('should set the user password', () => {
    expect(userSlice.reducer({
      ...initStore
    }, setPassword(testPassword)))
    .toEqual({
      ...initStore,
      user: {
        ...initStore.user,
        password: testPassword
      }
    })
  })

  it('should set the user email', () => {
    expect(userSlice.reducer({
      ...initStore
    }, setEmail(testEmail)))
    .toEqual({
      ...initStore,
      user: {
        ...initStore.user,
        email: testEmail
      }
    })
  })

  it('should reset the user data', () => {
    expect(userSlice.reducer({
      ...initStore,
      user: {
        name: testName,
        email: testEmail,
        password: testPassword
      }
    }, resetUserData()))
    .toEqual({
      ...initStore,
       user: {
        name: '',
        password: fakePassword,
        email: ''
       }
    })
  })

  it('should set the user as authorized', () => {
    expect(userSlice.reducer({
      ...initStore
    }, setAuthorization(true)))
    .toEqual({
      ...initStore,
      isAuthorized: true
    })
  })

  it('should set the user as unauthorized', () => {
    expect(userSlice.reducer({
      ...initStore,
      isAuthorized: true
    }, setAuthorization(false)))
    .toEqual({
      ...initStore
    })
  })

  // in test run there are no cookies
  it('should check the cookies and set the user authorization accordingly', () => {
    expect(userSlice.reducer({
      ...initStore,
      isAuthorized: true
    }, checkAuthorization()))
    .toEqual({
      ...initStore
    })
  })
})
