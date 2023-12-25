export interface Card {
  id: number,
  text: string,
  description:string ,
}

export interface Column {
  id: number,
  title: string,
  list: Card[],
}
