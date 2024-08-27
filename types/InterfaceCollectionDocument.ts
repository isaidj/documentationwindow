export interface CollectionDocument {
  id: string;
  title: string;
  url: string;
  children: CollectionDocument[];
}

export interface CollectionDocumentResponse {
  data: CollectionDocument[];
}
