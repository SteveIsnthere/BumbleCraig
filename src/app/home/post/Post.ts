import {Message} from "../../chat/group/group-chat-view/Message";

export interface Post {
  post_id: number
  author_id: number
  published: boolean
  title: string
  genre: string
  time_since_posted: string
  rating: number
  popularity: number
  number_of_comments: number
  content: Message[]
}

export interface Comment {
  comment_id: number
  author_id: number
  content: string
  time_since_posted: string
  rating: number
  popularity: number
}
