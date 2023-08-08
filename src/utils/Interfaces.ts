export interface GeneratePostBody{
     keywords:string,
     topic:string
}

export interface UserInterface{
     sub?:string
}

export interface APIResponse{
     data:any,
     statusCode:number,
     message:string[]
}

export interface PromptResponse{
     postContent:string,
     title:string,
     metaDescription:string
}