export default function arrayFilter(posts, follows, id){
    console.log(posts[0] ,id)
    const filteredArray = [];
    for(let i= 0; i < posts.length; i++){
        if(posts[i]?.user_id === id || posts[i]?.sharer_id === id){
            filteredArray.push(posts[i]);
        }else{ for(let z= 0; z < follows.length; z++){
                if(posts[i]?.user_id === follows[z]?.followed || posts[i]?.sharer_id === follows[z]?.followed ){
                filteredArray.push(posts[i]);
                }
            }  }    

    }
    return filteredArray;
}