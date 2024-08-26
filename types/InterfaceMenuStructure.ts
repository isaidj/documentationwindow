export interface ResponseData {
  data: DocumentItem[];
  status: number;
  ok: boolean;
}

export interface DocumentItem {
  id: string;
  url: string;
  title: string;
  icon: string;
  children: DocumentItem[];
}
