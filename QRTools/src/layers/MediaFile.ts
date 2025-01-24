import { IMediaFile } from "../../Types/interfaces";
//Media librarys
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { PermissionStatus } from "expo-media-library";

export class MediaFile implements IMediaFile {
  private emptyString: string = "";
  private readonly K_MEDIATYPE: ImagePicker.MediaType ;
  private readonly K_QUALITY: number;
  private readonly K_ASPECT: [number, number];
  private readonly K_ALLOWS_EDITING: boolean;
  
  constructor(
    mediaType: ImagePicker.MediaType = "images",
    quality: number = 1,
    aspect: [number, number] = [4, 3],
    allowsEditing: boolean = true
  ) {
    this.K_MEDIATYPE = mediaType;
    this.K_QUALITY = quality;   
    this.K_ASPECT = aspect;
    this.K_ALLOWS_EDITING = allowsEditing;
  }

  /**
   * Opens the media library and returns the URI of the selected image.
   * @returns The URI of the selected image.
   * */
  public async onLoading(): Promise<string> {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === PermissionStatus.GRANTED) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: this.K_MEDIATYPE,
        allowsEditing: this.K_ALLOWS_EDITING,
        aspect: this.K_ASPECT,
        quality: this.K_QUALITY,
      });
      return !result.canceled ? result?.assets[0].uri : "";
    }
    return this.emptyString;
  }
  /**
   * Saves the captured QR code image to the media library.
   * @param uri - The URI of the captured QR code image.
   */
  public async onSavedQrCode(uri: string): Promise<void> {
    console.time("Saved QR Code");
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === PermissionStatus.GRANTED) {
      const timestamp = new Date().getTime();
      const fileUri = `${FileSystem.documentDirectory}qrcode_${timestamp}.png`;
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });
      await MediaLibrary.saveToLibraryAsync(fileUri);

      console.log("QR Code saved to media library:", fileUri);
    }
    console.timeEnd("Saved QR Code");
  }
}
