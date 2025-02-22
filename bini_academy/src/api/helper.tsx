export const throwErr = (error : Error, message? : string) => {
    return error ? new Error(error.message || message) : new Error('An Unknown Error occured')
}