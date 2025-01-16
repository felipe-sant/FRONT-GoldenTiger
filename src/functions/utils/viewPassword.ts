function changeViewPassword(viewPassword: boolean, setViewPassword: (value: React.SetStateAction<boolean>) => void): void {
    setViewPassword(!viewPassword)
}

export default changeViewPassword