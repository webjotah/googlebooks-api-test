
export interface ReadingModes {
  text: boolean;
  image: boolean;
}

export interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

export interface VolumeInfo {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  readingModes: ReadingModes;
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: PanelizationSummary;
  imageLinks: ImageLinks;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

export interface ListPrice {
  amount: number;
  currencyCode: string;
}

export interface Offers {
  finskyOfferType: number;
  listPrice: ListPrice;
  retailPrice: ListPrice;
  giftable: boolean;
}

export interface SaleInfo {
  country: string;
  listPrice: ListPrice;
  retailPrice: ListPrice;
  buyLink: string;
  offers: Offers[];
}

export interface Epub {
  isAvailable: boolean;
  acsTokenLink: string;
}

export interface Pdf {
  isAvailable: boolean;
  acsTokenLink: string;
}

export interface AccessInfo {
  country: string;
  epub: Epub;
  pdf: Pdf;
  accessViewStatus: string;
}

export interface SearchInfo {
  textSnippet: string;
}

export interface BookScheema {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  searchInfo: SearchInfo;
}