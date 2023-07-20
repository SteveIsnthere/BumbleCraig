export interface Message {
  sender_id: number;
  file_share_id: number;
  content: string;
  time: string;
}

export function dummyMessage(): Message {
  return {
    sender_id: 0,
    file_share_id: 0,
    content: '...',
    time: ''
  }
}
