export interface IContainer{
    children?: React.ReactNode
}
export interface IInput{
    label: string,
    example: string,
    onChangeText?: (text: string) => void
}