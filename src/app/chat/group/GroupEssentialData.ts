export interface GroupEssentialData {
  group_id: number;
  name: string;
  figure_id: number;
}


export function dummyGroupEssentialData(): GroupEssentialData {
  return {
    group_id: 0,
    name: '',
    figure_id: 0
  }
}
