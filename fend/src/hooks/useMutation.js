import { useMutation } from "react-query";


export const useMutationHook = (FnCallBack)=>{
    const mutation =  useMutation({
        mutationFn:  FnCallBack
    })
    return mutation
}