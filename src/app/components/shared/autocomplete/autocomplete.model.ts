export interface AutocompleteItem {
  id: string | number;
  label: string;
  code?: string;
}

export interface AutocompleteCompleteEvent {
  query: string;
}
