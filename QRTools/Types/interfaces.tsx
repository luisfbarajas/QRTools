export interface IContainer{
    children?: React.ReactNode
}
export interface IInput{
    label: string,
    example: string,
    onChangeText?: (text: string) => void
}

export interface IColorPicker{
    label: string,
    color: string,
    setColorHandler: (color: string) => void
}

export interface ISlider{
    text: string,
    onValueChange: (value: number) => void,
    max: number,
    min: number,
    step?: number,
    initialValue?: number
}

export interface IButton{
    text: string,
    onPressHandler: () => void,
    styles: any
}

export interface IQRCode{
    value: string,
    size: number,
    color: string,
    backgroundColor: string,
    ecl: string,
    quietZone: number
}

export interface IMediaFile{
onLoading: () => Promise<string>,
onSavedQrCode: (uri: string) => Promise<void>,
}