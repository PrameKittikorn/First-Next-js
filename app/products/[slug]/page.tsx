import { useRouter } from "next/router";

export default function Page({params}:{params:{slug:string}}){
    return <div>Product ID : {params.slug}</div>
}