export interface Application {
  application_id: number
  post_id: number
  user_id: number
  time: string
  accepted: boolean
  rejected: boolean
}

export const dummyApplication: Application = {
  application_id: 0,
  post_id: 0,
  user_id: 0,
  time: "Long time ago",
  accepted: false,
  rejected: false
}
