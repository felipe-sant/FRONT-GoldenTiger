function changeViewPassword(passwordText: string, viewPassword: boolean, setViewPassword: (value: React.SetStateAction<boolean>) => void): void {
    console.log(viewPassword)
    if (passwordText) {
        setViewPassword(!viewPassword)
    } else {
        return
    }
}

export default changeViewPassword