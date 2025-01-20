function usernameMask(username: string, setUsername: (value: React.SetStateAction<string>) => void): void {
    setUsername(username.replace(/[^a-zA-Z0-9.-]/g, ""))
}

export default usernameMask